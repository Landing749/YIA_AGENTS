logic for YIA Agent Web App

document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();
  setupNavigation();
  detectNetworkStatus();
});

// Check if user is logged in
function checkLoginStatus() {
  const agentNumber = localStorage.getItem("agentNumber");
  if (!agentNumber && window.location.pathname !== "/index.html") {
    window.location.href = "index.html";
  }
}

// Log out function
function logoutAgent() {
  localStorage.removeItem("agentNumber");
  localStorage.removeItem("codename");
  window.location.href = "index.html";
}

// Show agent name (used on dashboard)
function displayAgentInfo() {
  const codename = localStorage.getItem("codename");
  const agentNumber = localStorage.getItem("agentNumber");
  const nameElement = document.getElementById("agentInfo");
  if (nameElement && codename) {
    nameElement.innerText = ${codename} (${agentNumber});
  }
}

// Navigation bar or tile-based click setup
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target) {
        window.location.href = target;
      }
    });
  });
}

// Network Status Detector (for switching to Bluetooth if offline)
function detectNetworkStatus() {
  const statusEl = document.getElementById("networkStatus");
  if (!statusEl) return;

  function updateStatus() {
    if (navigator.onLine) {
      statusEl.innerText = "🟢 Online";
      statusEl.classList.remove("offline");
      statusEl.classList.add("online");
    } else {
      statusEl.innerText = "🔴 Offline";
      statusEl.classList.remove("online");
      statusEl.classList.add("offline");
    }
  }

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
  updateStatus(); // Initial check
}
