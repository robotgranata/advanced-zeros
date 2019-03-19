module.exports = function getcountZerosCount(number, base) {

  // ЧАСТЬ 1. Собираем в объект objPrimes пары значений "Простое число - степень это простого числа" для base
  let objPrimes = {};            

  for ( let i = 2; i <= base; i++) {                               // отрезаем все непростые числа 
    if (base % i) {                   
      continue;
    }

    let counter = 0;                                              // считаем каждое простое число
    while (base % i == 0) {           
      counter++;
      base /= i; 
    }

    objPrimes[i] = counter;                                        // складываем в объект 
  }

  //ЧАСТЬ 2. Считаем нули для каждой пары в objPrimes, выбираем меньшее. 
  //Формула: ((number / простое_число_в_степени_1) + (number / простое_число_в_степени_2) + ... + (number / простое_число_в_степени_maxDegree)) / кол-во_вхождений_простого_числа_в_base
  let minZeros = 0;

  for (var prime in objPrimes) {                                    // Перебираем все пары в objPrimes 

    let maxDegree = 0;                                              // считаем максимальную степень maxDegree
    for (let j = 0; Math.pow(prime, j) <= number; j++) {
      maxDegree = j;
    }

    let countZeros = 0;                                              // Считаем нули для каждого простого числа, количество округляем до нижнего целого
    for (maxDegree; maxDegree > 0; maxDegree--) {
      countZeros += Math.floor(number / Math.pow(prime, maxDegree));
    };
    countZeros = Math.floor(countZeros / objPrimes[prime]); 

    if (minZeros == 0) {                                              // Сравниваем количесво нулей текущего простого числа с кол-вом у предыдущих, сохраняем меньшее в minZeros
      minZeros = countZeros;
    } else if (minZeros > countZeros) {
      minZeros = countZeros;
    }
  }
  return minZeros;
}