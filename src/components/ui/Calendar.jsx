import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar({ selected, onSelect }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <DayPicker mode="single" selected={selected} onSelect={onSelect} />
    </div>
  );
}
