import React from "react";

export default function Pagination({ current = 1, total = 10, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <button
        className="px-3 py-1 rounded bg-gray-200 text-gray-500 cursor-pointer"
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        &#60;
      </button>
      <button className="px-3 py-1 rounded bg-[#3C89C9] text-white">{current}</button>
      <button
        className="px-3 py-1 rounded bg-gray-200 text-gray-500 cursor-pointer"
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
      >
        &#62;
      </button>

      <span className="flex items-center gap-2 ml-4">
        <input
          type="number"
          value={current}
          min={1}
          max={total}
          className="w-10 px-2 py-1 border rounded text-center"
          readOnly
        />
        <span className="text-gray-700 text-sm">of {total}</span>
      </span>
    </div>
  );
}
