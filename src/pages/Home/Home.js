// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Home.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Notebook from "../../components/Notebook";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from "react-snaplist-carousel";
import CardGlobal from "../../components/Card";
import SampleIcon from "../../assets/icons/SampleIcon.png";

import SwipeableEdgeDrawer from "../../components/WriteDiaryModal";
import CTAContainer from "../../components/CTAContainer";
import SwipeableEdgeDrawer2 from "../IndividualDiaries/IndividualDiary";
import { useCollection } from "../../hooks/useCollection";
import Trophy2 from "../../assets/PurpleIcon/Trophy2.png";
import Message2 from "../../assets/PurpleIcon/Message2.png";
import { getEmoji } from "../../utils/common";
import ButtonGlobal from "../../components/Button";
import Bubbles from "../../components/AnimatedComponents/Bubbles";
import { useFetch } from "../../hooks/useFetch";
import LoaderSmall from "../../components/LoaderSmall";
import Loader from "../../components/Loader";

export default function Home({ setBackBtn }) {
  setBackBtn(false);

  const { user } = useAuthContext();

  const { data, error, isPending } = useFetch(
    `https://diarioappapi2.glitch.me/get_diaries_emotion_summary/${user.uid}`
  );

  const { documents: diaries } = useCollection(`userData/${user.uid}/diaries`);
  console.log("diaries", diaries);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openIndividualDiary, setOpenIndividualDiary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [emotionSummary, setEmotionSummary] = useState(null);

  const [selectedDiary, setSelectedDiary] = useState(null);
  const [selectedDiaryData, setSelectedDiaryData] = useState(null);
  const [sortedDiaries, setSortedDiaries] = useState(null);

  useEffect(() => {
    if (diaries) {
      const sortedDiaries = diaries.sort((a, b) => b.date - a.date);
      setSortedDiaries(sortedDiaries);
    }
  }, [diaries]);

  const handleClick = (diaryID) => {
    setSelectedDiary(diaryID);
    setOpenIndividualDiary(true);
  };

  const sortEmotionSummary = (data) => {
    // Sort the emotion summary (summaryData.emotion_summary) in descending order
    // and return the top 3 emotions
    const sortedEmotionSummary = Object.entries(data?.emotion_summary)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    return sortedEmotionSummary;
  };

  useEffect(() => {
    if (selectedDiary) {
      const diaryData = diaries.find((diary) => diary.id === selectedDiary);
      setSelectedDiaryData(diaryData);
      console.log(diaryData);
    }
  }, [selectedDiary]);

  useEffect(() => {
    if (data) {
      if (!isPending) {
        setSummaryData(data && data);
        const sortedEmotionSummary = sortEmotionSummary(data);
        setEmotionSummary(sortedEmotionSummary);
      }
    }
  }, [data]);

  const overallDiaryContainer = () => {
    return isPending ? (
      <div className={styles.overallDiaryContainer2}>
        <LoaderSmall />
      </div>
    ) : data && sortedDiaries ? (
      <div className={styles.overallDiaryContainer}>
        <div className={styles.leftDiaryContainer}>
          <div className={styles.overallDiaryData}>
            <h1 style={{ fontSize: "3rem", marginRight: "5px" }}>
              {summaryData && summaryData?.diary_count}
            </h1>
            <p className="p075">Diaries</p>
          </div>
          <div className={styles.subDiaryData}>
            {summaryData &&
              emotionSummary.map((value, index) => (
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
                    <h1>{getEmoji(value[0])}</h1>
                  </CardGlobal>
                  <p
                    style={{ marginTop: "0.5rem", marginRight: "0.2rem" }}
                    className="p06"
                  >
                    {value[0]}
                  </p>
                  <p className="p06">{value[1]} times</p>
                </div>
              ))}
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
            <img
              src={Trophy2}
              alt="trophy icon"
              style={{
                width: "80px",

                transform: "scaleX(-1)",
              }}
            />
          </CardGlobal>
        </div>
      </div>
    ) : (
      <div className={styles.overallDiaryContainer}>
        <h2>No diairies analysis yet</h2>
      </div>
    );
  };

  return sortedDiaries ? (
    <Background pageName={"Home"} notificationBtn={true}>
      <div className={styles.container}>
        <h2>Diaries</h2>
        {/* <div className={styles.notebookContainer}> */}
        <SnapList className={styles.notebookContainer}>
          {sortedDiaries && sortedDiaries.length > 0 ? (
            sortedDiaries.slice(0, 5).map((diary) => {
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
            })
          ) : (
            <div className={styles.noDiariesContainer}>
              <CardGlobal
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(141.24deg, #64609B 2.08%, #4E457B 95.98%)",
                }}
              >
                <h2>No diaries</h2>
                <ButtonGlobal
                  handleClick={() => {
                    setOpenDrawer(true);
                  }}
                  style={{
                    height: "28px",
                    width: "116px",
                    fontSize: "0.75rem",
                    borderRadius: "5px",
                  }}
                  label="Start Writing"
                />
                <div style={{ position: "absolute", zIndex: -1 }}>
                  <Bubbles />
                  {/* <Bouncy /> */}
                </div>
              </CardGlobal>
            </div>
          )}
        </SnapList>
        {/* </div> */}
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

        <CTAContainer />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className={styles.invisibleBtn}
          onClick={() => {
            setOpenDrawer(true);
            console.log("pressed");
          }}
        ></button>
      </div>

      <SwipeableEdgeDrawer
        open2={openDrawer}
        setOpen2={setOpenDrawer}
        uid={user.uid}
      />
      <SwipeableEdgeDrawer2
        open={openIndividualDiary}
        setOpen={setOpenIndividualDiary}
        data={selectedDiaryData}
      />
    </Background>
  ) : (
    <Background pageName={"Home"} notificationBtn={true}>
      <div className="loaderScreen">
        <Loader />
      </div>
    </Background>
  );
}
