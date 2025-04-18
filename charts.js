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

// Border Gradients (mostly white but with color hint)
const borderGradient1 = doughnutCtx.createLinearGradient(0, 0, 400, 400);
borderGradient1.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); // Bright white
borderGradient1.addColorStop(1, 'rgba(59, 130, 246, 0.6)'); // Light blue

const borderGradient2 = doughnutCtx.createLinearGradient(0, 0, 400, 400);
borderGradient2.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); // Bright white
borderGradient2.addColorStop(1, 'rgba(236, 72, 153, 0.6)'); // Light pink

const borderGradient3 = doughnutCtx.createLinearGradient(0, 0, 400, 400);
borderGradient3.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); // Bright white
borderGradient3.addColorStop(1, 'rgba(239, 68, 68, 0.6)'); // Light red

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
            hoverOffset: 30
        }]
    },
    options: {
        cutout: '50%',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 10
        },
        plugins: {
            legend: {
                position: 'top',
                padding: 60,
                labels: {
                    color: '#cbd5e1',
                    font: {
                        size: 14,
                        weight: '500'
                    },
                    usePointStyle: true,
                    pointStyle: 'round',
                },
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#38bdf8',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1
            }
        }
    },
    plugins: [{
        id: 'adjustLegendMargin',
        beforeInit(chart) {
          const originalFit = chart.legend.fit;
          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.height += 20;
          }
        }
    }]
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
    },
    plugins: [{
        id: 'adjustLegendMargin',
        beforeInit(chart) {
          const originalFit = chart.legend.fit;
          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.height += 20;
          }
        }
    }]
});

// Bar Chart
const barCanvas = document.getElementById('barChart');
const barCtx = barCanvas.getContext('2d');

new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: [
      'State park', 'Hiking area', 'Historical landmark', 
      'Public beach', 'Campground', 'Fishing area', 
      'Picnic ground', 'Vista point', 'National forest'
    ],
    datasets: [{
      label: 'Visitor Discussion (%)',
      data: [33, 10, 8, 7, 5, 4, 3, 2, 1],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',  // Blue
        'rgba(139, 92, 246, 0.8)',  // Purple
        'rgba(236, 72, 153, 0.8)',  // Pink
        'rgba(6, 182, 212, 0.8)',   // Cyan
        'rgba(245, 158, 11, 0.8)',  // Amber
        'rgba(239, 68, 68, 0.8)',   // Red
        'rgba(34, 197, 94, 0.8)',   // Green
        'rgba(244, 63, 94, 0.8)',   // Rose
        'rgba(147, 197, 253, 0.8)'  // Light Blue
      ],
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 1,
      borderRadius: 10,
      barThickness: 30,
      hoverBackgroundColor: 'rgba(255, 255, 255, 0.8)'
    }]
  },
  options: {
    indexAxis: 'y', // Make it horizontal
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 1
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1',
          font: {
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: '#334155'
        }
      },
      y: {
        ticks: {
          color: '#cbd5e1',
          font: {
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: '#334155'
        }
      }
    },
    plugins: {
      legend: {
        display: false
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
