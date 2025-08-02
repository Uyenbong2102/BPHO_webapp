const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.content');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const target = item.dataset.target;
    sections.forEach(s => {
      s.classList.remove('active');
      if (s.id === target) s.classList.add('active');
    });
  });
});

function showTask(id) {
  document.getElementById('taskDetail').innerHTML =
    `<div class='card'>You are viewing details for <strong>Task ${id}</strong>.</div>`;
}

const data = [
  { time: '2025-08-01 10:00', views: 12 },
  { time: '2025-08-02 14:32', views: 20 },
  { time: '2025-08-03 09:15', views: 17 }
];

const total = data.reduce((sum, d) => sum + d.views, 0);
document.getElementById('totalViews').textContent = total;
document.getElementById('lastAccess').textContent = data[data.length - 1].time;
const peak = data.reduce((max, d) => d.views > max.views ? d : max, data[0]);
document.getElementById('peakDay').textContent = `${peak.time} (${peak.views})`;
document.getElementById('averageViews').textContent = (total / data.length).toFixed(1);

const tbody = document.getElementById('data-table');
data.forEach(d => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${d.time}</td><td>${d.views}</td>`;
  tbody.appendChild(row);
});

function exportToExcel() {
  let csv = 'Time,Views\n';
  data.forEach(d => csv += `${d.time},${d.views}\n`);
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'analytics.csv';
  a.click();
}

function setTheme(theme) {
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(theme + '-theme');
}
function setFont(size) {
  document.body.classList.remove('small', 'normal', 'large');
  document.body.classList.add(size);
}

new Chart(document.getElementById('visitChart'), {
  type: 'bar',
  data: {
    labels: data.map(d => d.time),
    datasets: [{
      label: 'Views',
      data: data.map(d => d.views),
      backgroundColor: '#4fc3f7'
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});
