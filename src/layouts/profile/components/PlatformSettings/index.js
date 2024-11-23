import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSwitch from "components/VuiSwitch";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [mails, setMails] = useState(false);

  return (
    <Card sx={{ minHeight: "350px", height: "100%" }}>
      <VuiBox mb="26px">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          Notification settings
        </VuiTypography>
      </VuiBox>
      <VuiBox lineHeight={1.25}>
        
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={answersPost}
              onChange={() => setAnswersPost(!answersPost)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Send me a reminder 2 days before a bill due date.
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              sx={{ background: "#1B1F3D", color: "#fff" }}
              color="info"
              checked={mentionsMe}
              onChange={() => setMentionsMe(!mentionsMe)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
             Send me an email when a bill is overdue.
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={newLaunches}
              onChange={() => setNewLaunches(!newLaunches)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Send me an email when I go over budget.
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={productUpdate}
              onChange={() => setProductUpdate(!productUpdate)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
             Send me a reminder on the first of every month to set my financial particulars.
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default PlatformSettings;
