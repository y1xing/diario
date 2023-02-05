// Function to check if the email is valid
export const isValidEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export const simpleDate = (date) => {
  return date.toDate().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Function to convert a firebase timestamp to date and time, like "Jan 1, 2021 12:00 PM"
export const dateTime = (date) => {
  return date.toDate().toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// Function that takes in an input of an emotion and returns the corresponding emoji
export const getEmoji = (emotion) => {
  // Convert the emotion to lowercase
  emotion = String(emotion).toLowerCase();

  switch (emotion) {
    case "sadness":
      return "😢";
    case "loneliness":
      return "😞";
    case "frustration":
      return "😤";
    case "despair":
      return "😔";
    case "happy":
      return "😀";
    case "sad":
      return "😔";
    case "angry":
      return "😡";
    case "scared":
      return "😨";
    case "disgusted":
      return "😖";
    case "surprised":
      return "😲";
    case "neutral":
      return "😐";
    case "confused":
      return "😕";
    case "bored":
      return "😴";
    case "excited":
      return "😃";
    case "frustrated":
      return "😤";
    case "lonely":
      return "😞";
    case "proud":
      return "😎";
    case "tired":
      return "😫";
    case "worried":
      return "😟";
    case "ashamed":
      return "😳";
    case "guilty":
      return "😓";
    case "jealous":
      return "😒";
    case "nervous":
      return "😬";
    case "prepared":
      return "😎";
    case "relaxed":
      return "😌";
    case "sick":
      return "🤒";
    case "stressed":
      return "😩";
    case "surprised":
      return "😲";
    case "tired":
      return "😫";
    case "uncomfortable":
      return "😖";
    case "upset":
      return "😢";
    case "afraid":
      return "😨";
    case "annoyed":
      return "😒";
    case "anxious":
      return "😰";
    case "depressed":
      return "😔";
    case "disappointed":
      return "😞";
    case "embarrassed":
      return "😳";
    case "impressed":
      return "😮";
    case "inspired":
      return "😍";
    case "interested":
      return "😃";
    case "proud":
      return "😎";
    case "sad":
      return "😔";
    case "happiness":
      return "😀";
    default:
      return "😐";
  }
};

// Function that converts positive and negative emotions to their corresponding emoji
export const getEmojiFromSentiment = (sentiment) => {
  // Convert the sentiment to lowercase
  sentiment = String(sentiment).toLowerCase();

  // Using thumbs up and down emoji
  if (sentiment === "positive") {
    return "👍";
  } else if (sentiment === "negative") {
    return "👎";
  } else {
    return "😐";
  }
};

// Function that checks the type of notification and returns the corresponding icon
export const getNotificationIcon = (type) => {
  // switch (type) {
  //   case "like":
  //     return <ThumbUpIcon />;
  //   case "comment":
  //     return <ChatBubbleOutlineIcon />;
  //   case "share":
  //     return <ShareIcon />;
  //   case "follow":
  //     return <PersonAddIcon />;
  //   default:
  //     return <NotificationsIcon />;
  // }
};
