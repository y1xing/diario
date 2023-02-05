// Splash page
import { useState, useEffect } from "react";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/images/logo.png";
import styles from "./TherapistProfile.module.css";
import Background from "../../components/Background";
import { useAuthContext } from "../../hooks/useContext";
import { useLogout } from "../../hooks/useLogout";
import Form from "../../components/Form";
import CardGlobal from "../../components/Card";
import NotificationIcon from "../../assets/icons/Notification.png";
import SampleCoverPhoto from "../../assets/images/SampleCoverPhoto.png";
import SampleTherapist from "../../assets/images/SampleTherapist.png";
import SampleDateIcon from "../../assets/icons/SampleDateIcon.png";
import SampleCrossIcon from "../../assets/icons/SampleCrossIcon.png";
import ButtonGlobal from "../../components/Button";
import Link from "../../assets/icons/Link.png";
import Connect from "./Connect";
import { useLocation } from "react-router-dom";
import ReadMore from "../../components/ReadMore";

export default function TherapistProfile({ setBackBtn }) {
  const { user } = useAuthContext();
  const location = useLocation();

  const data = location.state;

  setBackBtn(true);

  const [navbar, setNavbar] = useState(false);

  const [openConnect, setOpenConnect] = useState(false);
  const [openReadMore, setOpenReadMore] = useState(false);

  const changeBackground = () => {
    console.log("hello");
    if (document.body.scrollY > 100) {
      setNavbar(true);
      console.log("navbar", navbar);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("scroll", changeBackground);
    console.log(window.pageYOffset);
  });

  return (
    <div className={styles.container}>
      <div
        style={{
          background: navbar && "red",
          backdropFilter: navbar && "blur(20px)",
        }}
        className={styles.navBarContainer}
      />
      <div className={styles.upperContainer}>
        <div className={styles.coverPhoto}>
          <img src={SampleCoverPhoto} alt="cover photo" />
        </div>
        <img
          src={data && data?.photo}
          alt="therapist"
          className={styles.therapistPic}
        />
      </div>
      <div className={styles.lowerContainer}>
        <h2 className={styles.name}>{data.name}</h2>
      </div>
      <CardGlobal
        style={{
          padding: "3px 6px",
          borderRadius: 5,
          borderWidth: 1,
        }}
      >
        <p className={styles.moreAbout}>{data.pricing}</p>
      </CardGlobal>
      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Specialisation</h3>
        <div className={styles.specialisationGrid}>
          {data.specialities &&
            data.specialities.map((item, index) => {
              return (
                <CardGlobal
                  style={{
                    padding: "3px 12px",
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                >
                  <p className={styles.moreAbout}>{item}</p>
                </CardGlobal>
              );
            })}
        </div>
      </div>

      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>About</h3>
        <CardGlobal
          style={{
            width: "100%",
            padding: "1rem 1rem 0rem 1rem",
            display: "flex",
            flexDirection: "column",
            // marginBottom: "1rem",
          }}
        >
          <p style={{ lineHeight: "19px", textAlign: "left" }} className="p075">
            {data.about && data.about.slice(0, 200)}...
          </p>
          <p onClick={() => setOpenReadMore(true)} className={styles.viewAll}>
            Read More...
          </p>
        </CardGlobal>
      </div>
      <div className={styles.upcomingApptContainer}>
        <h3 className={styles.upcomingAppt}>Contact Info</h3>
        <div className={styles.specialisationGrid}>
          {["Phone", "Website"].map((item, index) => {
            return (
              <CardGlobal
                style={{
                  padding: "3px 12px",
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                clickable={true}
              >
                <img
                  src={Link}
                  alt="link"
                  style={{ height: "10px", marginRight: "0.5rem" }}
                />
                <p className={styles.moreAbout}>{item}</p>
              </CardGlobal>
            );
          })}
        </div>
        <div className={styles.upcomingApptContainer}>
          <h3 className={styles.upcomingAppt}>Licensing</h3>
          <CardGlobal
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              // marginBottom: "1rem",
            }}
          >
            <p
              style={{ lineHeight: "19px", textAlign: "left" }}
              className="p075"
            >
              {data.license && data.license}
            </p>
          </CardGlobal>
        </div>
        <div className={styles.upcomingApptContainer}>
          <h3 className={styles.upcomingAppt}>Location</h3>
          <CardGlobal
            style={{
              padding: "3px 12px",
              borderRadius: 10,
              borderWidth: 1,
            }}
            clickable={true}
          >
            <img
              src={Link}
              alt="link"
              style={{ height: "10px", marginRight: "0.5rem" }}
            />
            <p className={styles.moreAbout}>{data.location && data.location}</p>
          </CardGlobal>
        </div>

        <ButtonGlobal
          style={{ width: "100%", marginTop: "2rem" }}
          label="Connect"
          handleClick={() => setOpenConnect(true)}
        />
      </div>
      <Connect open={openConnect} setOpen={setOpenConnect} />
      <ReadMore
        open={openReadMore}
        setOpen={setOpenReadMore}
        title="About"
        content={data.about}
      />
    </div>
  );
}
