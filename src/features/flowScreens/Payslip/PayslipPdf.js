import Axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import ToastComponent from "../../../utils/ToastComponent";
import EmailConfig from "../../../utils/SendEmail";
import html2pdf from "html2pdf.js";
import logo from "../../../assets/WDS.jpeg";
import Payslip from "./Payslip";

function PayslipPdf({ newPayslipRequest, paySlipDetails, headerDetails }) {
  const [header, setHeader] = React.useState(headerDetails);
  const [paySlip, setPaySlip] = React.useState(paySlipDetails);

  useEffect(() => {
    console.log("paySlipDetails:", paySlipDetails);
    console.log("headerDetails:", headerDetails);
  }, []);

  const handleClosePayslip = () => {
    newPayslipRequest(false);
  };

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: "20px",
      backgroundColor: "#f9f9f9",
    },
    container: {
      border: "1px solid #ccc",
      padding: "20px",
      maxWidth: "800px",
      margin: "auto",
      backgroundColor: "#fff",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "20px",
    },
    headerImg: {
      maxWidth: "80px",
    },
    headerContent: {
      flexGrow: 1,
      textAlign: "center",
    },
    title: {
      fontSize: "22px",
      margin: 0,
      //   paddingRight: "45px",
    },
    subtitle: {
      fontSize: "14px",
      //   paddingRight: "50px",
    },
    subtitle_1: {
      fontSize: "14px",
      //   paddingRight: "100px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
      fontSize: "14px",
    },
    thTd: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    th: {
      backgroundColor: "#f2f2f2",
    },
    netPay: {
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: "10px",
      display: "contents",
    },
    footer: {
      fontSize: "12px",
      color: "#777",
      textAlign: "center",
      borderTop: "groove",
    },
  };

  // Function to download the PDF
  const downloadPDF = () => {
    const element = document.getElementById("content-to-pdf");
    const options = {
      margin: 0.5,
      filename: "Why Digit Systems Pvt Ltd payslip-PDF.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl">
        <div className="d-flex justify-content-end">
          {/* <h1 className="text-xl font-semibold mb-3">Permission Request</h1> */}
          <IoMdClose
            onClick={handleClosePayslip}
            type="button"
            className="cursor-pointer w-8 h-8 mb-3"
          />
        </div>

        <div className="row d-flex mt-3">
          <div id="content-to-pdf" style={(styles.container, styles.body)}>
            <div style={styles.header}>
              <img src={logo} alt="Company Logo" style={styles.headerImg} />
              <div style={styles.headerContent}>
                <h1 style={styles.title}><strong>{header.name}</strong></h1>
                {/* <p style={styles.subtitle}>{header.address}</p> */}
                {/* <p style={styles.subtitle_1}>Bengaluru-560016</p> */}
              </div>
            </div>

            <h2
              style={{
                textAlign: "center",
                fontSize: "18px",
                margin: "20px 0",
                // paddingLeft: "50px",
              }}
            >
              <strong>Payslip for the month of {paySlip.month} {paySlip.year}</strong>
            </h2>

            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.thTd}>Name:</td>
                  <td style={styles.thTd}>{paySlip.employeeName}</td>
                  <td style={styles.thTd}>Employee No:</td>
                  <td style={styles.thTd}>{paySlip.employeeCode}</td>
                </tr>
                <tr>
                  <td style={styles.thTd}>Designation:</td>
                  <td style={styles.thTd}>{paySlip.position}</td>
                  <td style={styles.thTd}>Bank Name:</td>
                  <td style={styles.thTd}>{paySlip.bankName}</td>
                </tr>
                <tr>
                  <td style={styles.thTd}>Department:</td>
                  <td style={styles.thTd}>{paySlip.department}</td>
                  <td style={styles.thTd}>Bank Account No:</td>
                  <td style={styles.thTd}>{paySlip.bankAccountNo}</td>
                </tr>
                <tr>
                  <td style={styles.thTd}>Location:</td>
                  <td style={styles.thTd}>{paySlip.location}</td>
                  <td style={styles.thTd}>PAN Number:</td>
                  <td style={styles.thTd}>{paySlip.pan}</td>
                </tr>
                <tr>
                  <td style={styles.thTd}>Effective Work Days:</td>
                  <td style={styles.thTd}>{paySlip.effectiveWorkingDays}</td>
                  <td style={styles.thTd}>UAN No / PF No:</td>
                  <td style={styles.thTd}>{paySlip.uan}</td>
                </tr>
                <tr>
                  <td style={styles.thTd}>LOP:</td>
                  <td style={styles.thTd}>{paySlip.lop}</td>
                  {/* <td style={styles.thTd}>PF No:</td>
                  <td style={styles.thTd}></td> */}
                </tr>
              </tbody>
            </table>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.thTd}>Earnings</th>
                  {/* <th style={styles.thTd}>Master</th> */}
                  <th style={styles.thTd}>Actual</th>
                  <th style={styles.thTd}>Deductions</th>
                  <th style={styles.thTd}>Actual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsEarningsVO[0].heading}
                  </td>
                  {/* <td style={styles.thTd}>-</td> */}
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsEarningsVO[0].amount}
                  </td>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsDeductionVO[0].heading}
                  </td>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsDeductionVO[0].amount}
                  </td>
                </tr>
                <tr>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsEarningsVO[1].heading}
                  </td>
                  {/* <td style={styles.thTd}>-</td> */}
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsEarningsVO[1].amount}
                  </td>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsDeductionVO[1].heading}
                  </td>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsDeductionVO[1].amount}
                  </td>
                </tr>
                <tr>
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsEarningsVO[2].heading}
                  </td>
                  {/* <td style={styles.thTd}>-</td> */}
                  <td style={styles.thTd}>
                    {paySlip.salaryDetailsEarningsVO[2].amount}
                  </td>
                  <td style={styles.thTd}>&nbsp;</td>
                  <td style={styles.thTd}>&nbsp;</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={styles.thTd}>
                    Total Earnings: INR
                  </td>
                  <td style={styles.thTd}>{paySlip.totalEarnings}</td>
                  <td style={styles.thTd}>Total Deductions: INR</td>
                  <td style={styles.thTd}>{paySlip.totalDeduction}</td>
                </tr>
              </tfoot>
            </table>

            <p style={styles.netPay}>Net Pay for the month: {paySlip.netPay}</p>
            <p style={{ fontSize: "14px", fontStyle: "italic" }}>
              ({paySlip.amountInWords})
            </p>

            <div style={styles.footer}>
              <p>
                This is a system-generated payslip and does not require a
                signature.
                {/* For any queries, please contact the HR department at hr@Whydigit.com. */}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <button
            type="button"
            onClick={downloadPDF}
            className="bg-blue me-5 inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Download
          </button>
          <button
            type="button"
            onClick={handleClosePayslip}
            className="bg-blue inline-block rounded bg-primary h-fit px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
      {/* {notification && <ToastComponent content={message} type={errorType} />}
      {sendMail && (
        <EmailConfig
          fDate={mailFrom}
          tDate={mailTo}
          reason={mailNotes}
          message={mailMessage}
          message2={mailMessageTwo}
          date={mailDate}
        />
      )} */}
    </>
  );
}
export default PayslipPdf;
