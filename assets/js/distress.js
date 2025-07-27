document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendDistress");
  const status = document.getElementById("statusMsg");

  btn.addEventListener("click", () => {
    // Placeholder behavior
    status.textContent = "⚠️ Distress signal sent! Nearby agents alerted.";
    status.style.color = "red";

    // Future upgrade: Bluetooth + Google Form webhook integration
  });
});
