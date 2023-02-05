import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styles from "./WriteDiaryModal.module.css";
import Pencil from "../assets/PurpleIcon/Pencil.png";
import Form from "./Form";
import ButtonGlobal from "./Button";
import { useFetch } from "../hooks/useFetch";

const drawerBleeding = 50;

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

function SwipeableEdgeDrawer(props) {
  const { window, open2, setOpen2, uid } = props;
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { data, error, isLoading, postData } = useFetch(
    "https://diarioappapi2.glitch.me/post_diary",
    "POST"
  );

  const handleSubmit = () => {
    postData({ uid, title, content });
    alert("Diary Posted!");
    setOpen2(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen2(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Global
        styles={{
          ".css-1ytz6dp": {
            backgroundColor: "transparent",
            height: 0,
          },

          ".css-1ytz6dp::before": {
            backgroundColor: "transparent",
            height: 0,
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open2}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiPaper-root": {
            height: `calc(87% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: "transparent",
          },
        }}
      >
        <StyledBox sx={localStyles.pullerContainer}>
          <div
            onClick={() => {
              toggleDrawer(true);
            }}
            style={{
              justifyContent: open2 && "center",
              paddingTop: open2 ? 0 : 10,
              zIndex: 100,
            }}
            className={styles.pullerContainer}
          >
            <img
              style={{
                width: 40,
              }}
              src={Pencil}
              alt="pencil"
              className={styles.pencil}
            />
          </div>
        </StyledBox>
        <StyledBox sx={localStyles.bottomContainer}>
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <h1 style={{ color: "white" }}>Write a diary</h1>
            </div>
            <div className={styles.inputContainer}>
              <Form
                style={{
                  width: "100%",
                }}
                placeholder="Title"
                type="text"
                handleChange={(e) => setTitle(e.target.value)}
                value={title}
              ></Form>
            </div>
            <div className={styles.inputContainer}>
              <Form
                style={{
                  width: "100%",
                }}
                placeholder="How do you feel today"
                type="textArea"
                handleChange={(e) => setContent(e.target.value)}
                value={content}
              ></Form>
            </div>
            <div className={styles.buttonContainer}>
              <ButtonGlobal label="Add Diary" handleClick={handleSubmit} />
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const localStyles = {
  pullerContainer: {
    position: "absolute",
    top: -drawerBleeding,
    borderTopLeftRadius: 41,
    borderTopRightRadius: 41,
    visibility: "visible",
    right: 0,
    left: 0,
    backgroundColor: "transparent",
    height: drawerBleeding,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomContainer: {
    px: 2,
    pb: 2,
    pt: 7,
    height: "100%",
    overflow: "auto",
    background: "linear-gradient(180deg, #30344B 0%, #383266 100%)",
    borderTopLeftRadius: 41,
    borderTopRightRadius: 41,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default SwipeableEdgeDrawer;
