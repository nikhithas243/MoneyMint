import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { db } from "firebase";
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase";

function ProfileInfoCard({ title,social }) {
 
  const [isEditing, setIsEditing] = useState(false);
  const { size } = typography;

  const [user] = useAuthState(auth);
  const [editableInfo, setEditableInfo] = useState({
    fullName: "",
    mobile: "(+91) 8792524772",
    email: "",
    location: "India",
  });
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const { fullName, mobile, email, location } = userData;
          // Convert any Firestore timestamps to strings
          // if (userData.timestamp) {
          //   userData.timestamp = userData.timestamp.toDate().toLocaleString();
          // }
          // setEditableInfo(userData);
          // // setEditableInfo(docSnap.data());
          setEditableInfo({
            fullName: user.displayName || "",
            mobile: mobile || "(+91) 8792524772", // default value
            email: email || user.email,
            location: location || "India", // default value
          });
        }
      }
    };
    fetchUserInfo();
  }, [user, db]);

  
  const handleToggleEdit = () => {
    console.log("Toggle edit mode...");
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableInfo({ ...editableInfo, [name]: value });
    console.log(`Updated ${name} to: `, value);
  };

  // const handleSave = () => {
  //   console.log("Saving info: ", editableInfo);
  //   setIsEditing(false); // Ensure editing mode is disabled after saving
  // };

  const handleSave = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, editableInfo);
    }
    setIsEditing(false); // Ensure editing mode is disabled after saving
  };


  const renderItems = Object.keys(editableInfo).map((label, key) => (
    <VuiBox key={label} display="flex" py={1} pr={2}>
      <VuiTypography variant="button" color="text" fontWeight="regular" textTransform="capitalize">
        {label}: &nbsp;
      </VuiTypography>
      {isEditing ? (
        <TextField
          variant="standard"
          name={label}
          value={editableInfo[label]}
          onChange={handleChange}
          InputProps={{ style: { color: "white" } }}
        />
      ) : (
        <VuiTypography variant="button" fontWeight="regular" color="white">
          &nbsp;{editableInfo[label]?.toLocaleString()}
        </VuiTypography>
      )}
    </VuiBox>
  ));

  const renderSocial = social.map(({ link, icon, color }) => (
    <VuiBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.xl}
      color="white"
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </VuiBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <VuiBox display="flex" mb="14px" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {title}
        </VuiTypography>
        {isEditing ? (
          <Button onClick={handleSave} variant="contained" color="primary" style={{ zIndex: 150, color:"white"}}>
            Save
          </Button>
        ) : (
          <Button onClick={handleToggleEdit} variant="contained" color="primary" style={{ zIndex: 150, color:"white" }}>
            Edit
          </Button>
        )}
      </VuiBox>
      <VuiBox>
        <VuiBox mb={2} lineHeight={1}>
          <VuiTypography variant="button" color="text" fontWeight="regular">
          {`Hi, ${user.displayName}`}
          </VuiTypography>
        </VuiBox>
        <VuiBox opacity={0.3}>
          <Divider />
        </VuiBox>
        <VuiBox>{renderItems}</VuiBox>
        <VuiBox display="flex" py={1} pr={2} color="white">
          <VuiTypography
            variant="button"
            fontWeight="regular"
            color="text"
            textTransform="capitalize"
          >
            social: &nbsp;
          </VuiTypography>
          {renderSocial}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileInfoCard;
