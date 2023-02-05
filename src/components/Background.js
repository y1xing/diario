import React, { useState } from "react";
import styles from "./Background.module.css";
import CardGlobal from "./Card";
import Back from "../assets/icons/Back.png";
import Menu from "../assets/icons/Menu.png";
import NotificationIcon from "../assets/icons/Notification.png";
import { width } from "@mui/system";
import { useAuthContext } from "../hooks/useContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Background({
  children,
  pageName,
  typeBtn,
  notificationBtn,
}) {
  const { user } = useAuthContext();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const menuOrBack = () => {
    return <img className={styles.icons} src={Back} alt="back" />;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={styles.container}>
      {/* {user && (
        <div style={{ zIndex: 1000000, position: "absolute" }}>
          <Navbar
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
        </div>
      )} */}

      {
        // If pageName, typeBtn, notificationBtn are not passed in, nothing will be rendered
        pageName || notificationBtn ? (
          <div className={styles.upperContainer}>
            <div className={styles.backOrMenuBtn}>
              {typeBtn && (
                <CardGlobal
                  style={{
                    borderWidth: "1.5px",
                    width: "45px",
                    height: "45px",
                  }}
                  handleClick={navigateBack}
                >
                  {menuOrBack()}
                </CardGlobal>
              )}
            </div>

            <h1 style={{ marginTop: "2rem", position: "relative" }}>
              {pageName}
            </h1>

            <div className={styles.notificationBtn}>
              {notificationBtn && (
                <img
                  className={styles.notificationIcon}
                  style={{
                    height: "35px",
                    marginTop: "8px",
                    marginRight: "4px",
                  }}
                  src={NotificationIcon}
                  alt="notification"
                  onClick={() => navigate("/notification")}
                />
              )}
            </div>
          </div>
        ) : // If pageName not passed in but typeBtn is passed in, only the back or menu button will be rendered
        typeBtn ? (
          <div className={styles.upperContainer}>
            <div className={styles.backOrMenuBtn}>
              {typeBtn && (
                <CardGlobal
                  style={{
                    borderWidth: "1.5px",
                    width: "45px",
                    height: "45px",
                  }}
                  handleClick={
                    typeBtn === "menu" ? handleDrawerToggle : navigateBack
                  }
                >
                  {menuOrBack()}
                </CardGlobal>
              )}
            </div>
          </div>
        ) : null
      }
      <div
        style={{
          paddingTop: 110,
        }}
        className={styles.container}
      >
        {children}
      </div>
    </div>
  );
}
