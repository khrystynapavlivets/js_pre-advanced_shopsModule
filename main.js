/*Завдання 1.

Напишіть функцію яка приймає одне число. При першому виклику, вона його запам'ятовує, при другому - сумує з попереднім і так далі. Для виконання цього завдання використайте замикання.
Наприклад:
sum(3) = 3
sum(5) = 8
sum(228) = 236
------------------------------------------------------------------------------------------*/

// function number(){
//     let total = 0;
//     return function (num) {
//         total += num;
//         console.log('Count = ', total);
//     };
// }

// let sum = number();
// sum(3);
// sum(5);
// sum(228);

/*
Завдання 2.

Напишіть модуть який буде обробляти покупку товарів. В модулі має бути тільки логіка, весь зв’язок з html, тобто кліки, зміна даних в html робити там не потрібно. Все має працювати як на відео shopsModule.
 Можете добавити додатковий функціонал від себе. В середині модуля використовуємо тільки логіку(змінні, функції і т.д.), ніякого зв’язку з DOM не має бути.
------------------------------------------------------------------------------------------*/

import {
    getBalance,
    getProduct,
    getPrice,
    selectedDataList,
    totalDataList,
    createTotalCalculator,
  } from "./shop.js";
  
  // Отримуємо посилання на HTML-елементи
  const summary = document.getElementById("summary");
  const quantity = document.getElementById("quantity");
  const orderForm = document.getElementById("orderForm");
  const cartForm = document.getElementById("cartForm");
  const checkoutTextarea = document.getElementById("checkout");
  const articleRadios = document.querySelectorAll('input[name="article"]');
  const shadow = document.getElementById("shadow");
  const message = document.getElementById("message");
  const close = document.getElementById("close");
  const balances = document.forms.balances;
  
  // Функція для оновлення балансів та виведення їх на сторінку
  const updateBalances = () => {
    const getTotal = createTotalCalculator(getPrice);
    const totalAmount = getTotal(totalDataList);
  
    balances.qMoney.value = `UAH ${getBalance() + totalAmount}`;
    balances.qBeer.value = `${getProduct().beer} pcs.`;
    balances.qWine.value = `${getProduct().wine} pcs.`;
    balances.qPepsi.value = `${getProduct().pepsi} pcs.`;
  };
  
  // Обробник події для кнопки "Додати"
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Забороняємо стандартну поведінку форми
    // Отримуємо вибраний продукт та кількість з форми
  
    const selectedOption = [...articleRadios].find((radio) => radio.checked);
    const selectedProduct = selectedOption ? selectedOption.value : "";
    const selectedQuantity = parseInt(quantity.value, 10);
  
    // Перевіряємо, чи користувач вибрав продукт та ввів кількість
    if (selectedOption && quantity.value > 0 && !isNaN(quantity.value)) {
      if (selectedQuantity <= getProduct()[selectedProduct]) {
        // Створюємо текст для додавання до <textarea>
        const textToAdd = `${
          selectedOption.value.charAt(0).toUpperCase() +
          selectedOption.value.slice(1)
        }: ${quantity.value} pcs`;
  
        // Зменшуємо кількість продукту на складі
        getProduct()[selectedProduct] -= selectedQuantity;
  
        // Створюємо об'єкт з вибраними даними
        const selectedData = {
          product: selectedProduct,
          quantity: selectedQuantity,
        };
  
        // Додаємо об'єкт selectedData до масиву selectedDataList
        selectedDataList.push(selectedData);
  
        // Оновлюємо вміст <textarea>
        checkoutTextarea.value += textToAdd + "\n";
        quantity.value = "";
        summary.textContent = "";
      } else if (quantity.value > getProduct()[order.article.value]) {
        shadow.style.display = "block";
        message.textContent = `Sorry, we only have ${
          getProduct()[selectedProduct]
        } pcs of goods ${selectedProduct}.`;
        quantity.value = "";
      }
    } else {
      shadow.style.display = "block";
      message.textContent = `Sorry, you have not selected a product.`;
      quantity.value = "";
    }
  });
  
  // Обробник події для кнопки "Закрити"
  close.addEventListener("click", () => {
    document.getElementById("shadow").style.display = "none";
  });
  
  // Обробник події для кнопки "Купити"
  cartForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Забороняємо стандартну поведінку форми
    if (selectedDataList.length > 0) {
      let totalAmount = 0;
      for (const selectedDataItem of selectedDataList) {
        const { product, quantity } = selectedDataItem;
        const productPrice = getPrice()[product];
        const itemTotal = quantity * productPrice;
        totalAmount += itemTotal;
  
        const textToAddSum = `${
          product.charAt(0).toUpperCase() + product.slice(1)
        }: ${quantity} pcs. <br>`;
        summary.innerHTML += textToAddSum + "\n";
      }
  
      summary.innerHTML += `The total amount is UAH ${totalAmount}.<br>`;
  
      // Очищуємо textarea
      checkoutTextarea.value = "";
  
      // Додаємо дані до totalDataList
      totalDataList.push(...selectedDataList);
  
      // Очищуємо selectedDataList
      selectedDataList.length = 0;
  
      // Оновлюємо баланси
      updateBalances();
    }
  });
  