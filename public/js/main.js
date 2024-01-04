// public/js/main.js

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/expenses');
  const expenses = await response.json();

  const labels = expenses.map(expense => expense.category);
  const data = expenses.map(expense => expense.amount);

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Expenses',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
  });
});
