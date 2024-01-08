export const data = [
  {
    SNo: "1",
    date: "01/01/2024",
    festName: "English New Year",
    active: "True",
  },
  {
    SNo: "1",
    date: "15/01/2024",
    festName: "Pongal",
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
