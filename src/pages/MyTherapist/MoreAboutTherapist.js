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
import styles from "./MoreAboutTherapist.module.css";
import { useDocument } from "../../hooks/useDocument";
import Link from "../../assets/icons/Link.png";

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

function MoreAboutTherapist(props) {
  const { window, open, setOpen, therapistData: data } = props;

  console.log("data", data);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Get the therapist's document

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
            <h2
              style={{
                marginTop: "2rem",
                position: "relative",
                color: "#CABCFC",
              }}
            >
              {data?.name}
            </h2>
          </div>
          <div className={styles.lowerContainer}>
            <div className={styles.upcomingApptContainer}>
              <h3 className={styles.upcomingAppt}>Specialisation</h3>
              <div className={styles.specialisationGrid}>
                {data?.specialities &&
                  data?.specialities.map((item, index) => {
                    return (
                      <CardGlobal
                        style={{
                          padding: "3px 12px",
                          borderRadius: 10,
                          borderWidth: 1,
                        }}
                      >
                        <p className={styles.moreAbout}>{item}</p>
                      </CardGlobal>
                    );
                  })}
              </div>
            </div>

            <div className={styles.upcomingApptContainer}>
              <h3 className={styles.upcomingAppt}>About</h3>
              <CardGlobal
                style={{
                  width: "100%",
                  padding: "1rem 1rem 0rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  // marginBottom: "1rem",
                }}
              >
                <p
                  style={{ lineHeight: "19px", textAlign: "left" }}
                  className="p075"
                >
                  {data?.about && data?.about.slice(0, 200)}...
                </p>
                <p
                  onClick={() => console.log("hello")}
                  className={styles.viewAll}
                >
                  Read More...
                </p>
              </CardGlobal>
            </div>
            <div className={styles.upcomingApptContainer}>
              <h3 className={styles.upcomingAppt}>Contact Info</h3>
              <div className={styles.specialisationGrid}>
                {["Phone", "Website"].map((item, index) => {
                  return (
                    <CardGlobal
                      style={{
                        padding: "3px 12px",
                        borderRadius: 10,
                        borderWidth: 1,
                      }}
                      clickable={true}
                    >
                      <img
                        src={Link}
                        alt="link"
                        style={{ height: "10px", marginRight: "0.5rem" }}
                      />
                      <p className={styles.moreAbout}>{item}</p>
                    </CardGlobal>
                  );
                })}
              </div>
            </div>
            <div className={styles.upcomingApptContainer}>
              <h3 className={styles.upcomingAppt}>Licensing</h3>
              <CardGlobal
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  // marginBottom: "1rem",
                }}
              >
                <p
                  style={{ lineHeight: "19px", textAlign: "left" }}
                  className="p075"
                >
                  {data?.license && data?.license}
                </p>
              </CardGlobal>
            </div>
            <div className={styles.upcomingApptContainer}>
              <h3 className={styles.upcomingAppt}>Location</h3>
              <CardGlobal
                style={{
                  padding: "3px 12px",
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                clickable={true}
              >
                <img
                  src={Link}
                  alt="link"
                  style={{ height: "10px", marginRight: "0.5rem" }}
                />
                <p className={styles.moreAbout}>
                  {data?.location && data?.location}
                </p>
              </CardGlobal>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

MoreAboutTherapist.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MoreAboutTherapist;
