import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import styles from "./Navbar.module.css";
import Logo from "../assets/images/logo.png";

import SampleNav from "../assets/icons/SampleNav.png";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import ButtonGlobal from "./Button";
import { useAuthContext } from "../hooks/useContext";
import useWindowDimensions from "../hooks/getWindowDimensions";
import CardGlobal from "./Card";
import Menu from "../assets/icons/Menu.png";
import { useNavigate } from "react-router-dom";
import Back from "../assets/icons/Back.png";
import HomeIcon from "../assets/PurpleIcon/Home.png";
import AnalyticsIcon from "../assets/PurpleIcon/Analytics.png";
import DiaryIcon from "../assets/PurpleIcon/Diary21.png";
import ExploreIcon from "../assets/PurpleIcon/Explore21.png";
import MyTherapistIcon from "../assets/PurpleIcon/MyTherapist.png";
import WriteDiaryIcon from "../assets/PurpleIcon/WriteDiary.png";

const drawerWidth = 300;

export default function NavBar(props) {
  const { logout } = useLogout();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { window, backBtn, isTherapist } = props;

  const [mobileOpen2, setMobileOpen] = useState(false);

  const handleDrawerToggle2 = () => {
    if (backBtn) {
      navigate(-1);
    } else {
      setMobileOpen(!mobileOpen2);
    }
  };

  const { height, width } = useWindowDimensions();

  const navBarContent = !isTherapist
    ? ["Home", "Diaries", "Analytics", "Explore", "MyTherapist", "Profile"]
    : ["Home", "Profile"];

  // Navbar content with their respective icons
  const navBarContentWithIcons = !isTherapist
    ? [
        { name: "Home", icon: HomeIcon },
        { name: "Diaries", icon: DiaryIcon },
        { name: "Analytics", icon: AnalyticsIcon },
        { name: "Explore", icon: ExploreIcon },
        { name: "MyTherapist", icon: MyTherapistIcon },
        { name: "Profile", icon: WriteDiaryIcon },
      ]
    : [
        { name: "Home", icon: HomeIcon },
        { name: "Profile", icon: WriteDiaryIcon },
      ];

  const drawer = (
    <div className={styles.container}>
      <Toolbar className={styles.logoBar}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.companyName}>Diario</h1>
      </Toolbar>

      <List>
        {navBarContentWithIcons.map((navItem, index) => (
          <Link
            to={`/${navItem.name}`}
            style={{ textDecoration: "none" }}
            onClick={handleDrawerToggle2}
          >
            <ListItem key={navItem.name} disablePadding>
              <ListItemButton>
                <img
                  src={navItem.icon}
                  alt={navItem.name}
                  className={styles.navIcon}
                />
                <p className={styles.navText}> {navItem.name} </p>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          marginLeft: "1rem",
        }}
      >
        {/* <ButtonGlobal
          style={{
            width: "90%",
            height: "3rem",
            marginBottom: "1rem",
          }}
          label="Diario Pro"
          handleClick={() => console.log("clicked")}
        /> */}

        <ButtonGlobal
          style={{
            width: "90%",
            height: "3rem",
            left: "1rem",
          }}
          label="Log out"
          handleClick={logout}
        />
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box id="navbar" sx={{ display: "flex", zIndex: 20000 }}>
      <CssBaseline />
      <div className={styles.backOrMenuBtn}>
        <CardGlobal
          style={{
            borderWidth: "1.5px",
            width: "45px",
            height: "45px",
          }}
          handleClick={handleDrawerToggle2}
        >
          {!backBtn ? (
            <img className={styles.icons} src={Menu} alt="menu" />
          ) : (
            <img className={styles.icons} src={Back} alt="back" />
          )}
        </CardGlobal>
      </div>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          background: "black",
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen2}
          onClose={handleDrawerToggle2}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          id="hello"
          sx={{
            zIndex: 100000,
            position: "absolute",
            "& .MuiPaper-root": {},
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth + width * 0.1,
              background:
                "linear-gradient(141.24deg, rgba(100, 96, 155, 0.6) 2.08%, rgba(78, 69, 123, 0.6) 95.98%)",
              boxShadow: "10px 0px 10px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(20px)",
            },

            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
