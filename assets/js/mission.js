document.addEventListener("DOMContentLoaded", async () => {
  const missionList = document.getElementById("missionList");
  const sheetURL = "https://script.google.com/macros/s/AKfycbyhSKae44FZ4Kaps1jUVHt1Ah28lobt7XG6bUgCORTq1FrO2w0cRupXKSydFMsuHLZJ0A/exec";

  try {
    const res = await fetch(sheetURL);
    const missions = await res.json();

    if (missions.length === 0) {
      missionList.innerHTML = "<p>No missions found.</p>";
    } else {
      missions.forEach(mission => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${mission.title}</h3>
          <p><strong>Assigned by:</strong> ${mission.assignedBy}</p>
          <p><strong>Deadline:</strong> ${mission.deadline}</p>
          <p>${mission.description}</p>
        `;
        missionList.appendChild(card);
      });
    }
  } catch (err) {
    missionList.innerHTML = "<p>Error loading missions.</p>";
    console.error(err);
  }
});
