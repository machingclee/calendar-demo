import React, { useState } from "react";
import "./Calender.scss";
import utils from "../../../utils";

enum DateType {
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY"
}

// we have yearItem, monthItem, dayItem
type TCanlenderItem = {
  type: DateType,
  value?: string,
  children?: TCanlenderItem[]
  toDoList?: { title: string, detail: string }[]   // this only exists when type == DAY
}

const range = (n: number) => Array(n).fill(null).map((_, index) => index);

function divide<T>(arr: T[] | undefined, by: number) {
  if (!arr) {
    return [];
  }
  const length = arr.length;
  const arr_ = arr.slice();

  const numberOfIter = Math.ceil(length / by);
  const container: T[][] = [];

  range(numberOfIter)
    .forEach(iteration => {
      const splicedElements = arr_.splice(0, by);
      container.push(splicedElements);
    })

  return container;
}

const getYearItem = (year: string): TCanlenderItem => {
  const dateArr = utils.getDaysArray(
    new Date(`${year}-01-01`),
    new Date(`${year}-12-31`)
  );

  const monthItems: TCanlenderItem[] = [];
  for (const currMonth of range(12)) {
    const daysOfCurrMonth = dateArr.filter(date => date.getMonth() === currMonth).map(date => {
      return {
        type: DateType.DAY,
        value: String(date.getDate())
      }
    });
    const monthItem: TCanlenderItem = {
      type: DateType.MONTH,
      value: String(currMonth + 1),
      children: daysOfCurrMonth
    }
    monthItems.push(monthItem);
  }

  return { type: DateType.YEAR, value: year, children: monthItems }
}

export default () => {
  const [activeMonth, setActiveMonth] = useState(1);


  const addMonth = () => setActiveMonth(m => Math.min(m + 1, 12))
  const minusMonth = () => setActiveMonth(m => Math.max(m - 1, 1))

  return (
    <div className="calender">
      Current Month: <button onClick={minusMonth}>- </button> {activeMonth} <button onClick={addMonth}> + </button>
      {getYearItem("2021").children?.map(monthItem => {
        const currMonth = monthItem.value;
        const dayItems = monthItem.children;
        return (
          <>
            {activeMonth === Number(currMonth) && (
              <div className="month">
                <div className="month-row">
                  Month: {currMonth}
                </div>
                <div className="days-container">
                  {divide(dayItems, 10) //divide days by group of 10
                    .map(dividedDayItems => { // each dividedDayItem has at most length 10
                      return (
                        <div className="days-row">
                          {dividedDayItems.map(dayItem => {
                            return <div className="day">{dayItem.value}</div>
                          })}
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}