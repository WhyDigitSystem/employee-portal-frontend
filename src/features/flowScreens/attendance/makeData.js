export const data = [
  {
    SNo: "1",
    date: "04/01/2024",
    intime: "12.30 PM",
    outtime: "2.30 PM",
    tothrs: "2 Hrs",
  },
  {
    SNo: "1",
    date: "04/01/2024",
    intime: "12.30 PM",
    outtime: "2.30 PM",
    tothrs: "2 Hrs",
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
