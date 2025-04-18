const doughnutCanvas = document.getElementById('doughnutChart');
const polarCanvas = document.getElementById('polarAreaChart');

const doughnutCtx = doughnutCanvas.getContext('2d');
const polarCtx = polarCanvas.getContext('2d');

// Gradients
const backgroundGradient1 = doughnutCtx.createLinearGradient(0, 0, 0, 400);
backgroundGradient1.addColorStop(0, '#06b6d4');
backgroundGradient1.addColorStop(1, '#3b82f6');

const backgroundGradient2 = doughnutCtx.createLinearGradient(0, 0, 0, 400);
backgroundGradient2.addColorStop(0, '#8b5cf6');
backgroundGradient2.addColorStop(1, '#ec4899');

const backgroundGradient3 = doughnutCtx.createLinearGradient(0, 0, 0, 400);
backgroundGradient3.addColorStop(0, '#f59e0b');
backgroundGradient3.addColorStop(1, '#ef4444');

const borderGradient1 = doughnutCtx.createLinearGradient(0, 0, 400, 400);
borderGradient1.addColorStop(0, '#0ea5e9');
borderGradient1.addColorStop(1, '#3b82f6');

const borderGradient2 = doughnutCtx.createLinearGradient(0, 0, 400, 400);
borderGradient2.addColorStop(0, '#a855f7');
borderGradient2.addColorStop(1, '#ec4899');

const borderGradient3 = doughnutCtx.createLinearGradient(0, 0, 400, 400);
borderGradient3.addColorStop(0, '#f59e0b');
borderGradient3.addColorStop(1, '#ef4444');

// Shared data
const labels = ['Tickets', 'Memberships', 'Subscriptions'];
const dataValues = [23677, 5641, 14821];
const backgroundGradients = [backgroundGradient1, backgroundGradient2, backgroundGradient3];
const borderGradients = [borderGradient1, borderGradient2, borderGradient3];

// Doughnut Chart
new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
    labels: labels,
    datasets: [{
        data: dataValues,
        backgroundColor: backgroundGradients,
        borderColor: borderGradients,
        borderWidth: 2,
        hoverOffset: 20
    }]
    },
    options: {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        position: 'bottom',
        labels: {
            color: '#cbd5e1',
            font: {
            size: 14,
            weight: '500'
            },
            usePointStyle: true,
            pointStyle: 'rectRounded',
            padding: 20
        }
        },
        tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#38bdf8',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1
        }
    }
    }
});

// Polar Area Chart
new Chart(polarCtx, {
    type: 'polarArea',
    data: {
    labels: labels,
    datasets: [{
        data: [23677, 5641, 14821],
        backgroundColor: backgroundGradients,
        borderColor: borderGradients,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBackgroundColor: [
        'rgba(6, 182, 212, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)'
        ]
    }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: 'easeOutQuart'
    },
    interaction: {
        mode: 'nearest',
        intersect: true
    },
    animations: {
        radius: {
        duration: 600,
        easing: 'easeOutElastic',
        loop: false
        }
    },
    scales: {
        r: {
        grid: {
            color: '#334155'
        },
        angleLines: {
            color: '#334155'
        },
        pointLabels: {
            display: false,
            centerPointLabels: true,
            font: {
            size: 16,
            weight: '600'
            },
            color: '#cbd5e1'
        },
        ticks: {
            display: false
        }
        }
    },
    plugins: {
        legend: {
        position: 'bottom',
        labels: {
            color: '#cbd5e1',
            font: {
            size: 14,
            weight: '500'
            },
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
        }
        },
        tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#38bdf8',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1
        }
    }
    }
});