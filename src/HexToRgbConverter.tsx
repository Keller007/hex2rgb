import React, { useState } from "react";
import { hexToRgb } from "./hoc/hexToRgb";

const HexToRgbConverter: React.FC = () => {
  const [hexColor, setHexColor] = useState<string>("");
  const [rgbColor, setRgbColor] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleHexInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setHexColor(input);

    if (input.length >= 7) {
      const trimmedInput = input.trim();
      if (trimmedInput[0] !== "#") {
        setHasError(true);
        return;
      }

      const hexValue = trimmedInput.substring(1);
      const isValidHex = /^[0-9A-Fa-f]{6}$/.test(hexValue);

      if (isValidHex) {
        setHasError(false);
        setRgbColor(hexToRgb(hexValue));
      } else {
        setHasError(true);
        setRgbColor(null);
      }
    }
  };

  return (
    <div
      className="centered"
      style={{ backgroundColor: hasError ? "red" : rgbColor ?? "transparent" }}
    >
      <input type="text" value={hexColor} onChange={handleHexInputChange} />

      <div className="rgb-container">
        <span>{hasError ? "Ошибка!" : rgbColor}</span>
      </div>
    </div>
  );
};

export default HexToRgbConverter;
