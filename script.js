// script.js
// This function makes an API request to the Binance API and returns the price of the cryptocurrency
async function getCryptoPrice(cryptoCode) {
  const apiUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${cryptoCode}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return Number(data.price).toFixed(4);
  } catch (error) {
    console.error(
      `Error getting price for cryptocurrency ${cryptoCode}: ${error}`
    );
    return null;
  }
}

const form = document.getElementById("crypto-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let cryptoCode =
    event.target.elements.cryptoCode.value.toUpperCase() + "USDT";
  if (cryptoCode == "USDT") cryptoCode = "BTCUSDT";
  const price = await getCryptoPrice(cryptoCode);
  if (price) {
    document.getElementById(
      "crypto-price"
    ).innerHTML = `The price of ${cryptoCode} is $${price}`;
  } else {
    document.getElementById(
      "crypto-price"
    ).innerHTML = `Error getting price for ${cryptoCode}`;
  }
});
