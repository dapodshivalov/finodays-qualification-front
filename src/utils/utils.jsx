function catCompareReverse(catA, catB) {
    if (catA.amount < catB.amount) {
        return -1;
    }
    if (catA.amount > catB.amount) {
        return 1;
    }
    return 0;
}

function getRusMonth(monthYear) {
    console.log(monthYear)
    if (monthYear == "predict") {
        return "";
    }
    var numMonth = parseInt(monthYear.substring(0, monthYear.indexOf(".")));
    console.log(numMonth);
    var res = "";
    switch (numMonth) {
        case 1:
            res = "Январь"
          break;
        case 2:
            res = "Февраль"
          break;
        case 3:
            res = "Март"
          break;
        case 4:
            res = "Апрель"
          break;
        case 5:
            res = "Май"
          break;
        case 6:
            res = "Июнь"
          break;
        case 7:
            res = "Июль"
          break;
        case 8:
            res = "Август"
          break;
        case 9:
            res = "Сентябрь"
          break;
        case 10:
            res = "Октябрь"
          break;
        case 11:
            res = "Ноябрь"
          break;
        case 12:
            res = "Декабрь"
          break;
      }
      return res;
}

function getYear(monthYear) {
    if (monthYear == "predict") {
        return "";
    }
    return monthYear.substring(monthYear.indexOf(".") + 1, monthYear.length);
}

function labelForSelectOption(monthYear) {
    if (monthYear == "predict") {
        return "Прогноз";
    }
    return getRusMonth(monthYear) + " " + getYear(monthYear);
}

module.exports = {
    catCompareReverse, 
    getRusMonth, 
    getYear, 
    labelForSelectOption
};