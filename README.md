# AISG National Student Challenge 2022 Category B
Done by: Cheng Yi Xing, Davin Lim, Bryan Seah, Wong Yu Fei \
Checkout the app: https://diario-orpin.vercel.app


## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## To run the backend
You do no need to run the backend for the entire app to work as we have a cloud server for it already

### `cd server`
### `pip install -r requirements.txt`
### `set FLASK_APP=server.py`
### `flask run`

Since we the frontend is not configured to make API calls to the backend through local environment. You can test the backend as an API.\
You can use the following parameters for the API \
\
"/get_diaries_emotion_summary/q1IQNXF9EHcykmIflkaWbrdtIFo1" \
"get_analysis_summary/q1IQNXF9EHcykmIflkaWbrdtIFo1" \
"post_diary" is a POST request. Do fill the body with a json object like the following \
{
  title: "Title here",
  content: "Content here",
  uid: "q1IQNXF9EHcykmIflkaWbrdtIFo1"
 }

