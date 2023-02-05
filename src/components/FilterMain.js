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
import Close from "../assets/icons/Close.png";
import CardGlobal from "../components/Card";
import styles from "./FilterMain.module.css";
import { Card } from "@mui/material";
import Form from "../components/Form";
import ButtonGlobal from "../components/Button";
import DateSlider from "./DateSlide";

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

function FilterMain(props) {
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
              Filter
            </h1>
          </div>
          <div className={styles.lowerContainer}>
            <div className={styles.inputContainer}>
              <h3 className={styles.label}>Sort By</h3>

              {
                // Sorting for diaries
                ["Newest", "Oldest"].map((item, index) => {
                  return (
                    <div className={styles.checkBoxContainer}>
                      <p className="p1">{item}</p>
                      <CardGlobal
                        style={{
                          width: "23px",
                          height: "23px",
                          borderRadius: "5px",
                          borderWidth: "2px",
                          marginRight: "1rem",
                        }}
                      />
                    </div>
                  );
                })
              }
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.label}>Date Range</h3>
              <DateSlider />
              <div className={styles.dateRange}>
                <p className="p1">1 Jan 2023</p>
                <p className="p1">2 Feb 2023</p>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <h3 className={styles.label}>Emotions</h3>

              {
                // Sorting for diaries
                ["Happy", "Sad", "Angry", "Bored", "Excited"].map(
                  (item, index) => {
                    return (
                      <div className={styles.checkBoxContainer}>
                        <p className="p1">{item}</p>
                        <CardGlobal
                          style={{
                            width: "23px",
                            height: "23px",
                            borderRadius: "5px",
                            borderWidth: "2px",
                            marginRight: "1rem",
                          }}
                        />
                      </div>
                    );
                  }
                )
              }
            </div>
          </div>

          <ButtonGlobal
            style={{
              width: "80%",
              marginTop: "2rem",
              position: "absolute",
              bottom: "2rem",
            }}
            label="Filter"
            handleClick={() => setOpen(false)}
          />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

FilterMain.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default FilterMain;
