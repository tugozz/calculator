// const billInput = document.getElementById("bill-input");

// const sanitizeBillInput = (input) => {
//   input = input.replace(/[^\d.]/g, "");

//   if ((input.match(/\./g) || []).length > 1) {
//     input = input.slice(0, -1);
//   }
//   return input;
// };

// billInput.addEventListener("input", (event) => {
//   billInput.value = sanitizeBillInput(event.target.value);
// });

const billInput = document.getElementById("bill-input");
const tipButtons = document.querySelectorAll(".tips button");
const totalDisplay = document.getElementById("total");
const resetButton = document.getElementById("reset-button");

const sanitizeBillInput = (input) => {
  input = input.replace(/[^\d.]/g, "");

  if ((input.match(/\./g) || []).length > 1) {
    input = input.slice(0, -1);
  }
  return input;
};

const calculateTotal = (billAmount, tipPercentage) => {
  const bill = parseFloat(billAmount) || 0;
  const tipAmount = bill * (tipPercentage / 100);
  const totalAmount = bill + tipAmount;
  return totalAmount.toFixed(2);
};

// Handle bill input
billInput.addEventListener("input", (event) => {
  billInput.value = sanitizeBillInput(event.target.value);
  // Recalculate total when bill changes
  const activeTipButton = document.querySelector(".tips button.active");
  if (activeTipButton) {
    const tipPercentage = parseInt(activeTipButton.textContent);
    totalDisplay.textContent = `Total: $${calculateTotal(
      billInput.value,
      tipPercentage
    )}`;
  }
});

// Handle tip button clicks
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    // Get tip percentage from button text (remove the % symbol)
    const tipPercentage = parseInt(button.textContent);
    const total = calculateTotal(billInput.value, tipPercentage);
    totalDisplay.textContent = `Total: $${total}`;
  });
});

// Handle reset button
resetButton.addEventListener("click", () => {
  billInput.value = "";
  totalDisplay.textContent = "Total: $0.00";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
});
