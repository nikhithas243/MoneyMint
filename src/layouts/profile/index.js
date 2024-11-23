import React,{ useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import VuiBox from "components/VuiBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import Footer from "examples/Footer";
import PlatformSettings from "layouts/profile/components/PlatformSettings";


function Overview() {
  
  
  
  const info = {
    fullName: "mark",
    mobile: "(+91) 8792524772",
    email: "mark@gmail.com",
    location: "India",
  };
 


  const social = [
    {
      link: "https://www.facebook.com/CreativeTim/",
      icon: <FacebookIcon />,
      color: "facebook",
    },
    {
      link: "https://twitter.com/creativetim",
      icon: <TwitterIcon />,
      color: "twitter",
    },
    {
      link: "https://www.instagram.com/creativetimofficial/",
      icon: <InstagramIcon />,
      color: "instagram",
    },
  ];

  return (
    <DashboardLayout>
      <Header />
      <VuiBox mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          mt={"-70px"}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            {/* Other components can be added here */}
          </Grid>
          <Grid
            item
            xs={12}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
            <ProfileInfoCard
              title="profile information"
              social={social}
            />
          </Grid>
        </Grid>
      </VuiBox>
      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} xl={3} height="100%">
          <PlatformSettings />
        </Grid>
        <Grid item xs={12} xl={9}>
          {/* Other components can be added here */}
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
