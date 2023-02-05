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
import styles from "./Connect.module.css";
import { Card } from "@mui/material";
import Form from "../../components/Form";
import ButtonGlobal from "../../components/Button";
import SampleDateIcon from "../../assets/icons/SampleDateIcon.png";

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

function Connect(props) {
  const { window, open, setOpen } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
              Connect
            </h1>
          </div>
          <div className={styles.diaryContainer}>
            <div className={styles.diaryContent}>
              <h3 style={{ color: "#CABCFC" }} className="h3smaller">
                Cheryl Lim
              </h3>
              <div className={styles.inputContainer}>
                <Form
                  style={{
                    width: "100%",
                  }}
                  disabled={true}
                  placeholder=""
                  value="Hey Dr, I am Cheryl and I am 20 years old and I am suffering from depression"
                  type="textArea"
                ></Form>
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
                    <div
                      style={{ flex: 0.5 }}
                      className={styles.contentContainer}
                    >
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
                    <div
                      style={{ flex: 0.5 }}
                      className={styles.contentContainer2}
                    >
                      <div className={styles.textContainer}>
                        <p className={styles.text}>+65 9876 5432 </p>
                      </div>
                      <div className={styles.textContainer}>
                        <p className={styles.text}>cheryltan@gmail.com</p>
                      </div>
                      <div className={styles.textContainer}>
                        <p className={styles.text}>{"Jan 20, 1999"}</p>
                      </div>
                      <div className={styles.textContainer}>
                        <p className={styles.text}>Female</p>
                      </div>
                    </div>
                  </div>
                </CardGlobal>
              </div>
            </div>
            <ButtonGlobal
              style={{ width: "100%", marginTop: "2rem" }}
              label="Accept Connection"
              handleClick={() => alert("Connection Accepted")}
            />
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

Connect.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Connect;