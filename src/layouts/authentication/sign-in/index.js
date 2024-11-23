import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase"; // Import firebase auth instance and Google provider
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


// @mui/material components
import Icon from "@mui/material/Icon";

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
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (user) {
      setError("You are already signed in.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      console.log("User signed in successfully!");
      history.push("/dashboard"); // Redirect to the dashboard or appropriate route
    } catch (error) {
      // Handle errors
      setError("Invalid email or password.");
      console.error("Error signing in:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    if (user) {
      setError("You are already signed in.");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      // User signed in with Google successfully
      console.log("User signed in with Google successfully!");
      history.push("/dashboard"); // Redirect to the dashboard or appropriate route
    } catch (error) {
      // Handle errors
      setError(error.message);
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out successfully!");
      history.push("/authentication/sign-in"); // Redirect to the sign-in page
    } catch (error) {
      // Handle errors
      setError("Error signing out.");
      console.error("Error signing out:", error.message);
    }
  };

  const navigateToSignUp = () => {
    history.push("/authentication/sign-up");
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      image={bgSignIn}
      top={10}
      padding-top="45px"
    >
      <VuiBox component="form" role="form" onSubmit={handleSignIn}>
        {user && (
          <VuiBox mt={4} mb={1}>
            <VuiTypography color="white" fontWeight="bold" textAlign="center">
              You are already signed in as {user.email}.
            </VuiTypography>
            <VuiButton color="info" fullWidth onClick={handleSignOut}>
              SIGN OUT
            </VuiButton>
          </VuiBox>
        )}
        {!user && (
          <>
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Email
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
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
            {error && (
              <VuiTypography color="error" mb={2} ml={0.5} variant="caption" fontWeight="medium">
                {error}
              </VuiTypography>
            )}
            <VuiBox mt={4} mb={1}>
              <VuiButton type="submit" color="info" fullWidth>
                SIGN IN
              </VuiButton>
            </VuiBox>
            <VuiBox mt={3} textAlign="center">
              <VuiButton
                color="white"
                variant="text"
                onClick={navigateToSignUp}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                Don&apos;t have an account? Sign up
              </VuiButton>
            </VuiBox>
            <VuiBox mt={4} mb={1}>
              <VuiButton color="info" fullWidth onClick={handleGoogleSignIn}>
                <Icon as={FaGoogle} w="20px" h="20px" sx={{ mr: 1 }} />
                Sign in with Google
              </VuiButton>
            </VuiBox>
          </>
        )}
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;