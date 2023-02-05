// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Login.module.css";
import Background from "../../components/Background";
import ButtonGlobal from "../../components/Button";
import { useAuthContext } from "../../hooks/useContext";
import Facebook from "../../assets/icons/Facebook.png";
import Google from "../../assets/icons/Google.png";
import Twitter from "../../assets/icons/Twitter.png";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Login({ setIsTherapist }) {
  const { user, authIsReady } = useAuthContext();
  const navigate = useNavigate();

  const { login, error, isPending, isTherapist } = useLogin();

  // useEffect(() => {
  //   setIsTherapist(isTherapist);
  // }, [isTherapist]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={Logo} alt="logo" />
          <h1 className={styles.title}>Diario</h1>
        </div>

        <div className={styles.subtitleContainer}>
          <Form
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
          ></Form>
          <Form
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          ></Form>
          <p className="p1" style={{ color: "#FF6161" }}>
            {error && error}
          </p>
        </div>

        <div className={styles.bottomContainer}>
          <ButtonGlobal
            isPending={isPending}
            label="Sign In"
            handleClick={handleSubmit}
            style={{ marginBottom: "1rem" }}
          />
          <div className={styles.socialMediaContainer}>
            <img src={Facebook} alt="facebook" />
            <img src={Google} alt="google" />
            <img src={Twitter} alt="twitter" />
          </div>
          <p className="p1">
            Don't have an account?{" "}
            <a
              onClick={() => {
                navigate("/signup");
              }}
              // href="/signup"
              style={{ fontWeight: "600" }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </Background>
  );
}
