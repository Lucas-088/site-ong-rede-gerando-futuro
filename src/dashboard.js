document.addEventListener('DOMContentLoaded', () => {
    
    // GRÁFICO 1: PIZZA (RECURSOS)
  
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
    
    // --- GRÁFICO 2: LINHA (VOLUNTÁRIOS)
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

  
    // GRÁFICO 3: BARRAS (IMPACTO)
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
    
   
    // MÉTRICAS DINÂMICAS "EM TEMPO REAL"
   
    const metricVolunteers = document.getElementById('metric-volunteers');
    const metricDonations = document.getElementById('metric-donations');
    const metricImpact = document.getElementById('metric-impact');

    // Função auxiliar para criar um efeito visual na atualização
    const flashUpdate = (element) => {
        if (!element) return;
        element.classList.add('update-flash');
        setTimeout(() => {
            element.classList.remove('update-flash');
        }, 700); 
    };

    // Verifica se os elementos das métricas existem na página antes de ativar o intervalo
    if (metricVolunteers && metricDonations && metricImpact) {
        // A cada 4 segundos, simula uma atualização nos dados
        setInterval(() => {
            let currentVolunteers = parseInt(metricVolunteers.textContent);
            metricVolunteers.textContent = currentVolunteers + 1;
            flashUpdate(metricVolunteers);

            let currentDonations = parseFloat(metricDonations.textContent.replace('R$ ', '').replace('.', ''));
            let newDonation = Math.floor(Math.random() * 50) + 10; 
            metricDonations.textContent = `R$ ${(currentDonations + newDonation).toLocaleString('pt-BR')}`;
            flashUpdate(metricDonations);

            let currentImpact = parseInt(metricImpact.textContent.replace(/\./g, ''));
            let newImpact = Math.floor(Math.random() * 5) + 1;
            metricImpact.textContent = (currentImpact + newImpact).toLocaleString('pt-BR');
            flashUpdate(metricImpact);
        }, 4000); 
    }

    // FUNCIONALIDADE DE EXPORTAR CSV
       const exportBtn = document.getElementById('export-csv-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Dados de exemplo para o relatório
            const reportData = [
                { titulo: "Educação para Todos", arrecadado: 7500, voluntarios: 25 },
                { titulo: "Sopa Solidária", arrecadado: 9800, voluntarios: 40 },
                { titulo: "Cuidando do Planeta", arrecadado: 5200, voluntarios: 18 },
            ];
            
            // Converte os dados para o formato CSV usando a biblioteca PapaParse
            const csv = Papa.unparse(reportData);

            // Cria um ficheiro "invisível" e simula um clique para iniciar o download
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "relatorio_projetos.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('O seu relatório está a ser descarregado!');
        });
    }

});