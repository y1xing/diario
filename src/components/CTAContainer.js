import styles from "./CTAContainer.module.css";
import SampleIcon from "../assets/icons/SampleIcon.png";
import ButtonGlobal from "../components/Button";
import CardGlobal from "./Card";
import Message2 from "../assets/PurpleIcon/Message2.png";
import { useNavigate } from "react-router-dom";

export default function CTAContainer(props) {
  const navigate = useNavigate();

  return (
    <CardGlobal
      style={{
        width: "100%",
        padding: "1rem",
      }}
    >
      <div className={styles.overallDiaryContainer}>
        <div style={{ width: "100%" }} className={styles.leftDiaryContainer}>
          <p
            className="h3smaller"
            style={{
              lineHeight: "20px",
              textAlign: "left",
              color: "#CABCFC",
              marginBottom: "10px",
            }}
          >
            Book Appointment
          </p>
          <p
            style={{
              lineHeight: "18px",
              textAlign: "left",
            }}
            className="p075"
          >
            If you feel like you need a listening ear. Book an appointment with
            any of our therapist{" "}
          </p>
          <ButtonGlobal
            label="Book Now"
            style={{
              marginTop: "1rem",
              height: "28px",
              width: "116px",
              fontSize: "0.75rem",
              borderRadius: "5px",
            }}
            handleClick={() => navigate("/mytherapist")}
          />
        </div>
        <div style={{ width: "45%" }} className={styles.rightDiaryContainer}>
          <img
            src={Message2}
            alt="sample icon"
            style={{
              width: "80px",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      </div>
    </CardGlobal>
  );
}
