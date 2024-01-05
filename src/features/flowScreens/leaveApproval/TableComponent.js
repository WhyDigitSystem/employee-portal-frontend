// TableComponent.jsx
import React from "react";
import { useTable } from "react-table";

const TableComponent = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{
        borderCollapse: "collapse",
        width: "100%",
        marginBottom: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <thead style={{ backgroundColor: "#f2f2f2" }}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              style={{
                backgroundColor: row.index % 2 === 0 ? "#fff" : "#f9f9f9",
              }}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
