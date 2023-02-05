// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./GetStarted.module.css";
import Background from "../../components/Background";
import ButtonGlobal from "../../components/Button";
import { useAuthContext } from "../../hooks/useContext";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={Logo} alt="logo" />
          <h1>Diario</h1>
        </div>

        <div className={styles.subtitleContainer}>
          <p className="p1" style={{ width: "70%" }}>
            Begin your journey of Health, Mental Wellness and Self-discovery
            with Diario today!
          </p>
          <p className="p1" style={{ width: "70%" }}>
            <em>Do use mobile for best experience</em>
          </p>
        </div>

        <div className={styles.bottomContainer}>
          <ButtonGlobal
            handleClick={() => navigate("/signup")}
            label="Get Started"
            style={{ marginBottom: "1rem" }}
          />
          <p className="p1">
            Already have an account?{" "}
            <a href="/login" style={{ color: "#CABCFC", fontWeight: "600" }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </Background>
  );
}
