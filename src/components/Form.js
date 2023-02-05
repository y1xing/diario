import { useState } from "react";
import styles from "./Form.module.css";

export default function Form(props) {
  const {
    label = "hello",
    type,
    value,
    handleChange,
    handleClick,
    style,
    children,
    shadow,
    placeholder,
    noMarginBottom,
    rows = "10",
  } = props;

  return (
    <div className={styles.container}>
      {type === "textArea" ? (
        <textarea
          style={{
            ...style,
            height: "auto",
            paddingTop: "1rem",
            boxShadow: shadow && "1px 2px 2px rgba(0, 0, 0, 0.4)",
            marginBottom: !noMarginBottom && "1.5rem",
          }}
          className={styles.inputContainer}
          onClick={handleClick}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          rows={rows}
        />
      ) : (
        <input
          style={{
            ...style,
            boxShadow: shadow && "1px 2px 2px rgba(0, 0, 0, 0.4)",
            marginBottom: !noMarginBottom && "1.5rem",
          }}
          type={type}
          className={styles.inputContainer}
          onClick={handleClick}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      )}
    </div>
  );
}
