/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      direction="row"
      component="footer"
      py={2}
      pb={0}
    >
      <VuiBox item xs={12} sx={{ textAlign: "center !important" }} mx={"484px"}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: "center !important", fontWeight: "400 !important" }}
          color="white"
        >
          Made with ❤️&nbsp; by{" "}
          <VuiTypography
            component="a"
            variant="button"
            href="/src/layouts/dashboard"
            sx={{ textAlign: "center !important", fontWeight: "500 !important" }}
            color="white"
            mr="2px"
          >
            Money Mint&nbsp; @&nbsp;2024
          </VuiTypography>
          {/* & */}
          <VuiTypography
            ml="2px"
            mr="2px"
            component="a"
            variant="button"
            href="https://www.creative-tim.com/"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="white"
          >
           
          </VuiTypography>
        
        </VuiTypography>
      </VuiBox>
      
        </VuiBox>
    
  );
}

export default Footer;
