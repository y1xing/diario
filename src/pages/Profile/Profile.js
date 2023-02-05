// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Profile.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import ButtonGlobal from "../../components/Button";

const MyItem = ({ children }) => (
  <div style={{ width: "70vw", height: 200, background: "#cccccc" }}>
    {children}
  </div>
);

export default function Profile({ setBackBtn }) {
  setBackBtn(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // Get diary data from database
  const [diaries, setDiaries] = useState([1, 2, 3, 4, 5]);

  return (
    <Background pageName={"Profile"} notificationBtn={false}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>First Name</h3>
          <Form type="text" placeholder="First Name" />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Last Name</h3>
          <Form type="text" placeholder="Last Name" />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Gender</h3>
          <Form type="text" placeholder="Gender" />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Phone</h3>
          <Form type="text" placeholder="Phone" />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Email</h3>
          <Form type="text" placeholder="Email" />
        </div>
        <div style={{ marginBottom: "1rem" }} className={styles.inputContainer}>
          <h3 className={styles.label}>Date of Birth</h3>
          <Form type="text" placeholder="Date of Birth" />
          <ButtonGlobal
            style={{
              marginTop: "1rem",
            }}
            label="Edit Profile"
            handleClick={() => {
              alert("Profile updated");
            }}
          ></ButtonGlobal>
        </div>
      </div>
    </Background>
  );
}
