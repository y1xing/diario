// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Diaries.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import CardGlobal from "../../components/Card";
import SwipeableEdgeDrawer2 from "../IndividualDiaries/IndividualDiary";
import Next from "../../assets/icons/Next.png";
import { useCollection } from "../../hooks/useCollection";
import { simpleDate } from "../../utils/common";
import FilterMain from "../../components/FilterMain";
import { getEmoji } from "../../utils/common";
import Bubbles from "../../components/AnimatedComponents/Bubbles";
import Bouncy from "../../components/AnimatedComponents/Bouncy";
import Loader from "../../components/Loader";

const Diary = ({
  children,
  title,
  text,
  date,
  emotion,
  open,
  setOpen,
  handleClick,
}) => {
  return (
    <div onClick={handleClick} className={styles.diaryContainer}>
      <h3 className={styles.diaryTitle}>{title}</h3>
      <CardGlobal
        clickable={true}
        style={{
          width: "100%",
          height: 124,
          borderWidth: 2,
          padding: "1rem 0.5rem",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.diaryTextContainer}>
          <p className={styles.diaryText}>{text}</p>
          <CardGlobal
            style={{
              width: 40,
              borderWidth: 1,
              background:
                "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
            }}
          >
            <p style={{ margin: "0.2rem 0.5rem" }} className="h3">
              {emotion}
            </p>
          </CardGlobal>
        </div>
        <div className={styles.arrowContainer}>
          <img
            src={Next}
            alt="Next"
            style={{ width: "10px", marginRight: "1rem" }}
          />
        </div>
        <p className={styles.date}>{date}</p>
      </CardGlobal>
    </div>
  );
};

export default function Diairies({ setBackBtn }) {
  setBackBtn(false);
  const { user } = useAuthContext();
  const [openIndividualDiary, setOpenIndividualDiary] = useState(false);
  const [diaryID, setDiaryID] = useState(null);

  const [selectedDiary, setSelectedDiary] = useState(null);
  const [selectedDiaryData, setSelectedDiaryData] = useState(null);

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

  const { documents: diaries } = useCollection(`userData/${user.uid}/diaries`);
  console.log("diaries", diaries);

  const [openFilter, setOpenFilter] = useState(false);
  const [sortedDiaries, setSortedDiaries] = useState(null);

  useEffect(() => {
    if (diaries) {
      const sortedDiaries = diaries.sort((a, b) => b.date - a.date);
      setSortedDiaries(sortedDiaries);
    }
  }, [diaries]);

  return (
    sortedDiaries && (
      <Background pageName={"Diaries"}>
        <div className={styles.container}>
          <div className={styles.filterContainer}>
            <CardGlobal
              clickable={true}
              handleClick={() => setOpenFilter(true)}
              style={{ width: 58, borderWidth: 1 }}
            >
              <p style={{ margin: "0.2rem 0.5rem" }} className="p075">
                Filter
              </p>
            </CardGlobal>
          </div>
          <div className={styles.diaryContainer}>
            {sortedDiaries && sortedDiaries.length !== 0 ? (
              sortedDiaries.map((data) => {
                return (
                  <Diary
                    title={data.title && String(data?.title)}
                    text={
                      data?.content?.length > 100
                        ? String(data?.content).slice(0, 80) + "..."
                        : String(data?.content)
                    }
                    // Emotion is an emoji
                    emotion={getEmoji(
                      data?.analysis?.overallEmotion &&
                        data?.analysis?.overallEmotion[0].emotion
                    )}
                    date={data.date && simpleDate(data.date)}
                    handleClick={() => handleClick(data.uid)}
                  />
                );
              })
            ) : (
              <div className={styles.noDiariesContainer}>
                <h2 style={{ zIndex: 10 }}>No diaries yet</h2>
                <div style={{ position: "absolute" }}>
                  <Bubbles />
                  {/* <Bouncy /> */}
                </div>
              </div>
            )}
          </div>
        </div>
        <SwipeableEdgeDrawer2
          open={openIndividualDiary}
          setOpen={setOpenIndividualDiary}
          data={selectedDiaryData}
        />
        <FilterMain open={openFilter} setOpen={setOpenFilter} />
      </Background>
    )
  );
}
