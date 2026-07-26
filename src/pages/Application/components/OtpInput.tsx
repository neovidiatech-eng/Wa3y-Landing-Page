import React, { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function OtpInput({ length = 6, value, onChange, disabled }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      const newDigits = [...digits];
      newDigits[index] = "";
      onChange(newDigits.join(""));
      return;
    }

    const lastChar = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = lastChar;
    const nextVal = newDigits.join("");
    onChange(nextVal);

    if (lastChar && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, length);
    if (pastedData) {
      onChange(pastedData);
      const targetIndex = Math.min(pastedData.length, length - 1);
      inputsRef.current[targetIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3" dir="ltr">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[index]}
          disabled={disabled}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-11 h-13 md:w-13 md:h-15 text-center text-xl md:text-2xl font-bold font-mono border-2 border-amber-300 focus:border-amber-500 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all shadow-xs disabled:opacity-50"
        />
      ))}
    </div>
  );
}
