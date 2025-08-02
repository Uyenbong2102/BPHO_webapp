let settings = {
  darkMode: true,
  fontSize: "normal",
  autoRefresh: false,
  refreshInterval: 30
};

let visitData = [
  { time: "2025-08-01 10:00", views: 12 },
  { time: "2025-08-02 14:32", views: 20 },
  { time: "2025-08-03 09:15", views: 17 }
];

function navigate(section) {
  const main = document.getElementById("main-content");
  main.innerHTML = "";

  if (section === "intro") {
    main.innerHTML = `<h2>Welcome</h2><p>This is the introduction to BPHO 2025.</p>`;
  }

  if (section === "challenges") {
    const taskSection = document.createElement("div");
    taskSection.innerHTML = `
      <h2>Computational Challenges</h2>
      <label>Select a task: </label>
      <select id="task-select">
        <option>-- Choose a Task --</option>
        ${Array.from({ length: 10 }, (_, i) => `<option value="Task ${i + 1}">Task ${i + 1}</option>`).join("")}
      </select>
      <p id="task-detail"></p>
    `;
    main.appendChild(taskSection);

    document.getElementById("task-select").addEventListener("change", function () {
      const selected = this.value;
      document.getElementById("task-detail").innerHTML = selected !== "-- Choose a Task --"
        ? `You are viewing detail of <strong>${selected}</strong>.`
        : "";
    });
  }

  if (section === "analytics") {
    const analytics = document.createElement("div");
    analytics.innerHTML = `
      <h2>Access Statistics</h2>
      <label>From: <input type="date" id="from-date"></label>
      <label>To: <input type="date" id="to-date"></label>
      <button onclick="renderAnalytics()">Filter</button>
      <div class="chart-container"><canvas id="visitChart"></canvas></div>
      <button onclick="exportToExcel()">Export to Excel</button>
      <table border="1" style="margin-top: 1rem; width: 100%; text-align: left;">
        <thead><tr><th>Time</th><th>Views</th></tr></thead>
        <tbody id="analytics-table-body"></tbody>
      </table>
    `;
    main.appendChild(analytics);
    renderAnalytics();
  }

  if (section === "settings") {
    const settingsHTML = `
      <h2>Settings</h2>
      <label><input type="checkbox" id="darkMode" ${settings.darkMode ? "checked" : ""}/> Dark Mode</label><br/>
      <label>Font Size:
        <select id="fontSize">
          <option value="normal" ${settings.fontSize === "normal" ? "selected" : ""}>Normal</option>
          <option value="large" ${settings.fontSize === "large" ? "selected" : ""}>Large</option>
        </select>
      </label><br/>
      <label><input type="checkbox" id="autoRefresh" ${settings.autoRefresh ? "checked" : ""}/> Auto-refresh data</label><br/>
      <label>Refresh interval (seconds):
        <input type="number" id="refreshInterval" value="${settings.refreshInterval}" min="1" />
      </label>
    `;
    main.innerHTML = settingsHTML;

    // Bind settings
    document.getElementById("darkMode").addEventListener("change", e => {
      document.body.style.backgroundColor = e.target.checked ? "#111" : "#fff";
    });
  }
}

function renderAnalytics() {
  const from = document.getElementById("from-date").value;
  const to = document.getElementById("to-date").value;
  const filtered = visitData.filter(d => {
    const date = d.time.slice(0, 10);
    return (!from || date >= from) && (!to || date <= to);
  });

  const ctx = document.getElementById("visitChart").getContext("2d");
  if (window.visitChart) window.visitChart.destroy();

  window.visitChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: filtered.map(d => d.time),
      datasets: [{
        label: "Views",
        data: filtered.map(d => d.views),
        backgroundColor: "#00aaff"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const tbody = document.getElementById("analytics-table-body");
  tbody.innerHTML = filtered.map(d => `<tr><td>${d.time}</td><td>${d.views}</td></tr>`).join("");
}

function exportToExcel() {
  const ws = XLSX.utils.json_to_sheet(visitData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Analytics");
  XLSX.writeFile(wb, "analytics.xlsx");
}

// Load Introduction on first load
navigate("intro");
