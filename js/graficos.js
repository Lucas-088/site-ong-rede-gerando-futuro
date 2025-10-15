document.addEventListener('DOMContentLoaded', () => {

    const ctxPizza = document.getElementById('graficoPizza');
    if (ctxPizza) {
        new Chart(ctxPizza, {
            type: 'pie',
            data: {
                labels: ['Educação', 'Alimentação', 'Meio Ambiente', 'Administrativo'],
                datasets: [{
                    label: 'Distribuição de R$',
                    data: [12500, 9800, 6200, 4500],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Valores investidos por área' }
                }
            }
        });
    }
    
    const ctxLinha = document.getElementById('graficoLinha');
    if (ctxLinha) {
        new Chart(ctxLinha, {
            type: 'line',
            data: {
                labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'],
                datasets: [{
                    label: 'Novos Voluntários Cadastrados',
                    data: [12, 19, 25, 32, 28, 38],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
                plugins: {
                    title: { display: true, text: 'Crescimento de voluntários por mês' }
                }
            }
        });
    }

    const ctxBarras = document.getElementById('graficoBarras');
    if (ctxBarras) {
        new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: ['Sudeste', 'Nordeste', 'Sul', 'Norte', 'Centro-Oeste'],
                datasets: [{
                    label: 'Pessoas Impactadas',
                    data: [1250, 890, 680, 420, 510],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Total de beneficiados por região' }
                }
            }
        });
    }

});