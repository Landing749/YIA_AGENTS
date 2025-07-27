// sheet.js — Fetches missions from Google Sheet for YIA Agent App

document.addEventListener("DOMContentLoaded", () => {
  const missionsContainer = document.getElementById("missions-container");
  const scriptURL = "https://script.google.com/macros/s/AKfycbyhSKae44FZ4Kaps1jUVHt1Ah28lobt7XG6bUgCORTq1FrO2w0cRupXKSydFMsuHLZJ0A/exec";

  fetch(scriptURL)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch missions");
      return response.json();
    })
    .then(data => {
      missionsContainer.innerHTML = ""; // Clear loading text

      data.forEach((mission, index) => {
        const card = document.createElement("div");
        card.className = "mission-card";
        card.innerHTML = `
          <h3>Mission ${index + 1}: ${mission.title}</h3>
          <p><strong>Assigned By:</strong> ${mission.assigned_by}</p>
          <p><strong>Deadline:</strong> ${mission.deadline}</p>
          <p><strong>Description:</strong> ${mission.description}</p>
        `;
        missionsContainer.appendChild(card);
      });
    })
    .catch(error => {
      missionsContainer.innerHTML = <p class="error">Error loading missions: ${error.message}</p>;
    });
});
