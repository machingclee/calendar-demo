import React, { useState } from "react";
import "./Calender.scss";
import utils from "../../../utils";
import CalenderMonthCard from "./Calender.MonthCard/Calender.MonthCard";

export enum DateType {
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY"
}

// we have yearItem, monthItem, dayItem
export type TCanlenderItem = {
  type: DateType,
  value?: string,
  date?: Date,
  children?: TCanlenderItem[]
  toDoList?: { title: string, detail: string }[]   // this only exists when type == DAY
}


export default () => {
  const [activeMonth, setActiveMonth] = useState(1);


  const addMonth = () => setActiveMonth(m => Math.min(m + 1, 12))
  const minusMonth = () => setActiveMonth(m => Math.max(m - 1, 1))


  return (
    <div className="calender">
      <button onClick={minusMonth}> - </button> {activeMonth} <button onClick={addMonth}> + </button>
      {utils.getYearItem("2021").children?.map(monthItem => {
        const currMonth = monthItem.value || "";
        const dayItems = monthItem.children || [];
        return (
          <>
            {activeMonth === Number(currMonth) && (
              <CalenderMonthCard
                month={currMonth}
                dayItems={dayItems}
              />
            )}
          </>
        )
      })}
    </div>
  )
}