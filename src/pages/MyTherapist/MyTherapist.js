// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./MyTherapist.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import CardGlobal from "../../components/Card";
import NotificationIcon from "../../assets/icons/Notification.png";
import SampleCoverPhoto from "../../assets/images/SampleCoverPhoto.png";
import SampleTherapist from "../../assets/images/SampleTherapist.png";
import SampleDateIcon from "../../assets/icons/SampleDateIcon.png";
import SampleCrossIcon from "../../assets/icons/SampleCrossIcon.png";
import ButtonGlobal from "../../components/Button";
import BookAppt from "./BookAppt";
import { useDocument } from "../../hooks/useDocument";
import { simpleDate } from "../../utils/common";
import MoreAboutTherapist from "./MoreAboutTherapist";
import { useUserAndTherapistDocument } from "../../hooks/useUserAndTherapistDocument";
import Splash from "../../pages/Splash/Splash";
import { useNavigate } from "react-router-dom";
import Bubble from "../../components/AnimatedComponents/Bubbles";
import Chat from "../../assets/icons/Chat.png";
import { Card } from "@mui/material";
import ChatDrawer from "./Chat";

export default function MyTherapist({ setBackBtn }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [therapistData, setTherapistData] = useState(null);
  const [userData, setUserData] = useState(null);

  setBackBtn(false);

  const { document: data, isPending } = useUserAndTherapistDocument(
    "userData",
    user.uid
  );

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setTherapistData(data.therapist);
      setUserData(data.user);
      console.log("action performed");
    }
  }, [data]);

  const [openBookAppt, setOpenBookAppt] = useState(false);
  const [openMoreAboutTherapist, setOpenMoreAboutTherapist] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  return userData?.therapist === "" ? (
    <div className={styles.noDiariesContainer}>
      <h2 style={{ width: "85%" }}>You do not have a therapist yet</h2>
      <ButtonGlobal
        style={{ width: "80%", marginTop: "20px" }}
        handleClick={() => navigate("/explore")}
        label={"Find a therapist"}
      />
      <div style={{ position: "absolute", zIndex: -1 }}>
        <Bubble />
        {/* <Bouncy /> */}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.coverPhoto}>
          <img
            height={{ maxHeight: "300px" }}
            src={SampleCoverPhoto}
            alt="cover photo"
          />
        </div>
        <img
          src={SampleTherapist}
          alt="therapist"
          className={styles.therapistPic}
        />
      </div>
      <div className={styles.lowerContainer}>
        <CardGlobal
          style={{
            position: "absolute",
            padding: "0.5rem",
            // background:
            //   "linear-gradient(141.24deg, #64609B 2.08%, #4E457B 95.98%)",
            border: "1px",
            borderRadius: 5,
            right: "1rem",
            top: "2rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          clickable={true}
          handleClick={() => setOpenChat(true)}
        >
          <img
            style={{
              width: "30px",
            }}
            src={Chat}
            alt="Chat Icon"
            className={styles.chatIcon}
          />
        </CardGlobal>

        <h2 className={styles.name}>{therapistData?.name}</h2>
        <CardGlobal
          style={{
            padding: "3px 6px",
            borderRadius: 5,
            borderWidth: 1,
          }}
          handleClick={() => setOpenMoreAboutTherapist(true)}
          clickable={true}
        >
          <p className={styles.moreAbout}>{"More about your therapist >"}</p>
        </CardGlobal>
      </div>
      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Upcoming Appointment</h3>
        <CardGlobal
          style={{
            width: "100%",
            padding: "1rem 0.5rem",
          }}
        >
          <div className={styles.apptDetails}>
            <img src={SampleDateIcon} alt="notification icon" />
            <p className={styles.dateTitle}>Date and Time</p>
            <p className={styles.dateAndTime}>19 Jan 2023, 09:00AM</p>
            <img src={SampleCrossIcon} alt="notification icon" />
          </div>
        </CardGlobal>
      </div>

      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Appointment History</h3>
        <CardGlobal
          style={{
            width: "100%",
            padding: "1rem 1rem",
          }}
        >
          <div className={styles.apptHistory}>
            <div style={{ flex: 0.4 }} className={styles.contentContainer}>
              <h3 style={{ marginBottom: "1rem" }} className="h3smaller">
                Date
              </h3>

              {data?.user &&
                data?.user?.appointmentHistory &&
                data?.user?.appointmentHistory.map((appointment) => (
                  <div className={styles.textContainer}>
                    <p className={styles.text}>
                      {simpleDate(appointment.date)}
                    </p>
                  </div>
                ))}
            </div>
            <div style={{ flex: 0.6 }} className={styles.contentContainer}>
              <h3 style={{ marginBottom: "1rem" }} className="h3smaller">
                Comments
              </h3>
              {data?.user &&
                data?.user?.appointmentHistory &&
                data?.user?.appointmentHistory.map((appointment) => (
                  <div className={styles.textContainer}>
                    <p className={styles.text}>
                      {appointment.comments
                        ? String(appointment.comments).slice(0, 25) + "..."
                        : "No comments"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </CardGlobal>
        <p className={styles.viewAll}>View all</p>
        <ButtonGlobal
          label="Book Appointment"
          handleClick={() => setOpenBookAppt(true)}
        />
      </div>
      <BookAppt
        open={openBookAppt}
        setOpen={setOpenBookAppt}
        userId={user.uid}
        therapistId={data?.user && data?.user?.therapist[0]}
      />

      <MoreAboutTherapist
        open={openMoreAboutTherapist}
        setOpen={setOpenMoreAboutTherapist}
        therapistData={therapistData && !isPending && therapistData}
      />

      <ChatDrawer open={openChat} setOpen={setOpenChat} />
    </div>
  );
}
