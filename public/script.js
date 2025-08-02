// Tab switching
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.content');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const target = item.dataset.target;
    sections.forEach(sec => {
      sec.classList.remove('active');
      if (sec.id === target) sec.classList.add('active');
    });
  });
});

// Task detail
function showTask(id) {
  const detail = document.getElementById('taskDetail');
  if (!id) return (detail.innerHTML = '');
  detail.innerHTML = `<div class="card">You are viewing detail of <strong>Task ${id}</strong>.</div>`;
}

// Sample data
const data = [
  { time: '2025-08-01 10:00', views: 12 },
  { time: '2025-08-02 14:32', views: 20 },
  { time: '2025-08-03 09:15', views: 17 },
];

// Fill table
const tbody = document.getElementById('data-table');
data.forEach(d => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${d.time}</td><td>${d.views}</td>`;
  tbody.appendChild(row);
});

// Fill stats
document.getElementById('totalVisits').innerText = data.reduce((sum, d) => sum + d.views, 0);
document.getElementById('lastAccess').innerText = data[data.length - 1].time;

// Export
function exportToExcel() {
  let csv = 'Time,Views\n';
  data.forEach(d => {
    csv += `${d.time},${d.views}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'analytics.csv';
  a.click();
}

// Theme
function setTheme() {
  document.body.classList.toggle('light-theme', !document.getElementById('darkToggle').checked);
}

// Font
function setFont(size) {
  const root = document.documentElement;
  if (size === 'large') root.style.fontSize = '18px';
  else if (size === 'xlarge') root.style.fontSize = '20px';
  else root.style.fontSize = '16px';
}

// Chart
const ctx = document.getElementById('visitsChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: data.map(d => d.time),
    datasets: [{
      label: 'Visits',
      data: data.map(d => d.views),
      backgroundColor: '#00bfff'
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
