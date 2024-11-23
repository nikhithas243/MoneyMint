import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
// to fetch user object
import { auth, db } from "firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, getDocs } from "firebase/firestore";

function MiniStatisticsCard({ bgColor, title, count, percentage, icon, direction }) {
  const [user] = useAuthState(auth); // to get user for adding transactions
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const { info } = colors;
  const [isEditing, setIsEditing] = useState(false);
  const [editableCount, setEditableCount] = useState(count);
  const [editablePercentage, setEditablePercentage] = useState(percentage.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (value, type) => { // same as onFinish function
    if (type !== "Savings") {
      const newTransaction = {
        type: type,
        amount: parseFloat(value),
      };
      setTransactions([...transactions, newTransaction]);
      await addTransaction(newTransaction);
      setIsEditing(false);
    }
  };

  async function addTransaction(transaction, many) {
    try {
      // Add the doc
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) {
        console.log("Transaction Added!");
      }
    } catch (e) {
      console.log("Error adding document: ", e);
      if (!many) {
        console.log("Couldn't add transaction");
      }
    }
  }

  function calculateBalance() {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        incomeTotal += transaction.amount;
      } else if (transaction.type === "Expense") {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      console.log("Transactions Fetched!");
    }
  }

  const handleCountChange = (e) => {
    setEditableCount(e.target.value);
  };

  const handleTickClick = () => {
    handleSave(editableCount, title.text);
  };

  const isNextBillDueDate = title.text === "Next Bill Due Date";

  return (
    <Card sx={{ padding: "17px" }}>
      <VuiBox>
        <VuiBox>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <VuiBox
                  bgColor={info}
                  color="#fff"
                  width="3rem"
                  height="3rem"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  {icon.component}
                </VuiBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <VuiBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <VuiTypography
                  variant="caption"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </VuiTypography>
                <VuiBox display="flex" alignItems="center">
                  {isEditing && !isNextBillDueDate ? (
                    <TextField
                      variant="standard"
                      value={editableCount}
                      onChange={handleCountChange}
                      InputProps={{ style: { color: "white" } }}
                      autoFocus
                    />
                  ) : (
                    <VuiTypography variant="subtitle1" fontWeight="bold" color="white">
                      {editableCount}
                    </VuiTypography>
                  )}
                  {!isNextBillDueDate && (
                    <IconButton
                      onClick={isEditing ? handleTickClick : handleEdit}
                      size="small"
                      style={{ marginLeft: 8, color: "grey" }}
                    >
                      <Icon fontSize="small">
                        {isEditing ? "check" : "edit"}
                      </Icon>
                    </IconButton>
                  )}
                </VuiBox>
                <VuiTypography variant="button" color={percentage.color} fontWeight="bold">
                  {editablePercentage}
                </VuiTypography>
              </VuiBox>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <VuiBox
                  bgColor="#0075FF"
                  color="white"
                  width="3rem"
                  height="3rem"
                  marginLeft="auto"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </VuiBox>
              </Grid>
            ) : null}
          </Grid>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

// Setting default value for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
