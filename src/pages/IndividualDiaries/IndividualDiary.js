import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Close from "../../assets/icons/Close.png";
import CardGlobal from "../../components/Card";
import styles from "./IndividualDiary.module.css";
import { Card } from "@mui/material";
import { simpleDate } from "../../utils/common";
import Comments from "../../assets/icons/Comments.png";
import Grow from "@mui/material/Grow";
import Zoom from "@mui/material/Zoom";
import { getEmoji } from "../../utils/common";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const AspectSentimentContainer = (props) => {
  const { aspect, style, data } = props;
  const centerDiv = {
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "0.3rem 0.2rem",
    width: "100%",
    background:
      "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
  };

  return (
    <>
      <CardGlobal
        style={{
          ...style,
          width: "100%",
          padding: "1rem 0.5rem",
          margin: "0rem 0.25rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>{aspect}</h1>
        <p className="p075">and you felt...</p>
        <div
          style={{ marginRight: 0, marginBottom: "1rem" }}
          className={styles.emotionContainer}
        >
          <CardGlobal
            style={{
              ...centerDiv,
              marginRight: "0.25rem",
              marginLeft: "0.25rem",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>
              {data.value === 1
                ? "Positive"
                : data.value === -1
                ? "Negative"
                : "Neutral"}
            </h1>
          </CardGlobal>
        </div>

        <div className={styles.feedbackContainer}>
          <p style={{ marginBottom: "0.5rem" }} className="p075">
            Is the analysis accurate?
          </p>
          <div className={styles.feedbackButtons}>
            <CardGlobal
              style={{
                background:
                  "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
              }}
              clickable={true}
              handleClick={() => {
                alert("Thank you for your feedback!");
              }}
            >
              <h1 style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>👍</h1>
            </CardGlobal>
            <CardGlobal
              style={{
                background:
                  "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
              }}
              handleClick={() => {
                alert("Thank you for your feedback!");
              }}
            >
              <h1 style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>👎</h1>
            </CardGlobal>
          </div>
        </div>
      </CardGlobal>
    </>
  );
};

const OverallEmotionContainer = ({ emotion, percentage }) => (
  <div style={{ marginTop: 0 }} className={styles.emotionContainer}>
    <CardGlobal
      style={{
        height: 90,
        flex: 1,
        borderWidth: 2,
        background:
          "linear-gradient(141.24deg, rgba(211, 207, 255, 0.2) 2.08%, rgba(166, 156, 220, 0.2) 95.98%)",
        marginRight: 10,
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>{getEmoji(emotion)}</h1>
    </CardGlobal>
    <div className={styles.textContainer}>
      <h3>{emotion}</h3>
      <p className="p1">{percentage}%</p>
    </div>
  </div>
);

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

function SwipeableEdgeDrawer2(props) {
  const { window, open, setOpen, data } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [openComments, setOpenComments] = React.useState(false);

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiPaper-root": {
            height: `calc(100%)`,
            overflow: "visible",
            backgroundColor: "transparent",
          },
        }}
      >
        <StyledBox
          sx={{
            px: 3,
            pb: 2,
            height: "100%",
            overflow: "auto",
            background:
              "linear-gradient(191.65deg, #2D3344 3.44%, #3B306F 99.7%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <div className={styles.upperContainer}>
            <div className={styles.backOrMenuBtn}>
              <CardGlobal
                style={{
                  borderWidth: "1.5px",
                  width: "45px",
                  height: "45px",
                }}
                clickable={true}
                handleClick={toggleDrawer(false)}
              >
                <img className={styles.icons} src={Close} alt="close" />
              </CardGlobal>
            </div>
            <h1
              style={{
                marginTop: "2rem",
                position: "relative",
                color: "white",
              }}
            >
              {data?.date && simpleDate(data?.date)}
            </h1>
          </div>
          <div className={styles.diaryContainer}>
            <div className={styles.diaryContent}>
              <h3 style={{ color: "#CABCFC" }} className="h3smaller">
                {data?.title}
              </h3>
              <CardGlobal
                style={{
                  width: "100%",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <p
                  style={{ lineHeight: "19px", textAlign: "left" }}
                  className="p075"
                >
                  {data?.content}
                </p>
                <div onClick={() => setOpenComments(!openComments)}>
                  <img
                    className={styles.comments}
                    src={Comments}
                    alt="comments"
                  />
                </div>
              </CardGlobal>
              {openComments && (
                <Zoom in={openComments}>
                  <div>
                    <CardGlobal
                      style={{
                        width: "100%",
                        padding: "1rem",
                        marginTop: "2rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      clickable={true}
                      handleClick={() => setOpenComments(!openComments)}
                    >
                      <p
                        style={{
                          width: "100%",
                          textAlign: "left",
                          color: "#CABCFC",
                        }}
                        className="h3smaller"
                      >
                        Therapist Comment
                      </p>
                      <p
                        style={{ lineHeight: "19px", textAlign: "left" }}
                        className="p075"
                      >
                        {data?.comment}
                      </p>
                    </CardGlobal>
                  </div>
                </Zoom>
              )}
            </div>
            <h2 style={{ marginBottom: "1rem" }}>Analytics</h2>
            <p style={{ textAlign: "left", width: "100%" }} class="p1">
              Overall, in the diary, you seemed...
            </p>
            <div className={styles.overallEmotionContainer}>
              {
                // Loop through the data?.analysis.overallSentiment which is an object
                data?.analysis.overallEmotion &&
                  data?.analysis.overallEmotion.map((emotion, index) => {
                    return (
                      <OverallEmotionContainer
                        key={index}
                        emotion={emotion.emotion}
                        percentage={emotion.value * 100}
                      />
                    );
                  })
              }
            </div>
            <p style={{ textAlign: "left", width: "100%" }} class="p1">
              In your diary, you talked about...
            </p>
            <div className={styles.overallEmotionContainer}>
              {data?.analysis.aspectSentiment &&
                data?.analysis.aspectSentiment.map((sentiment, index) => {
                  return (
                    <AspectSentimentContainer
                      key={index}
                      aspect={sentiment.aspect}
                      data={sentiment}
                    />
                  );
                })}

              {/* <AspectSentimentContainer style={{ marginRight: "1rem" }} />
              <AspectSentimentContainer /> */}
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer2.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer2;
