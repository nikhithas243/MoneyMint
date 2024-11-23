// @mui/material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import Button from "layouts/billing/components/Button";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={24.2}> 
        <VuiBox mb={1.5}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} xl={4}>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                mt={4}
              >
                <Button />
              </VuiBox>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
