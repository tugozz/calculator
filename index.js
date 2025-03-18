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

billInput.addEventListener("input", (event) => {
  billInput.value = sanitizeBillInput(event.target.value);

  const activeTipButton = document.querySelector(".tips button.active");
  if (activeTipButton) {
    const tipPercentage = parseInt(activeTipButton.textContent);
    totalDisplay.textContent = `Total: $${calculateTotal(
      billInput.value,
      tipPercentage
    )}`;
  }
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    const tipPercentage = parseInt(button.textContent);
    const total = calculateTotal(billInput.value, tipPercentage);
    totalDisplay.textContent = `Total: $${total}`;
  });
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  totalDisplay.textContent = "Total: $0.00";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
});
