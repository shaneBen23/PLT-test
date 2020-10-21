const readline = require("readline");
const getCurrentStockLevel = require('./src/checkstock');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const callPromt = () => {
  rl.question("Enter an SKU: ", async (sku) => {

    await getCurrentStockLevel(sku)
    .then(resp => {
      console.log("Check successful");
      console.log(resp);
    })
    .catch(err => {
      console.log("Check failed");
      console.log(err);
    });

    rl.question("Do you want to check another SKU? \ny = yes, any other key for exit: ", (answer) => {
      if(answer == 'y' || answer == 'Y') {
        callPromt();
      } else {
        rl.close();
      }
    });

  });
  
  rl.on("close", function() {
    console.log("\nClosing prompt");
    process.exit(0);
  });
}

callPromt();
