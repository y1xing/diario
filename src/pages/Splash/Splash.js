// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Splash.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";

export default function Splash() {
  const { logout } = useLogout();

  return (
    <Background>
      <div className={styles.container}>
        <img className={styles.logo} src={Logo} alt="logo" />
        <h1 className={styles.title}>Diario</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </Background>
  );
}
