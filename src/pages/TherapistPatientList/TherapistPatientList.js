// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./TherapistPatientList.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import ButtonGlobal from "../../components/Button";
import CardGlobal from "../../components/Card";
import CTAContainer from "../../components/CTAContainer";
import SampleTherapist from "../../assets/images/SampleTherapist.png";
import { useNavigate } from "react-router-dom";
import Next from "../../assets/icons/Next.png";
import { useCollection } from "../../hooks/useCollection";
import ExploreFilter from "../../components/ExploreFilter";
import Connect from "./Connect";

const Patients = ({
  children,
  name,
  specialisation,
  phoneNumber,
  image,
  onClick,
}) => (
  <CardGlobal
    style={{
      width: "100%",

      marginBottom: "1rem",
      padding: "1rem",
    }}
    clickable={true}
    handleClick={onClick}
  >
    <CardGlobal
      style={{
        filter: "drop-shadow(-2px 4px 10px rgba(0, 0, 0, 0.25))",
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 15,
        background: "linear-gradient(141.24deg, #64609B 2.08%, #4E457B 95.98%)",
        backdropFilter: "blur(10px)",
        /* Note: backdrop-filter has minimal browser support */
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>👧</h1>
    </CardGlobal>
    <div className={styles.therapistInfo}>
      <h3
        className="h3smaller"
        style={{
          color: "#CABCFC",
          textAlign: "left",
          lineHeight: "20px",
          marginBottom: "0.3rem",
        }}
      >
        {name}
      </h3>
      <CardGlobal
        style={{
          height: 27,
          borderWidth: 1,
          borderRadius: 5,
          padding: "0 0.2rem",
          marginBottom: "0.2rem",
        }}
      >
        <p
          className="p075"
          style={{ margin: "0rem", color: "#CABCFC", fontWeight: 600 }}
        >
          {phoneNumber}
        </p>
      </CardGlobal>
      <p className="p075" style={{ marginBottom: "0.5rem", textAlign: "left" }}>
        Last Appointment: Jan 6, 2023
      </p>
    </div>
    <div style={styles.arrowContainer}>
      <img src={Next} alt="Next" style={{ width: "10px" }} />
    </div>
  </CardGlobal>
);

const Connection = ({
  children,
  name,
  specialisation,
  phoneNumber,
  image,
  onClick,
}) => (
  <CardGlobal
    style={{
      width: "100%",

      marginBottom: "1rem",
      padding: "1rem",
    }}
    clickable={true}
    handleClick={onClick}
  >
    <CardGlobal
      style={{
        filter: "drop-shadow(-2px 4px 10px rgba(0, 0, 0, 0.25))",
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 15,
        background: "linear-gradient(141.24deg, #64609B 2.08%, #4E457B 95.98%)",
        backdropFilter: "blur(10px)",
        /* Note: backdrop-filter has minimal browser support */
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>👧</h1>
    </CardGlobal>
    <div className={styles.therapistInfo}>
      <h3
        className="h3smaller"
        style={{
          color: "#CABCFC",
          textAlign: "left",
          lineHeight: "20px",
          marginBottom: "0.3rem",
        }}
      >
        {name}
      </h3>
      <CardGlobal
        style={{
          height: 27,
          borderWidth: 1,
          borderRadius: 5,
          padding: "0 0.2rem",
          marginBottom: "0.2rem",
        }}
      >
        <p
          className="p075"
          style={{ margin: "0rem", color: "#CABCFC", fontWeight: 600 }}
        >
          {phoneNumber}
        </p>
      </CardGlobal>
      <p className="p075" style={{ marginBottom: "0.5rem", textAlign: "left" }}>
        Hey Dr Priscilla, I am cheryl and I am currently...
      </p>
    </div>
    <div style={styles.arrowContainer}>
      <img src={Next} alt="Next" style={{ width: "10px" }} />
    </div>
  </CardGlobal>
);

export default function TherapistPatientList({ setBackBtn }) {
  setBackBtn(false);
  const { user } = useAuthContext();

  // TODO: Change to user id instead of hardcoded
  const { documents: patients } = useCollection(
    `therapistPatients/${user.uid}/patients`
  );
  const [patientData, setpatientData] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openConnect, setOpenConnect] = useState(false);

  const navigate = useNavigate();

  const handleClick = (id) => {
    const patientData = patients.find((patient) => patient.uid === id);
    setpatientData(patients.find((patient) => patient.uid === id));
    // Make therapistData available to the next page
    if (patientData) {
      console.log("patientData", patientData);
      const patientNameConnected = patientData.firstName.replace(/\s/g, "");
      navigate(`/patientprofile/${patientNameConnected}`, {
        state: patientData,
      });
    }
  };

  return (
    patients && (
      <Background pageName={"My Patients"} notificationBtn={true}>
        <div className={styles.container}>
          <p className={styles.subtitle}>Find your patients</p>
          <div className={styles.filterContainer}>
            <Form
              placeholder="Search"
              noMarginBottom={true}
              style={{
                height: 30,
                borderWidth: 1,
                width: "100%",
                marginRight: 10,
              }}
            />
            <CardGlobal
              clickable={true}
              handleClick={() => setOpenFilter(true)}
              style={{ padding: "0.5rem 0.7rem", borderWidth: 1 }}
            >
              <p className="p075">Filter</p>
            </CardGlobal>
          </div>

          <div
            style={{ marginTop: "0rem" }}
            className={styles.therapistContainer}
          >
            <h3 style={{ color: "#CABCFC" }}>Connection Request</h3>
            <div className={styles.therapistList}>
              <Connection
                onClick={() => setOpenConnect(true)}
                name={"Cheryl Lim"}
                phoneNumber={"+65 9876 5432"}
              />
            </div>
          </div>

          <div className={styles.therapistContainer}>
            <h3 style={{ color: "#CABCFC" }}>Patients</h3>
            <div className={styles.therapistList}>
              {patients &&
                patients.map((patient) => {
                  return (
                    <Patients
                      onClick={() => handleClick(patient.uid)}
                      name={patient.firstName && patient.firstName}
                      specialisation={
                        patient.specialities &&
                        `${patient.specialities[0]} and ${
                          patient.specialities.length - 1
                        } more`
                      }
                      phoneNumber={patient.phone && patient.phone}
                      photo={patient.photo && patient.photo}
                    />
                  );
                })}
            </div>
          </div>
          <ExploreFilter open={openFilter} setOpen={setOpenFilter} />
          <Connect open={openConnect} setOpen={setOpenConnect} />
        </div>
      </Background>
    )
  );
}
