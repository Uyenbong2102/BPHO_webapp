function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
    page.classList.remove("active");
  });
  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.remove("hidden");
    activePage.classList.add("active");
  }

  // Tab indicator
  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active-tab"));
  document.querySelectorAll(".sidebar li").forEach(li => {
    if (li.textContent.toLowerCase().includes(pageId)) li.classList.add("active-tab");
  });
}

// Tasks 1 to 10
const taskSelect = document.getElementById("taskSelect");
const taskDetail = document.getElementById("taskDetail");
for (let i = 1; i <= 10; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `Task ${i}`;
  taskSelect.appendChild(option);
}
taskSelect.addEventListener("change", () => {
  const taskNumber = taskSelect.value;
  taskDetail.textContent = taskNumber ? `You are viewing detail of Task ${taskNumber}.` : "";
});

// Data
const accessData = [
  { time: "2025-08-01 10:00", views: 12 },
  { time: "2025-08-02 14:32", views: 20 },
  { time: "2025-08-03 09:15", views: 17 },
  { time: "2025-08-04 11:45", views: 25 }
];

let chartInstance;

function renderAnalytics(data = accessData) {
  const tbody = document.getElementById("analytics-body");
  tbody.innerHTML = "";
  data.forEach(row => {
    tbody.innerHTML += `<tr><td>${row.time}</td><td>${row.views}</td></tr>`;
  });

  document.getElementById("totalVisits").textContent = data.reduce((sum, d) => sum + d.views, 0);
  document.getElementById("lastAccess").textContent = data.at(-1)?.time || "-";

  const ctx = document.getElementById("analyticsChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.time),
      datasets: [{
        label: "Views",
        data: data.map(d => d.views),
        borderColor: "#00c0ff",
        backgroundColor: "rgba(0,192,255,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

function filterData() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  let filtered = accessData;
  if (start) filtered = filtered.filter(d => d.time >= start);
  if (end) filtered = filtered.filter(d => d.time <= end + "T23:59");

  renderAnalytics(filtered);
}

document.getElementById("exportExcel").addEventListener("click", () => {
  const table = document.getElementById("analyticsTable");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Access Stats" });
  XLSX.writeFile(wb, "access_stats.xlsx");
});

const darkModeToggle = document.getElementById("darkModeToggle");
const fontSizeSelect = document.getElementById("fontSizeSelect");

darkModeToggle.addEventListener("change", () => {
  document.body.style.backgroundColor = darkModeToggle.checked ? "#121212" : "#ffffff";
  document.body.style.color = darkModeToggle.checked ? "#ffffff" : "#000000";
});

fontSizeSelect.addEventListener("change", () => {
  document.body.style.fontSize = fontSizeSelect.value === "large" ? "18px" : "16px";
});

// Init
showPage("introduction");
renderAnalytics();
