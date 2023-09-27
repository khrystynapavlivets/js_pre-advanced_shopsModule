// Початковий баланс користувача
const balance = 1000;

// Об'єкт для зберігання доступних товарів та їх цін
const products = {
  beer: 100,
  wine: 50,
  pepsi: 80,
};

// Об'єкт для зберігання цін на товари
const price = {
  beer: 50,
  pepsi: 40,
  wine: 70,
};

// Об'єкт для зберігання вибраних товарів та їх кількості
const selectedData = {};

// Масив для зберігання об'єктів вибраних товарів
const selectedDataList = [];

// Окремий масив для обчислення загальної суми товарів
const totalDataList = [];

// Функція, яка створює і повертає функцію для обчислення загальної суми на основі цін
function createTotalCalculator(getPrice) {
  return function getTotal(totalDataList) {
    let totalAmount = 0;
    for (const selectedDataItem of totalDataList) {
      const { product, quantity } = selectedDataItem;
      const productPrice = price[product];
      const itemTotal = quantity * productPrice;
      totalAmount += itemTotal;
    }
    return totalAmount;
  };
}

const getPrice = () => price;
const getProduct = () => products;
const getBalance = () => balance;

// Експортуємо дані і функції, доступні для використання ззовні
export {
  getBalance,
  getProduct,
  getPrice,
  selectedDataList,
  totalDataList,
  createTotalCalculator,
};
