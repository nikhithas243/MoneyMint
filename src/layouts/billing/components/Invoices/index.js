import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <VuiBox mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="h6" fontWeight="medium" color="white">
          Invoices
        </VuiTypography>
        
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            
            id="upload-file-input"
          />
          <label htmlFor="upload-file-input">
        <VuiButton variant="contained" color="info" size="small" component="span" cursor="pointer" onClick={handleFileChange}>
          UPLOAD FILE
        </VuiButton>
        </label>
       
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="March, 01, 2020" id="#MS-415646" price="₹1000" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="₹2000" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="₹3000" noGutter />
        </VuiBox>
        <VuiBox mt="20px" display="flex" justifyContent="center" ml="-1080px">
        
          </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Invoices;
