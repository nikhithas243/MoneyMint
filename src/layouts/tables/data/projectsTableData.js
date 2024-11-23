
import React from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const generateRows = (transactions) => {
  return transactions.map((transaction) => ({
    category: (
      <VuiBox display="flex" alignItems="center">
        <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium" mx="-15px">
          {transaction.type}
        </VuiTypography>
      </VuiBox>
    ),
    cost: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        ₹{transaction.amount}
      </VuiTypography>
    ),
  }));
};

export default (transactions) => ({
  columns: [
    { name: "category", align: "left" },
    { name: "cost", align: "left" },
  ],
  rows: generateRows(transactions),
});
