// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Notification.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import CardGlobal from "../../components/Card";
import NotificationIcon from "../../assets/icons/Notification.png";
import { useCollection } from "../../hooks/useCollection";

const NotificationContainer = ({ children, text }) => (
  <div className={styles.notificationContainer}>
    <CardGlobal
      style={{
        width: "50px",
        height: "45px",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
      }}
    >
      <img style={{ width: 25 }} src={NotificationIcon} alt="Notification" />
    </CardGlobal>
    <div className={styles.notificationText}>
      <p style={{ textAlign: "left" }} className="p1">
        {text}
      </p>
    </div>
  </div>
);

export default function Notification({ setBackBtn }) {
  setBackBtn(true);
  const { user } = useAuthContext();

  const { documents: notifications } = useCollection(
    user.isTherapist
      ? `therapist/${user.uid}/notification`
      : `userData/${user.uid}/notification`
  );

  console.log("notifications", notifications);

  // Get diary data from database
  const [diaries, setDiaries] = useState([1, 2, 3, 4, 5]);

  return (
    <Background pageName={"Notification"} notificationBtn={false}>
      <div className={styles.container}>
        {notifications &&
          notifications.map((item, index) => (
            <NotificationContainer text={item.notification} />
          ))}
      </div>
    </Background>
  );
}
