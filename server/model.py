import sgnlp
from sgnlp.models.sentic_gcn import (
    SenticGCNBertTokenizer,
    SenticGCNBertEmbeddingConfig,
    SenticGCNBertEmbeddingModel,
    SenticGCNBertModel,
    SenticGCNBertPreprocessor,
    SenticGCNBertConfig,
    SenticGCNBertPostprocessor,
)
import pandas as pd
import spacy
import openai
from dotenv import load_dotenv
import os

load_dotenv()


def run_analysis(diary_entry):
    entity_list = [get_aspects(diary_entry)]

    d = {'diary': [diary_entry]}
    diary_df = pd.DataFrame(data=d)
    diary_df['entity'] = pd.Series(entity_list)

    # Create tokenizer
    tokenizer = SenticGCNBertTokenizer.from_pretrained("bert-base-uncased")

    # Create embedding model
    embed_config = SenticGCNBertEmbeddingConfig.from_pretrained(
        "bert-base-uncased")
    embed_model = SenticGCNBertEmbeddingModel.from_pretrained(
        "bert-base-uncased", config=embed_config)

    # Create preprocessor
    preprocessor = SenticGCNBertPreprocessor(
        tokenizer=tokenizer,
        embedding_model=embed_model,
        senticnet="https://storage.googleapis.com/sgnlp/models/sentic_gcn/senticnet.pickle",
        device="cpu", )

    # Create postprocessor
    postprocessor = SenticGCNBertPostprocessor()

    # Load model
    config = SenticGCNBertConfig.from_pretrained(
        "https://storage.googleapis.com/sgnlp/models/sentic_gcn/senticgcn_bert/config.json")
    model = SenticGCNBertModel.from_pretrained(
        "https://storage.googleapis.com/sgnlp/models/sentic_gcn/senticgcn_bert/pytorch_model.bin", config=config)

    # Create model inputs
    inputs = [{
        "aspects": [],
        "sentence": (),
    }]

    for i in range(len(diary_df)):
        inputs.append(
            {"aspects": diary_df['entity'][i], "sentence": diary_df['diary'][i]})

    # Remove the empty index
    del (inputs[0])
    print(inputs)

    # Run model
    processed_inputs, processed_indices = preprocessor(inputs)
    raw_outputs = model(processed_indices)
    post_outputs = postprocessor(
        processed_inputs=processed_inputs, model_outputs=raw_outputs)

    # Capture model outputs
    sentence_list = list([d['sentence'] for d in post_outputs])
    aspect_list = list([d['aspects'] for d in post_outputs])
    sentiment_list = list(d['labels'] for d in post_outputs)

    # Format model outputs
    entity = []
    for i in range(len(aspect_list)):
        for j in range(len(aspect_list[i])):
            entity.append(sentence_list[i][aspect_list[i][j][0]])

    sentiment = []
    for i in range(len(sentiment_list)):
        for j in range(len(sentiment_list[i])):
            sentiment.append(sentiment_list[i][j])

    combined_list = list(zip(entity, sentiment))

    # Load your API key from an environment variable or secret management service
    # Do contact us if you need help with this
    api_key = os.getenv("OPENAI_API_KEY")

    openai.api_key = api_key
    response = openai.Completion.create(model="text-davinci-003",
                                        prompt=f'{diary_df.loc[0]}Analyze the sentence and give the emotions in terms of percentage. Example: excited (50%), fondness (50%)',
                                        temperature=0, max_tokens=200)

    return create_new(process_response(response), combined_list)


def get_aspects(diary_entry):
    nlp = spacy.load("en_core_web_sm")
    entity_list = []
    doc = nlp(str(diary_entry))
    entity = list(doc.ents)
    for token in doc:
        person = []
        if token.pos_ == "NOUN":
            entity_list.append(str(token))
    return entity_list


def process_response(response):
    escapes = ''.join([chr(char) for char in range(1, 32)])
    translator = str.maketrans('', '', escapes)
    response = response["choices"][0]["text"].translate(translator)
    return response


def create_new(response, combined_list):
    new_list = list()
    new_list.append(response)
    new_list.append(combined_list)
    return new_list
