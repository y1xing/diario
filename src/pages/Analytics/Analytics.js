// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Analytics.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import ButtonGlobal from "../../components/Button";
import CardGlobal from "../../components/Card";
import SampleChart from "../../assets/images/SampleChart.png";
// import Chart from "react-apexcharts";
import AnalyticsChart from "../../components/Chart";
import FilterMain from "../../components/FilterMain";
import { getEmoji } from "../../utils/common";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from "react-snaplist-carousel";

const OverallEmotionContainer = ({ children, emotion, value }) => (
  <div className={styles.emotionContainer}>
    <CardGlobal
      style={{
        flex: 1,
        borderWidth: 2,
        padding: "0.5rem",
        background:
          "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
        marginRight: 10,
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>{getEmoji(emotion)}</h1>
    </CardGlobal>
    <div className={styles.textContainer}>
      <h3 style={{ fontSize: "0.75rem" }} className="h3Smaller">
        {emotion}
      </h3>
      <p className="p075">{Math.floor(value * 100)}%</p>
    </div>
  </div>
);

const DiarySummaryContainer = ({
  children,
  aspect,
  sentiment,
  index,
  data,
  chartData,
  setChartData,
  setChartAspect,
}) => (
  <div
    onClick={() => {
      setChartData(chartData);
      setChartAspect(aspect);
    }}
    className={styles.aspectContainer}
  >
    <CardGlobal
      style={{
        height: 45,
        width: 45,

        borderWidth: 1,
        borderRadius: 5,
        padding: "0.5rem",
        marginRight: 10,
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>{index + 1}</h1>
    </CardGlobal>
    <div className={styles.textContainer}>
      <h3 className={styles.aspect}>{aspect}</h3>
      <p className="p06">and you felt</p>
    </div>
    <CardGlobal
      style={{
        height: 45,

        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: "0.5rem",
        marginRight: 10,
        marginLeft: 10,
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: 0 }}>
        {sentiment > 0
          ? "Positive 👍🏻"
          : sentiment === 0
          ? "Neutral 😐"
          : "Negative 👎🏻"}
      </h1>
    </CardGlobal>
  </div>
);

export default function Analytics({ setBackBtn }) {
  const { user } = useAuthContext();

  const { data, error, isPending } = useFetch(
    `https://diarioappapi2.glitch.me/get_analysis_summary/${user.uid}`
  );

  console.log(data && data);

  const data1 = [3.5, 4.2, 3.8, 4.1, 3.9, 4.3, 4.0];
  const data2 = [1, 2.0, 3.8, 4.1, 3.0, 2.0, 4.0];

  const [chartData, setChartData] = useState(data1);
  const [chartAspect, setChartAspect] = useState("Home");

  setBackBtn(false);

  const [openFilter, setOpenFilter] = useState(false);

  return isPending ? (
    <Background pageName={"Analytics"} notificationBtn={false}>
      <div className="loaderScreen">
        <Loader />
      </div>
    </Background>
  ) : (
    <Background pageName={"Analytics"} notificationBtn={false}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <p className={styles.subtitle}>
            Check out the analytics of your diaries
          </p>
          <CardGlobal
            clickable={true}
            handleClick={() => setOpenFilter(true)}
            style={{ padding: "0.3rem 0.7rem", borderWidth: 1 }}
          >
            <p className="p075">Filter</p>
          </CardGlobal>
        </div>

        <p style={{ textAlign: "left", width: "100%" }} class="p1">
          The top 4 emotions you felt were
        </p>
        <div className={styles.overallEmotionContainer}>
          {data &&
            Object.keys(data?.emotions_total_average)
              .slice(0, 4)
              .map((key) => {
                return (
                  <OverallEmotionContainer
                    emotion={key}
                    value={data?.emotions_total_average[key]}
                  />
                );
              })}
        </div>

        <div className={styles.diarySummaryContainer}>
          <p style={{ textAlign: "left", width: "100%" }} class="p1">
            In your diaries, you talked about
          </p>
          <div className={styles.diarySummaryContainer}>
            {data &&
              Object.keys(data?.sentiment_total_average)
                .slice(0, 5)
                .map((key, index) => {
                  return (
                    <DiarySummaryContainer
                      aspect={key}
                      sentiment={data?.sentiment_total_average[key]}
                      index={index}
                      chartData={index % 2 === 0 ? data1 : data2}
                      setChartData={setChartData}
                      setChartAspect={setChartAspect}
                    />
                  );
                })}
          </div>
        </div>

        <div className={styles.chartContainer}>
          <p style={{ marginBottom: "1rem" }} className="p06">
            Click on the aspects to see the sentiment throughout the week
          </p>
          {/* <img
            style={{ width: "100%", marginTop: "0.5rem" }}
            src={SampleChart}
            alt="Sample Chart"
          /> */}

          <CardGlobal
            style={{
              background:
                "linear-gradient(141.24deg, rgba(100, 96, 155, 0.2) 2.08%, rgba(78, 69, 123, 0.2) 95.98%)",
              backdropFilter: "blur(10px)",
              width: "100%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnalyticsChart aspect={chartAspect} chartData={chartData} />
          </CardGlobal>
        </div>
        <FilterMain open={openFilter} setOpen={setOpenFilter} />
      </div>
    </Background>
  );
}
