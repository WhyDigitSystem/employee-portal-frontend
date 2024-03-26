import React, { useState } from "react";
import WtTooltip from "../../features/user/components/WtTooltip";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(false);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`w-full ${containerStyle}`}>
      <label className="label" style={{ width: "auto" }}>
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
        {type === "password" && (
          <WtTooltip
            content={
              "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)."
            }
          />
        )}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder || ""}
          onChange={(e) => updateInputValue(e.target.value)}
          className="input input-bordered w-full pr-10"
          maxLength={40}
        />
        {type === "password" && (
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputText;
