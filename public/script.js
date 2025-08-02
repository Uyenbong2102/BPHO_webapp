function showSection(id) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Handle Task selection
function displayTask() {
  const task = document.getElementById('taskSelect').value;
  document.getElementById('taskDetail').innerHTML = task && task !== "-- Choose a Task --"
    ? `<p>You are viewing detail of <strong>${task}</strong>.</p>`
    : "";
}

// Export Excel (placeholder only, no backend)
function exportToExcel() {
  alert("Exporting to Excel (placeholder)...");
  // Real export logic using SheetJS or similar can be added later.
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Change font size
function changeFontSize() {
  const size = document.getElementById("fontSizeSelect").value;
  document.body.style.fontSize = size;
}

// Toggle auto refresh
function toggleAutoRefresh() {
  const enabled = document.getElementById("autoRefreshToggle").checked;
  const intervalInput = document.getElementById("refreshInterval");
  intervalInput.disabled = !enabled;
  if (enabled) {
    console.log("Auto-refresh every " + intervalInput.value + "s (simulated)");
  }
}

// Simulated visit data
document.addEventListener("DOMContentLoaded", () => {
  const visits = [
    { time: '2025-08-01 10:00', views: 12 },
    { time: '2025-08-02 14:32', views: 20 },
    { time: '2025-08-03 09:15', views: 17 },
    { time: '2025-08-04 11:45', views: 25 }
  ];

  const tbody = document.getElementById("visitTimeline");
  let total = 0;
  visits.forEach(v => {
    total += v.views;
    const row = `<tr><td>${v.time}</td><td>${v.views}</td></tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById("totalVisits").textContent = total;
  document.getElementById("lastAccess").textContent = visits[visits.length - 1].time;
});
