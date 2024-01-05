export const data = [
  {
    SNo: "1",
    empCode: "WDS010",
    empName: "Ram Babu",
    preDays: "24",
    upl: "0",
    cl: "1",
    totsunday: "4",
    totholiday: "1",
    effDays: "30",
  },
  {
    SNo: "1",
    empCode: "WDS012",
    empName: "Karuppaiah",
    preDays: "24",
    upl: "1",
    cl: "1",
    totsunday: "4",
    totholiday: "1",
    effDays: "29",
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
