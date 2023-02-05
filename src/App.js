import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useContext";

import logo from "./logo.svg";
import "./App.css";
import ButtonGlobal from "./components/Button";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useCollection } from "../src/hooks/useCollection";

import { useLogin } from "../src/hooks/useLogin";
import Background from "./components/Background";

import Splash from "./pages/Splash/Splash";
import GetStarted from "./pages/GetStarted/GetStarted";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";
import Diaries from "./pages/Diaries/Diaries";
import Explore from "./pages/Explore/Explore";
import Analytics from "./pages/Analytics/Analytics";
import Notification from "./pages/Notification/Notification";
import MyTherapist from "./pages/MyTherapist/MyTherapist";
import TherapistProfile from "./pages/TherapistProfile/TherapistProfile";
import TherapistPatientList from "./pages/TherapistPatientList/TherapistPatientList";
import TherapistPatientProfile from "./pages/TherapistPatientProfile/TherapistPatientProfile";
import DiairiesTherapist from "./pages/DiariesTherapist/Diaries";
import { useDocument } from "./hooks/useDocument";

function App() {
  const { user, authIsReady } = useAuthContext();

  const [isTherapist, setIsTherapist] = useState(user?.isTherapist);

  useEffect(() => {
    setIsTherapist(user?.isTherapist);
  }, [isTherapist]);

  const [backBtn, setBackBtn] = useState(false);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Navbar isTherapist={user?.isTherapist} backBtn={backBtn} />}
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <GetStarted />
                ) : !user?.isTherapist ? (
                  <Home setBackBtn={setBackBtn} />
                ) : (
                  <TherapistPatientList
                    setIsTherapist={setIsTherapist}
                    setBackBtn={setBackBtn}
                  />
                )
              }
            />
            <Route
              path="/home"
              element={
                !user ? (
                  <GetStarted />
                ) : !user?.isTherapist ? (
                  <Home setBackBtn={setBackBtn} />
                ) : (
                  <TherapistPatientList
                    setIsTherapist={setIsTherapist}
                    setBackBtn={setBackBtn}
                  />
                )
              }
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/home" />}
            />
            <Route
              path="/profile"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  <Profile setBackBtn={setBackBtn} />
                )
              }
            />
            <Route
              path="/diaries"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  !user?.isTherapist && <Diaries setBackBtn={setBackBtn} />
                )
              }
            />
            <Route
              path="/diariestherapist"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  user?.isTherapist && (
                    <DiairiesTherapist setBackBtn={setBackBtn} />
                  )
                )
              }
            />
            <Route
              path="/explore"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  !user?.isTherapist && <Explore setBackBtn={setBackBtn} />
                )
              }
            />
            <Route
              path="/mytherapist"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  !user?.isTherapist && <MyTherapist setBackBtn={setBackBtn} />
                )
              }
            />
            <Route
              path="/therapistprofile/:id"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  !user?.isTherapist && (
                    <TherapistProfile setBackBtn={setBackBtn} />
                  )
                )
              }
            />
            <Route
              path="/notification"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  <Notification setBackBtn={setBackBtn} />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                !user ? (
                  <Login />
                ) : (
                  !user?.isTherapist && <Analytics setBackBtn={setBackBtn} />
                )
              }
            />
            <Route
              path="/therapistpatientlist"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  !user?.isTherapist && (
                    <TherapistPatientList
                      setIsTherapist={setIsTherapist}
                      setBackBtn={setBackBtn}
                    />
                  )
                )
              }
            />
            <Route
              path="/patientprofile/:id"
              element={
                !user ? (
                  <Login setIsTherapist={setIsTherapist} />
                ) : (
                  user?.isTherapist && (
                    <TherapistPatientProfile
                      setIsTherapis={setIsTherapist}
                      setBackBtn={setBackBtn}
                    />
                  )
                )
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
