// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./Explore.module.css";
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

const Therapist = ({
  children,
  name,
  specialisation,
  price,
  photo,
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
      }}
    >
      <img className={styles.image} src={photo} alt="SampleTherapist" />
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
      <p className="p075" style={{ marginBottom: "0.5rem" }}>
        {specialisation}
      </p>
      <CardGlobal
        style={{
          height: 27,
          borderWidth: 1,
          borderRadius: 5,
          padding: "0 0.2rem",
        }}
      >
        <p
          className="p075"
          style={{ margin: "0rem", color: "#CABCFC", fontWeight: 600 }}
        >
          {price}
        </p>
      </CardGlobal>
    </div>
    <div style={styles.arrowContainer}>
      <img src={Next} alt="Next" style={{ width: "10px" }} />
    </div>
  </CardGlobal>
);

export default function Explore({ setBackBtn }) {
  setBackBtn(false);
  const { user } = useAuthContext();

  const { documents: therapists } = useCollection("therapist");
  const [therapistData, setTherapistData] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const navigate = useNavigate();

  const handleClick = (id) => {
    const therapistData = therapists.find((therapist) => therapist.id === id);
    setTherapistData(therapistData);

    // Make therapistData available to the next page
    if (therapistData) {
      const therapistNameConnected = therapistData.name.replace(/\s/g, "");
      navigate(`/therapistprofile/${therapistNameConnected}`, {
        state: therapistData,
      });
    }
  };

  return (
    therapists && (
      <Background pageName={"Explore"} notificationBtn={false}>
        <div className={styles.container}>
          <p className={styles.subtitle}>Find a suitable therapist</p>
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

          <CTAContainer />

          <div className={styles.therapistContainer}>
            <h3 style={{ color: "#CABCFC" }}>Therapists</h3>
            <div className={styles.therapistList}>
              {therapists &&
                therapists.map((therapist) => {
                  return (
                    <Therapist
                      onClick={() => handleClick(therapist.therapistUID)}
                      name={therapist.name && therapist.name}
                      specialisation={
                        therapist.specialities &&
                        `${therapist.specialities[0]} and ${
                          therapist.specialities.length - 1
                        } more`
                      }
                      price={therapist.pricing && therapist.pricing}
                      photo={therapist.photo && therapist.photo}
                    />
                  );
                })}
            </div>
          </div>
          <ExploreFilter open={openFilter} setOpen={setOpenFilter} />
        </div>
      </Background>
    )
  );
}
