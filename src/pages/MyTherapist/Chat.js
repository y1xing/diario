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
import styles from "./Chat.module.css";
import { Card, Paper } from "@mui/material";
import Form from "../../components/Form";
import ButtonGlobal from "../../components/Button";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from "react-snaplist-carousel";
import { useSendNotification } from "../../hooks/useSendNotification";
import Send from "../../assets/icons/Send.png";
import Paperclip from "../../assets/icons/Paperclip.png";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

function ChatDrawer(props) {
  const { window, open, setOpen, userId, therapistId } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { sendNotification } = useSendNotification(
    `userData/${userId}/notification`
  );

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
            <h3
              style={{
                marginTop: "2rem",
                position: "relative",
                color: "#CABCFC",
              }}
              className="h3"
            >
              Dr Priscilla Lim
            </h3>
          </div>
          <div className={styles.diaryContainer}>
            <div className={styles.diaryContent2}>
              <CardGlobal
                style={{
                  borderWidth: "1.5px",

                  height: "45px",
                  justifyContent: "flex-start",
                  padding: "0 1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <p className="p1">Hello Yi Xing, how are you?</p>
              </CardGlobal>
              <p className="p075">11:00 AM</p>
            </div>
            <div className={styles.diaryContent}>
              <CardGlobal
                style={{
                  borderWidth: "1.5px",

                  height: "45px",
                  justifyContent: "flex-end",
                  padding: "0 1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <p className="p1">hello dr Priscilla</p>
              </CardGlobal>
              <p className="p075">12:00 PM</p>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <CardGlobal
              style={{
                borderWidth: "1.5px",
                width: "45px",
                height: "45px",
              }}
              clickable={true}
              handleClick={() => {
                console.log("send message");
              }}
            >
              <img
                style={{
                  width: "20px",
                }}
                src={Paperclip}
                alt="Paperclip Icon"
              />
            </CardGlobal>
            <Form
              style={{ width: "100%", height: "45px", borderWidth: "1px" }}
              placeholder="Message"
            />
            <CardGlobal
              style={{
                borderWidth: "1.5px",
                width: "45px",
                height: "45px",
              }}
              clickable={true}
              handleClick={() => {
                console.log("send message");
              }}
            >
              <img
                style={{
                  width: "20px",
                }}
                src={Send}
                alt="Send Icon"
              />
            </CardGlobal>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

ChatDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ChatDrawer;
