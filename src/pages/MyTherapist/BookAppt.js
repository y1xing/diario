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
import styles from "./BookAppt.module.css";
import { Card } from "@mui/material";
import Form from "../../components/Form";
import ButtonGlobal from "../../components/Button";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
} from "react-snaplist-carousel";
import { useSendNotification } from "../../hooks/useSendNotification";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const DateContainer = ({ date, day, selected, handleSelected, index }) => {
  return (
    <CardGlobal
      style={{
        padding: "1rem",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          selected === index &&
          "linear-gradient(141.24deg, #64609B 2.08%, #4E457B 95.98%)",
      }}
      clickable={true}
      handleClick={() => {
        handleSelected(index);
        console.log(index);
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>{day}</h1>
      <p style={{ fontSize: "3rem", fontWeight: "400", marginTop: "1rem" }}>
        {date}
      </p>
    </CardGlobal>
  );
};

const TimeContainer = ({ time, index, selected, handleSelected }) => {
  return (
    <CardGlobal
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          selected === index &&
          "linear-gradient(141.24deg, #64609B 2.08%, #4E457B 95.98%)",
      }}
      clickable={true}
      handleClick={() => {
        handleSelected(index);
        console.log(index);
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>{time}</h1>
    </CardGlobal>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

function BookAppt(props) {
  const { window, open, setOpen, userId, therapistId } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { sendNotification } = useSendNotification(
    `userData/${userId}/notification`
  );

  const { sendNotification: sendTherapistNotification, response } =
    useSendNotification(`therapist/${therapistId}/notification`);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateAndDay, setDateAndDay] = useState([
    {
      date: "11",
      day: "Mon",
    },
    {
      date: "12",
      day: "Tue",
    },
    {
      date: "13",
      day: "Wed",
    },
    {
      date: "14",
      day: "Thu",
    },
    {
      date: "15",
      day: "Fri",
    },

    {
      date: "16",
      day: "Sat",
    },
  ]);

  const [time, setTime] = useState([
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
  ]);

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
              Book Appointment
            </h3>
          </div>
          <div className={styles.diaryContainer}>
            <div className={styles.diaryContent}>
              <h3 className="h3">Choose dates</h3>
              <SnapList className={styles.notebookContainer}>
                {dateAndDay.map((date, index) => {
                  return (
                    <SnapItem
                      margin={{ right: "15px" }}
                      // snapAlign="center"
                    >
                      <DateContainer
                        date={date.date}
                        day={date.day}
                        index={index}
                        selected={selectedDate}
                        handleSelected={setSelectedDate}
                      />
                    </SnapItem>
                  );
                })}
              </SnapList>
            </div>
            <div className={styles.diaryContent}>
              <h3 className="h3">Choose time</h3>
              <SnapList className={styles.notebookContainer}>
                {time.map((time, index) => {
                  return (
                    <SnapItem
                      margin={{ right: "15px" }}
                      // snapAlign="center"
                    >
                      <TimeContainer
                        time={time}
                        selected={selectedTime}
                        handleSelected={setSelectedTime}
                        index={index}
                      />
                    </SnapItem>
                  );
                })}
              </SnapList>
            </div>
            <div className={styles.diaryContent}>
              <h3 className="h3">Remarks</h3>
              <div className={styles.inputContainer}>
                <Form
                  style={{
                    width: "100%",
                  }}
                  rows="5"
                  placeholder="Let us know how you feel today"
                  type="textArea"
                ></Form>
              </div>
            </div>
            <ButtonGlobal
              style={{ width: "100%", marginTop: "2rem" }}
              label="Book Appointment"
              handleClick={() => {
                sendNotification(
                  "You have booked an appointment with Dr John Doe",
                  "Appointment Booking"
                );
                sendTherapistNotification(
                  "You have a new appointment with John Doe",
                  "Appointment Booking"
                );
                alert("Appointment booked successfully");
                setOpen(false);
              }}
            />
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

BookAppt.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BookAppt;
