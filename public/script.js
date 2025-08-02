const tabs = {
  intro: "<h1>Welcome to BPHO 2025</h1><p>This is the introduction.</p>",
  challenges: generateChallengeContent(),
  analytics: generateAnalyticsContent(),
  settings: generateSettingsContent()
};

function changeTab(tabName) {
  const content = document.getElementById("content");
  content.innerHTML = tabs[tabName] || "<p>Content not found.</p>";
  if (tabName === 'analytics') drawChart();
  if (tabName === 'challenges') setupChallenges();
}

function generateChallengeContent() {
  let options = '<option value="">-- Choose a Task --</option>';
  for (let i = 1; i <= 10; i++) {
    options += `<option value="task${i}">Task ${i}</option>`;
  }
  return `
    <section>
      <h2>Computational Challenges</h2>
      <label for="taskSelect">Select a task:</label>
      <select id="taskSelect" onchange="viewTaskDetail(this.value)">${options}</select>
      <p id="taskDetail"></p>
    </section>
  `;
}

function viewTaskDetail(taskId) {
  document.getElementById("taskDetail").innerText = taskId ? \`You selected \${taskId}.\` : "";
}

function generateAnalyticsContent() {
  return \`
    <section>
      <h2>Access Statistics</h2>
      <div class="summary-boxes">
        <div>Total: <span id="totalVisits">0</span></div>
        <div>Last: <span id="lastAccess">-</span></div>
        <div>Peak: <span id="peakTime">-</span></div>
        <div>Average: <span id="averageViews">0</span></div>
      </div>
      <div>
        <label>Filter by date range (not functional in demo)</label>
        <input type="date"> to <input type="date">
      </div>
      <div class="chart-container">
        <canvas id="visitChart"></canvas>
      </div>
      <table>
        <thead><tr><th>Time</th><th>Views</th></tr></thead>
        <tbody id="visitTable"></tbody>
      </table>
      <button class="btn" onclick="exportToExcel()">Export to Excel</button>
    </section>
  \`;
}

function generateSettingsContent() {
  return \`
    <section>
      <h2>Settings</h2>
      <label><input type="checkbox" id="darkMode" onchange="toggleDarkMode()"> Dark Mode</label>
      <label for="fontSize">Font Size:
        <select id="fontSize" onchange="changeFontSize(this.value)">
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </label>
      <label><input type="checkbox" id="autoRefresh" onchange="toggleAutoRefresh()"> Auto-refresh data</label>
      <label for="interval">Refresh interval (seconds):
        <input type="number" id="interval" value="30" min="5" />
      </label>
    </section>
  \`;
}

function drawChart() {
  const ctx = document.getElementById('visitChart').getContext('2d');
  const data = {
    labels: ['2025-08-01 10:00', '2025-08-02 14:32', '2025-08-03 09:15'],
    datasets: [{
      label: 'Views',
      data: [12, 20, 17],
      backgroundColor: '#00bfff'
    }]
  };
  new Chart(ctx, {
    type: 'bar',
    data,
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });

  // Populate summary
  document.getElementById("totalVisits").innerText = 49;
  document.getElementById("lastAccess").innerText = "2025-08-03 09:15";
  document.getElementById("peakTime").innerText = "2025-08-02 14:32 (20)";
  document.getElementById("averageViews").innerText = "16.3";

  const tbody = document.getElementById("visitTable");
  tbody.innerHTML = data.labels.map((label, i) => \`<tr><td>\${label}</td><td>\${data.datasets[0].data[i]}</td></tr>\`).join("");
}

function exportToExcel() {
  alert("Exporting to Excel... (Demo only)");
}

function toggleDarkMode() {
  document.body.style.backgroundColor = document.getElementById('darkMode').checked ? '#121212' : '#ffffff';
}

function changeFontSize(size) {
  document.body.style.fontSize = size === 'large' ? '18px' : '14px';
}

function toggleAutoRefresh() {
  const isEnabled = document.getElementById('autoRefresh').checked;
  alert("Auto-refresh " + (isEnabled ? "enabled" : "disabled") + " (Demo)");
}

function setupChallenges() {
  document.getElementById('taskDetail').innerText = '';
}

changeTab('intro');
