import React, { useState, useEffect } from "react";

// Dummy data
const transactions = [
  {
    customerName: "John Doe",
    purchaseAmount: 120,
    month: "January",
  },
  {
    customerName: "Jane Doe",
    purchaseAmount: 80,
    month: "January",
  },
  {
    customerName: "John Doe",
    purchaseAmount: 150,
    month: "February",
  },
  {
    customerName: "Jane Doe",
    purchaseAmount: 60,
    month: "February",
  },
  {
    customerName: "John Doe",
    purchaseAmount: 200,
    month: "March",
  },
  {
    customerName: "Jane Doe",
    purchaseAmount: 40,
    month: "March",
  },
  {
    customerName: "Mike Smith",
    purchaseAmount: 250,
    month: "January",
  },
  {
    customerName: "Mike Smith",
    purchaseAmount: 300,
    month: "February",
  },
  {
    customerName: "Mike Smith",
    purchaseAmount: 350,
    month: "March",
  },
];

// Calculate the reward points earned for each customer per month and total
const calculateRewardPoints = (transactions) => {
  const customerRewardPoints = {
    
  };
  for (const transaction of transactions) {
    const customerName = transaction.customerName;
    const purchaseAmount = transaction.purchaseAmount;
    const month = transaction.month;

    if (!customerRewardPoints[customerName]) {
      customerRewardPoints[customerName] = {};
    }

    if (!customerRewardPoints[customerName][month]) {
      customerRewardPoints[customerName][month] = 0;
    }

    // Calculate the reward points for the current transaction
    let rewardPoints = 0;
    if (purchaseAmount > 100) {
      rewardPoints += 2 * (purchaseAmount - 100);
    }
    if (purchaseAmount >= 50) {
      rewardPoints += purchaseAmount - 50;
    }

    // Update the customer's reward points for the current month and total
    customerRewardPoints[customerName][month] += rewardPoints;
    customerRewardPoints.total += rewardPoints;
  }

  return customerRewardPoints;
};

// Render the reward points table
const RewardPointsTable = ({ customerRewardPoints }) => {
  const rows = Object.keys(customerRewardPoints).map((customerName) => {
    const customerRewardPointsForMonth = customerRewardPoints[customerName];
    const totalRewardPoints = customerRewardPointsForMonth.total;

    // Calculate the total reward points for the current customer
    const customerTotalRewardPoints = Object.values(customerRewardPointsForMonth).filter((month) => month !== "total").reduce((a, b) => a + b, 0);

    return (
      <tr>
        <td>{customerName}</td>
        {Object.keys(customerRewardPointsForMonth).filter((month) => month !== "total").map((month) => (
          <td>{customerRewardPointsForMonth[month]}</td>
        ))}
        <td>{customerTotalRewardPoints}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>January</th>
          <th>February</th>
          <th>March</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

// App component
const App = () => {
  const [customerRewardPoints, setCustomerRewardPoints] = useState({
    total: 0,
  });

  useEffect(() => {
    const customerRewardPoints = calculateRewardPoints(transactions);
    setCustomerRewardPoints(customerRewardPoints);
  }, []);

  return (
    <div>
      <h1>Reward Points Calculator</h1>
      <RewardPointsTable customerRewardPoints={customerRewardPoints} />
    </div>
  );
};

export default App;