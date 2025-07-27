document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("selfDestructBtn");
  const status = document.getElementById("destructStatus");

  btn.addEventListener("click", () => {
    // Erase all localStorage data
    localStorage.clear();

    status.textContent = "🧨 All local data erased. Logging out...";
    status.style.color = "red";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
});
