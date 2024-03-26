import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { IoIosInformationCircle } from "react-icons/io";

const WtTooltip = ({ content }) => {
  return (
    <>
      <div className="my-tooltip-element" data-tooltip-html={content}>
        <IoIosInformationCircle
          className="cursor-pointer"
          style={{ fontSize: "17px", marginBottom: "1px" }}
        />
      </div>
      <Tooltip
        anchorSelect=".my-tooltip-element"
        className="tooltip-element"
        delayHide={true}
        delayShow={true}
        style={{ width: "41%", wordBreak: "break-all" }}
      />
    </>
  );
};

export default WtTooltip;
