/ dm.js — Local DM logic (offline, future Bluetooth support)

document.addEventListener("DOMContentLoaded", () => {
  const recipientSelect = document.getElementById("recipient");
  const dmThread = document.getElementById("dm-thread");
  const dmText = document.getElementById("dm-text");
  const sendBtn = document.getElementById("send-btn");

  let selectedAgent = null;
  let agentId = localStorage.getItem("agentNumber") || "Unknown";

  // Load agent list from agents.json
  fetch("assets/data/agents.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(agent => {
        const option = document.createElement("option");
        option.value = agent.agentNumber;
        option.textContent = Agent ${agent.agentNumber};
        recipientSelect.appendChild(option);
      });
    });

  recipientSelect.addEventListener("change", () => {
    selectedAgent = recipientSelect.value;
    loadMessages();
  });

  sendBtn.addEventListener("click", () => {
    if (!selectedAgent || !dmText.value.trim()) return;

    const messages = getDMHistory();
    messages.push({
      from: agentId,
      to: selectedAgent,
      message: dmText.value,
      time: new Date().toLocaleTimeString()
    });

    saveDMHistory(messages);
    dmText.value = "";
    loadMessages();
  });

  function getDMHistory() {
    const stored = localStorage.getItem("dm-history");
    return stored ? JSON.parse(stored) : [];
  }

  function saveDMHistory(messages) {
    localStorage.setItem("dm-history", JSON.stringify(messages));
  }

  function loadMessages() {
    const messages = getDMHistory().filter(
      msg =>
        (msg.from === agentId && msg.to === selectedAgent) ||
        (msg.from === selectedAgent && msg.to === agentId)
    );

    dmThread.innerHTML = "";
    messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      msgDiv.className = msg.from === agentId ? "dm-out" : "dm-in";
      msgDiv.innerHTML = `
        <p><strong>${msg.from === agentId ? "You" : `Agent ${msg.from}`}:</strong> ${msg.message}</p>
        <span class="timestamp">${msg.time}</span>
      `;
      dmThread.appendChild(msgDiv);
    });

    dmThread.scrollTop = dmThread.scrollHeight;
  }
});
