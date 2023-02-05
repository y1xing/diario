import { useState } from "react";
import styles from "./Button.module.css";
import { CircularProgress } from "@mui/material";

export default function ButtonGlobal(props) {
  const { label = "hello", type, handleClick, style, isPending } = props;

  return (
    <button style={style} className={styles.btnContainer} onClick={handleClick}>
      {isPending ? <CircularProgress size={30} color="warning" /> : label}
    </button>
  );
}
