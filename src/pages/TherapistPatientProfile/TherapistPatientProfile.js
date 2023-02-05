// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./TherapistPatientProfile.module.css";
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
import Link from "../../assets/icons/Link.png";
import Connect from "./Connect";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from "react-snaplist-carousel";
import { useCollection } from "../../hooks/useCollection";
import Notebook from "../../components/Notebook";
import SampleIcon from "../../assets/icons/SampleIcon.png";
import { simpleDate } from "../../utils/common";
import SwipeableEdgeDrawer2 from "../IndividualDiariesTherapist/IndividualDiary";
import ChatDrawer from "./Chat";
import Chat from "../../assets/icons/Chat.png";

const overallDiaryContainer = () => {
  return (
    <div className={styles.overallDiaryContainer}>
      <div className={styles.leftDiaryContainer}>
        <div className={styles.overallDiaryData}>
          <h1 style={{ fontSize: "3rem", marginRight: "5px" }}>32</h1>
          <p className="p075">Diaries</p>
        </div>
        <div className={styles.subDiaryData}>
          <div className={styles.emotionContainer}>
            <CardGlobal
              style={{
                width: "44px",
                height: "44px",
                borderWidth: 1,
                marginRight: "10px",
                background:
                  "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
              }}
            >
              <h1>🥱</h1>
            </CardGlobal>
            <p style={{ marginTop: "0.5rem" }} className="p075">
              Bored
            </p>
            <p className="p06">5 times</p>
          </div>
          <div className={styles.emotionContainer}>
            <CardGlobal
              style={{
                width: "44px",
                height: "44px",
                borderWidth: 1,
                marginRight: "10px",
                background:
                  "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
              }}
            >
              <h1>🥱</h1>
            </CardGlobal>
            <p style={{ marginTop: "0.5rem" }} className="p075">
              Sad
            </p>
            <p className="p06">5 times</p>
          </div>
          <div className={styles.emotionContainer}>
            <CardGlobal
              style={{
                width: "44px",
                height: "44px",
                borderWidth: 1,

                background:
                  "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
              }}
            >
              <h1>🥱</h1>
            </CardGlobal>
            <p style={{ marginTop: "0.5rem" }} className="p075">
              Excited
            </p>
            <p className="p06">5 times</p>
          </div>
        </div>
      </div>
      <div className={styles.rightDiaryContainer}>
        <CardGlobal
          style={{
            width: "117px",
            height: "117px",
            borderWidth: 1,
            background:
              "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
          }}
        >
          <img src={SampleIcon} alt="sample icon" />
        </CardGlobal>
      </div>
    </div>
  );
};

export default function TherapistPatientProfile({ setBackBtn }) {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  console.log("data", data);

  const { documents: diaries } = useCollection(`userData/${data?.uid}/diaries`);
  const [openIndividualDiary, setOpenIndividualDiary] = useState(false);

  const [selectedDiary, setSelectedDiary] = useState(null);
  const [selectedDiaryData, setSelectedDiaryData] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  const handleClick = (diaryID) => {
    setSelectedDiary(diaryID);
    setOpenIndividualDiary(true);
  };

  useEffect(() => {
    if (selectedDiary) {
      const diaryData = diaries.find((diary) => diary.id === selectedDiary);
      setSelectedDiaryData(diaryData);
      console.log(diaryData);
    }
  }, [selectedDiary]);

  setBackBtn(true);

  const [navbar, setNavbar] = useState(false);

  const [openConnect, setOpenConnect] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <h1>{data.firstName}</h1>
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
      </div>
      <div
        style={{ marginTop: "100px" }}
        className={styles.upcomingApptContainer}
      >
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
        <h3 className={styles.upcomingAppt}>Details</h3>
        <CardGlobal
          style={{
            width: "100%",
            padding: "1rem 1rem",
          }}
        >
          <div className={styles.apptHistory}>
            <div style={{ flex: 0.5 }} className={styles.contentContainer}>
              <div className={styles.textContainer}>
                <img src={SampleDateIcon} alt="notification icon" />
                <p className={styles.textBold}>Phone:</p>
              </div>
              <div className={styles.textContainer}>
                <img src={SampleDateIcon} alt="notification icon" />
                <p className={styles.textBold}>Email:</p>
              </div>
              <div className={styles.textContainer}>
                <img src={SampleDateIcon} alt="notification icon" />
                <p className={styles.textBold}>Date of Birth:</p>
              </div>
              <div className={styles.textContainer}>
                <img src={SampleDateIcon} alt="notification icon" />
                <p className={styles.textBold}>Gender</p>
              </div>
            </div>
            <div style={{ flex: 0.5 }} className={styles.contentContainer2}>
              <div className={styles.textContainer}>
                <p className={styles.text}>{data?.phone}</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>{data?.email}</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>{"Jan 20, 1999"}</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>{data?.gender}</p>
              </div>
            </div>
          </div>
        </CardGlobal>
      </div>
      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Patient Memo</h3>
        <CardGlobal
          style={{
            width: "100%",
            padding: "1rem 1rem 0rem 1rem",
            display: "flex",
            flexDirection: "column",
            // marginBottom: "1rem",
          }}
        >
          <p style={{ lineHeight: "19px", textAlign: "left" }} className="p075">
            {
              // Slice the string to 100 characters
              data?.patientMemo.slice(0, 200)
            }
          </p>
          <p className={styles.viewAll}>Read More...</p>
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
              <div className={styles.textContainer}>
                <p className={styles.text}>19 Jan 2023</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>19 Jan 2023</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>19 Jan 2023</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>19 Jan 2023</p>
              </div>
            </div>
            <div style={{ flex: 0.6 }} className={styles.contentContainer}>
              <h3 style={{ marginBottom: "1rem" }} className="h3smaller">
                Comments
              </h3>
              <div className={styles.textContainer}>
                <p className={styles.text}>Try practicing how not to...</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>Try practicing how not to...</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>Try practicing how not to...</p>
              </div>
              <div className={styles.textContainer}>
                <p className={styles.text}>Try practicing how not to...</p>
              </div>
            </div>
          </div>
        </CardGlobal>
        <p className={styles.viewAll}>View all</p>
      </div>
      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Diaries</h3>

        {/* <div className={styles.notebookContainer}> */}
        <SnapList className={styles.notebookContainer}>
          {diaries &&
            diaries.map((diary) => {
              return (
                <SnapItem
                  margin={{ left: "15px", right: "15px" }}
                  // snapAlign="center"
                >
                  <Notebook
                    selectedDiary={selectedDiary && selectedDiary}
                    setSelectedDiary={setSelectedDiary}
                    data={diary && diary}
                    handleClick={() => handleClick(diary.uid)}
                  />
                </SnapItem>
              );
            })}
        </SnapList>

        <p
          onClick={() => {
            navigate("/diariestherapist");
          }}
          className={styles.viewAll}
        >
          View all
        </p>
      </div>
      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Overall Analysis</h3>
        <CardGlobal
          style={{
            width: "100%",
            background:
              "radial-gradient(108.96% 108.96% at 51.19% 7.46%, #BB40E7 0%, #6A3EB5 69.27%, #6140B8 100%)",
            padding: "1rem",
            marginBottom: "2rem",
          }}
        >
          {overallDiaryContainer()}
        </CardGlobal>
      </div>
      <SwipeableEdgeDrawer2
        open={openIndividualDiary}
        setOpen={setOpenIndividualDiary}
        data={selectedDiaryData}
      />
      <ChatDrawer name={"Yi Xing"} open={openChat} setOpen={setOpenChat} />
    </div>
  );
}
