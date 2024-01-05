export const data = [
  {
    SNo: "1",
    date: "04/01/2024",
    fdate: "12.30 PM",
    tdate: "2.30 PM",
    totDays: "2 Hrs",
    notes: "For Emmergency Purpose",
    status: "Karupu",
  },
  {
    SNo: "2",
    date: "04/01/2024",
    fdate: "12.30 PM",
    tdate: "2.30 PM",
    totDays: "2 Hrs",
    notes: "For Emmergency Purpose",
    status: "Karupu",
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
