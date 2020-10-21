const stocks = require('../lib/stock.json');
const transactions = require('../lib/transactions.json');

const getCurrentStockLevel = (sku) => new Promise((resolve, reject) => {
  try {
    let qty = 0;
    
    // check if sku is in stock
    const skuItems =  stocks.filter(item => item.sku === sku);

    // if sku is in stock set qty to stock amount
    if(skuItems.length != 0) {
      qty = skuItems[0].stock;
    }

    // get all transactions related to sku
    const skuTransactions =  transactions.filter(transactions => transactions.sku === sku);

    // If there is no sku in stock and no transactions for the sku then it doesn't exist
    if(skuTransactions.length === 0 && skuItems.length === 0) {
      return reject("SKU entered does not exist");
    }

    // update sku qty based on order or refund. Sub from qty if 'order' add to qty if 'refund'
    skuTransactions.map(transaction => {
      qty = transaction.type == 'order' ? qty - transaction.qty : qty + transaction.qty;
    });

    resolve({sku, qty});

  } catch (error) {
    reject("Failed", error);
  }
});

module.exports = getCurrentStockLevel;
