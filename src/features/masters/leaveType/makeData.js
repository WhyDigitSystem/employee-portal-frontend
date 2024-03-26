export const data = [
  {
    SNo: "1",
    leaveCode: "CL",
    leaveType: "Casual Leave",
    totLeave: "6",
    active: "True",
  },
  {
    SNo: "2",
    leaveCode: "PL",
    leaveType: "Paid Leave",
    totLeave: "6",
    active: "True",
  },

  // Add more sample data objects as needed...
];

// Function to generate sample data
export function makeData(count = 20) {
  const newData = [];
  for (let i = 1; i <= count; i++) {
    newData.push({
      id: i,
      commodityCategory: `First ${i}`,
      creator: `Last ${i}`,
      createTime: `email${i}@example.com`,
    });
  }
  return newData;
}
