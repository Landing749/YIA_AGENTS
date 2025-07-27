document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const agentNumber = document.getElementById('agentNumber').value.trim();
  const passcode = document.getElementById('passcode').value.trim();

  try {
    const res = await fetch('assets/data/agents.json');
    const agents = await res.json();

    const match = agents.find(agent =>
      agent.agentNumber === agentNumber && agent.passcode === passcode
    );

    if (match) {
      localStorage.setItem('agentName', match.name);
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('error').textContent = 'Invalid credentials.';
    }
  } catch (err) {
    document.getElementById('error').textContent = 'Error loading agent data.';
  }
});
