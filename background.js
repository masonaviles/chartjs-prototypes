const bgDiv = document.getElementById('background');

// Target mouse position
let targetX = 50;
let targetY = 50;

// Current (animated) spotlight position
let currentX = 50;
let currentY = 50;

// How fast it eases (smaller = slower following)
const easing = 0.02;

// Listen for mouse movement
document.addEventListener('mousemove', (e) => {
  const rect = bgDiv.getBoundingClientRect();
  const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
  const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
  
  targetX = mouseX;
  targetY = mouseY;
});

function animateBackground() {
  // Move slowly toward target
  currentX += (targetX - currentX) * easing;
  currentY += (targetY - currentY) * easing;

  bgDiv.style.background = `
    radial-gradient(
      circle at ${currentX}% ${currentY}%,
      hsl(210, 30%, 20%) 0%,
      hsl(210, 30%, 10%) 70%,
      hsl(210, 30%, 5%) 100%
    )
  `;

  requestAnimationFrame(animateBackground);
}

// Start the animation
animateBackground();
