// Giao diện điều hướng
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

// Hiển thị chi tiết Task
function showTask(id) {
  const detail = document.getElementById('taskDetail');
  detail.innerHTML = `<div class='card'>Bạn đang xem chi tiết của <strong>Task ${id}</strong>. Nội dung sẽ cập nhật sau.</div>`;
}

// Xuất bảng thành CSV
function exportToExcel() {
  const rows = document.querySelectorAll('table tr');
  let csv = '';
  rows.forEach(row => {
    const cols = row.querySelectorAll('td, th');
    const line = Array.from(cols).map(cell => cell.innerText).join(',');
    csv += line + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.csv';
  a.click();
}

// Dữ liệu giả lập cho bảng
const data = [
  { time: '2025-08-01 10:00', views: 12 },
  { time: '2025-08-02 14:32', views: 20 },
  { time: '2025-08-03 09:15', views: 17 }
];

const tbody = document.getElementById('data-table');
data.forEach(d => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${d.time}</td><td>${d.views}</td>`;
  tbody.appendChild(row);
});

// Đổi giao diện và font
function setTheme(theme) {
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(`${theme}-theme`);
}
function setFont(size) {
  document.body.classList.remove('small', 'normal', 'large');
  document.body.classList.add(size);
}

function toggleDarkMode(toggle) {
  document.body.classList.toggle('dark-theme', toggle.checked);
  document.body.classList.toggle('light-theme', !toggle.checked);
}
