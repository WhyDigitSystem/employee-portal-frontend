
import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { MdOutlineFirstPage } from "react-icons/md";

const TableComponent = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <table
        {...getTableProps()}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          margin: "20px 0",
          // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Table Header */}
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
        {/* Table Body */}
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div>
          <button
            className="pagination-btn"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              onClick={() => previousPage()}
            />
          </button>
          <button
            className="pagination-btn"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              onClick={() => previousPage()}
            />
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {page.length}
            </strong>{" "}
          </span>
          <button
            className="pagination-btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="pagination-btn"
            onClick={() => gotoPage(page.length - 1)}
            disabled={!canNextPage}
          >
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              onClick={() => nextPage()}
            />
          </button>
        </div>
        <div>
          <span style={{ marginRight: "10px" }}>
            Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "50px", padding: "5px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            style={{ padding: "6px" }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
