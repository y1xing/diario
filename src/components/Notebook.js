import { useState } from "react";
import styles from "./Notebook.module.css";
import { CircularProgress } from "@mui/material";
import Pattern from "../assets/images/pattern.png";
import { simpleDate, getEmojiFromSentiment } from "../utils/common";

export default function Notebook(props) {
  const {
    data,
    handleClick,
    style,
    isPending,
    selectedDiary,
    setSelectedDiary,
  } = props;

  // Create a function that will generate random linear gradients that is within the shades of blue, purple and pink
  const generateRandomGradient = () => {
    const colors = ["#603BB8", "#AE3AE1", "#7EA6D9", "#BA34AA", "#842DBE"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];

    const darkColors = ["#462390", "#4B1E5C", "#6E197C", "#39197C"];
    const randomDarkColor =
      darkColors[Math.floor(Math.random() * darkColors.length)];

    return [
      randomDarkColor,
      `linear-gradient(157.82deg, ${randomColor} 0%, ${randomColor2} 97.94%)`,
    ];
  };

  return (
    <div onClick={handleClick} className={styles.notebookContainer}>
      <div className={styles.sentiment}>
        <h1>
          {data &&
            getEmojiFromSentiment(String(data?.analysis?.overallSentiment))}
        </h1>
      </div>
      <div
        style={{
          background: generateRandomGradient()[0],
        }}
        className={styles.leftHalf}
      ></div>

      <div
        style={{
          backgroundImage: `url(${Pattern}), ${generateRandomGradient()[1]}`,
        }}
        className={styles.rightHalf}
      ></div>
      <h3
        className="h3smaller"
        style={{
          marginTop: "1rem",
          fontWeight: "400",
        }}
      >
        {data?.date && simpleDate(data?.date)}
      </h3>
    </div>
  );
}
