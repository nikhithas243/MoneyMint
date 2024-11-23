import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase"; // Import firebase auth instance and Google provider
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "firebase";
import { updateProfile } from "firebase/auth";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = userCredential.user.uid;
      const db = getDatabase();
      await updateProfile(user, {
        displayName: name,
      });

      const usersRef = ref(db, "users/" + userId);
      await set(usersRef, {
        username: name,
        email: email,
      });
      createDoc(user);

      console.log(userId);
      console.log(name);
      console.log("User signed up successfully!");
      history.push("/dashboard");
    } catch (error) {
      // Handle errors
      if (error.code === "auth/email-already-in-use") {
        setError("User already exists with this email.");
      } else {
        setError(error.message);
      }
      console.error("Error signing up:", error.message);
    }
  };

  async function createDoc(user, name) {
    //make sure a entry with uid isnt present
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(doc(db, "users", user.uid));

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await setDoc(userRef, {
          name: displayName || name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
      } catch (error) {
        console.log("Error creating user document: ", error);
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await createDoc(user);
      console.log(user);
      // User signed in with Google successfully
      console.log("User signed in with Google successfully!");
      history.push("/authentication/sign-in");
    } catch (error) {
      // Handle errors
      setError(error.message);
      console.error("Error signing in with Google:", error.message);
    }
  };

  const navigateToSignIn = () => {
    history.push("/authentication/sign-in");
  };

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      image={bgSignIn}
      imageStyle={{ opacity: "0.8", maxWidth: "75%", height: "75%", marginLeft: "10rem" }}
      cardContent
      top={13}
      overflow="visible"
    >
      <GradientBorder
        borderRadius={borders.borderRadius.form}
        minWidth="28vw"
        maxWidth="100%"
        marginTop="-25px"
        marginLeft="-10px"
        overflow="visible"
      >
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          mr="-25px"
          ml="10px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Register with
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <GradientBorder borderRadius="xl" display="flex" gap="between">
              <IconButton
                color="white"
                transition="all .25s ease"
                justify="center"
                align="center"
                bg="rgb(19,21,54)"
                borderradius="15px"
                onClick={handleGoogleSignIn}
                sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                  borderRadius: borderRadius.xl,
                  paddingRight: "80px",
                  paddingLeft: "80px",
                  backgroundColor: secondary.focus,
                  "&:hover": {
                    backgroundColor: rgba(secondary.focus, 0.9),
                  },
                })}
              >
                <Icon
                  as={FaGoogle}
                  w="30px"
                  h="30px"
                  sx={({ palette: { white } }) => ({
                    color: white.focus,
                  })}
                />
                <VuiTypography
                  mb="20px"
                  style={{
                    color: "white",
                    fontSize: "25px",
                    marginLeft: "15px",
                    marginTop: "15px",
                  }}
                >
                  Google
                </VuiTypography>
              </IconButton>
            </GradientBorder>
          </Stack>
          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            or
          </VuiTypography>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Name
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="text"
                placeholder="Your full name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="email"
                placeholder="Your email..."
                value={email}
                onChange={handleEmailChange}
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          {error && (
            <VuiTypography color="error" mb={2} ml={0.5} variant="caption" fontWeight="medium">
              {error}
            </VuiTypography>
          )}
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="password"
                placeholder="Your password..."
                value={password}
                onChange={handlePasswordChange}
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth onClick={handleSignUp}>
              SIGN UP
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiButton
              color="white"
              variant="text"
              onClick={navigateToSignIn}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              Already have an account? Sign in
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignIn;
