import { useState } from "react";
import styles from "./Card.module.css";

export default function CardGlobal(props) {
  const {
    label = "hello",
    type,
    handleClick,
    style,
    children,
    shadow,
    clickable,
  } = props;

  return (
    <div
      style={{
        ...style,
        boxShadow: shadow && "1px 2px 2px rgba(0, 0, 0, 0.4)",
      }}
      className={clickable ? styles.container : styles.containerNoClick}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
