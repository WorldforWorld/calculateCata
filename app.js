console.log(calculate("1 + 2")); // вернется строка '3'
console.log(calculate("VI / III")); // вернется строка 'II'
console.log(calculate("VII / III")); // вернётся строка II'
console.log(calculate("I + II")); // вернется строка 'III'
console.log(calculate("I - II")); // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
console.log(calculate("I + 1")); // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
console.log(calculate("I")); // вернётся исключение throws Error т.к. строка не является математической операцией
console.log(calculate("1 + 1 + 1")); // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)

function calculate(params) {
  try {
    const isRomanRegex = /^[IVXLCDM]+$/;
    const arr = params.split(" ");
    let [firstOperand, operation, lastOperand] = arr;

    if (arr.length > 3) {
      throw new Error(
        "Формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)"
      );
    }
    if (arr.length === 1) {
      throw new Error("Cтрока не является математической операцией");
    }
    if (isRomanRegex.test(firstOperand) !== isRomanRegex.test(lastOperand)) {
      throw new Error("Используются одновременно разные системы счисления");
    }

    if (isRomanRegex.test(firstOperand) && isRomanRegex.test(lastOperand)) {
      firstOperand = convertNumber(firstOperand, "arabic");
      lastOperand = convertNumber(lastOperand, "arabic");
      if (lastOperand > firstOperand && operation === "-") {
        return "";
      }
      return convertNumber(
        eval(`${firstOperand} ${operation} ${lastOperand}`),
        "roman"
      );
    }
    return eval(params);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
}

function convertNumber(num, type) {
  const arabicToRomanMap = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };

  if (type === "roman") {
    let result = "";
    for (const [arabicNum, romanNum] of Object.entries(arabicToRomanMap)) {
      while (num >= arabicNum) {
        result += romanNum;
        num -= arabicNum;
      }
    }
    return result;
  } else if (type === "arabic") {
    const romanToArabicMap = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let result = 0;
    for (let i = 0; i < num.length; i++) {
      const currentNum = romanToArabicMap[num[i]];
      const nextNum = romanToArabicMap[num[i + 1]];
      if (nextNum && nextNum > currentNum) {
        result -= currentNum;
      } else {
        result += currentNum;
      }
    }
    return result;
  }
}
