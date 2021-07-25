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
}

// this stuff should be in redux and a slice with 12 keys (in terms of redux toolkit)
export type TToDoList = { title: string, detail: string }[]

export default ({ year }: {
  year: number
}) => {
  const year_ = String(year);
  const [activeMonth, setActiveMonth] = useState(1);


  const addMonth = () => setActiveMonth(m => Math.min(m + 1, 12))
  const minusMonth = () => setActiveMonth(m => Math.max(m - 1, 1))


  return (
    <div className="calender">
      <button onClick={minusMonth}> - </button> {activeMonth} <button onClick={addMonth}> + </button>
      {utils.getYearItem(year_).children?.map(monthItem => {
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