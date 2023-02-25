function calculate(params) {
  const isRomanRegex = /^[IVXLCDM]+$/;
  let arr = params.split(" ");
  let result;
  if (isRomanRegex.test(arr[0]) && isRomanRegex.test(arr[2])) {
    const firstOperand = romanToArabic(arr[0]);
    const lastOperand = romanToArabic(arr[2]);
    // eval(`${firstOperand} + ${lastOperand}`)
    result = eval(`${firstOperand} ${arr[1]} ${lastOperand}`);
    // console.log(
    //   "eval(`${firstOperand} + ${lastOperand}`): ",
    //   eval(`${firstOperand} + ${lastOperand}`)
    // );
  }
  console.log(isRomanRegex.test(arr[0]));
  console.log(isRomanRegex.test(arr[2]));
  // let rezult = eval(params);
  console.log("arr: ", arr);
  return result;
}
//console.log(calculate("1 + 2")); // вернется строка '3'
console.log(calculate("VI / III")); // вернется строка 'II'
//console.log(calculate("VII / III")); // вернётся строка II'
//console.log(calculate("I + II")); // вернется строка 'III'
//console.log(calculate("I - II")); // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
//console.log(calculate("I + 1")); // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
//console.log(calculate("I")); // вернётся исключение throws Error т.к. строка не является математической операцией
//console.log(calculate("1 + 1 + 1")); // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)

function romanToArabic(romanNum) {
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
  for (let i = 0; i < romanNum.length; i++) {
    const currentNum = romanToArabicMap[romanNum[i]];
    const nextNum = romanToArabicMap[romanNum[i + 1]];
    if (nextNum && nextNum > currentNum) {
      result -= currentNum;
    } else {
      result += currentNum;
    }
  }
  return result;
}
