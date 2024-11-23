import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import colors from "assets/theme/base/colors";

import { Link } from 'react-router-dom';

// Images
import home1 from "assets/images/home1.jpg";
import home2 from "assets/images/home2.jpg";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  return (
    <VuiBox>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} md={6} xl={3}>
            <VuiTypography color="white" fontWeight="bold" style={{ fontSize: '50px', textAlign: 'center' }}>
              Welcome to Money Mint.
            </VuiTypography>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <VuiTypography color="white" style={{ fontSize: '20px', textAlign: 'center' }}>
              Your one stop personal financial tracker.
            </VuiTypography>
          </Grid>
          <Grid item xs={12} md={8}>
            <VuiTypography color="white" style={{ fontSize: '20px', textAlign: 'center' }} mx={5} my={3}>
              Financial literacy is essential in the modern world as it empowers individuals to make informed
              decisions about managing their money, saving, and investing. Understanding financial concepts like 
              budgeting, interest rates, and credit can help people avoid debt and achieve financial stability. 
              In an era where financial products are increasingly complex, financial literacy enables individuals 
              to navigate these options and plan for the future. Having a financial tracker is crucial as it 
              provides a clear overview of income, expenses, and savings, helping individuals stay on top of 
              their finances. This tool aids in setting and achieving financial goals, ensuring better financial 
              health and security.
            </VuiTypography>
          </Grid>
          <Grid container item spacing={3} justifyContent="center">
            <Grid item xs={12} md={5} mt={4}>
              <img src={home1} alt="Feature 1" style={{ width: "105%", borderRadius: '8px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Personalized Financial Dashboard:</strong> A centralized dashboard where users can input and track their financial goals, income, expenses, and savings preferences.
              </VuiTypography>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Spending Analysis:</strong> Tools to analyze users' spending patterns and identify areas where they can potentially save money.
              </VuiTypography>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Budgeting Tools:</strong> Features to help users create and stick to a budget, with alerts for overspending or upcoming bills.
              </VuiTypography>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Financial Education:</strong> AIML chatbot to answer users' financial questions, explain financial concepts, and offer tips for improving financial literacy.
              </VuiTypography>
            </Grid>
          </Grid>
          <Grid container item spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Goal Tracking:</strong> Progress tracking for financial goals, with milestones and reminders to help users stay on track.
              </VuiTypography>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Customizable Alerts:</strong> Options for users to set up customizable alerts for important financial events.
              </VuiTypography>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Financial Calculators:</strong> Tools for calculating loan payments, savings projections, retirement needs, and other financial metrics.
              </VuiTypography>
              <VuiTypography color="white" style={{ fontSize: '18px' }} mx={5} my={3}>
                <strong>Document Management:</strong> Secure storage for important financial documents.
              </VuiTypography>
            </Grid>
            <Grid item xs={12} md={6} mt={2} order={{ xs: 1, md: 2 }}>
              <img src={home2} alt="Feature 2" style={{ width: "90%", borderRadius: '8px' }} />
            </Grid>
          </Grid>
          <Grid item>
            <Link to="/authentication/sign-up">
              <VuiTypography color="white" style={{ fontSize: '20px', textAlign: 'center' }} mx={5} my={3}>
                Sign up today and get started on your journey of financial mastery!
              </VuiTypography>
            </Link>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </VuiBox>
  );
}

export default Dashboard;
