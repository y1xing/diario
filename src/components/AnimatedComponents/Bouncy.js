import styles from "./index.module.css";

export default function Bouncy() {
  return (
    <div class={styles.loaderBox}>
      <div class={styles.loaderWrapper}>
        <div class={styles.loader}>
          <div class={styles.loaderInner}></div>
        </div>
      </div>
    </div>
  );
}
