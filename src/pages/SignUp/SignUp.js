// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./SignUp.module.css";
import Background from "../../components/Background";
import ButtonGlobal from "../../components/Button";
import { useAuthContext } from "../../hooks/useContext";
import Facebook from "../../assets/icons/Facebook.png";
import Google from "../../assets/icons/Google.png";
import Twitter from "../../assets/icons/Twitter.png";
import Form from "../../components/Form";
import CardGlobal from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function SignUp() {
  const { user, authIsReady } = useAuthContext();
  const navigate = useNavigate();

  const { signUp, error, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, confirmPassword);
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
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="text"
          ></Form>
          <Form
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="password"
          ></Form>
          <Form
            handleChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
          ></Form>
          <p
            className="p1"
            style={{
              color: "#FF6161",
            }}
          >
            {error && error}
          </p>
          <div className={styles.checkBoxContainer}>
            <input
              style={{
                width: "23px",
                height: "23px",
                borderRadius: "5px",
                borderWidth: "2px",
                marginRight: "1rem",
              }}
              type="checkbox"
            />

            <p className="p06">
              I agree to the{" "}
              <span style={{ color: "#CABCFC", fontWeight: "600" }}>
                Terms and Conditions
              </span>
            </p>
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <ButtonGlobal
            handleClick={handleSubmit}
            isPending={isPending}
            label="Sign Up"
            style={{ marginBottom: "1rem" }}
          />
          <div className={styles.socialMediaContainer}>
            <img src={Facebook} alt="facebook" />
            <img src={Google} alt="google" />
            <img src={Twitter} alt="twitter" />
          </div>
          <p className="p1">
            Already have an account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              // href="/login"
              style={{ color: "#CABCFC", fontWeight: "600" }}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </Background>
  );
}
