import React from "react";
import utils from "../../../../utils";
import { DateType, TCanlenderItem } from "../Calender";
import "./Calender.MonthCard.scss";

const indexToMonthDict = {
  "1": "Jan",
  "2": "Feb",
  "3": "Mar",
  "4": "Apr",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "Aug",
  "9": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
}

type TPermittedIndex = keyof typeof indexToMonthDict;
const permittedIndexArray = Object.keys(indexToMonthDict);

const indexToMonth = (index: number | string | undefined) => {
  if (index === undefined) {
    return ""
  }
  const index_ = String(index);


  if (!permittedIndexArray.includes(index_)) {
    return "";
  }

  return indexToMonthDict[index_ as TPermittedIndex];
}


export default ({ month, dayItems }: {
  month: string,
  dayItems: TCanlenderItem[]
}) => {
  const totalNumOfDays = dayItems.length;
  const firstDayValue = Number(dayItems[0].date?.getDay());
  const lastDayValue = Number(dayItems[totalNumOfDays - 1].date?.getDay());
  const leftPadding: TCanlenderItem[] = Array(firstDayValue).fill({ type: DateType.DAY, value: "" });
  const rightPadding: TCanlenderItem[] = Array(7 - lastDayValue).fill({ type: DateType.DAY, value: "" });
  const literalDays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
  const concatedDayItems = leftPadding.concat(dayItems).concat(rightPadding);
  return (
    <div className="month-card">
      <div className="month-row">
        {indexToMonth(month)}
      </div>
      <div className="days-container">
        <div className="days-row">
          {literalDays.map(literalDay => {
            return (
              <div className="day">{literalDay}</div>
            )
          })}
        </div>
        {utils.divide(concatedDayItems, 7) //divide days by group of 10
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
  )
}