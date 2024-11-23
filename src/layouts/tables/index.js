
import React, { useEffect, useState } from "react";
import { db,auth } from "firebase";
import {collection, onSnapshot } from "firebase/firestore";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Invoices from "layouts/billing/components/Invoices";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useAuthState } from 'react-firebase-hooks/auth';

function Tables() {
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const dbRef = collection(db, `users/${user.uid}/transactions`);

      const unsubscribe = onSnapshot(dbRef, (docsSnap) => {
        const transactionsArray = [];
        docsSnap.forEach((doc) => {
          transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
        console.log(transactionsArray);
        console.log("Transactions Fetched!");
      });

      // Cleanup on unmount
      return () => unsubscribe();
    }
  }, []);

  const { columns, rows } = authorsTableData;

  const { columns: trCols, rows: trRows } = projectsTableData(transactions); // Generate the rows dynamically

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Bills
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </VuiBox>
          </Card>
        </VuiBox>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              Transactions
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            <Table columns={trCols} rows={trRows} />
          </VuiBox>
        </Card>
        <VuiBox mt={3}>
          <Invoices />
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;

