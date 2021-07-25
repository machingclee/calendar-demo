// copy from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
export const getDaysArray = function (start: Date, end: Date) {
  for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
