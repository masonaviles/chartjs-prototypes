const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("background").appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

// Star group
const starsGroup = new THREE.Group();
scene.add(starsGroup);

// Glow colors
const starColors = [
  "#3b82f6", // Blue
  //   "#8b5cf6", // Purple
  //   "#ec4899", // Pink
  //   "#06b6d4", // Cyan
  //   "#f59e0b", // Amber
  //   "#ef4444", // Red
];

// Create soft glow texture dynamically
const glowTexture = createGlowTexture();

// Total "stars"
const totalSpheres = 250;
const spheres = [];

for (let i = 0; i < totalSpheres; i++) {
  const material = new THREE.SpriteMaterial({
    map: glowTexture,
    color: starColors[Math.floor(Math.random() * starColors.length)],
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);

  sprite.userData = {
    basePosition: new THREE.Vector3(
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 300
    ),
    floatAmplitude: Math.random() * 3 + 1,
    floatSpeed: Math.random() * 1 + 0.5,
  };

  sprite.position.copy(sprite.userData.basePosition);

  const scale = Math.random() * 2 + 1;
  sprite.scale.set(scale, scale, 1); // x, y, z scale
  spheres.push(sprite);
  starsGroup.add(sprite);
}

// Mouse control
const targetRotation = { x: 0, y: 0 };
document.addEventListener("mousemove", (event) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  const mouseSensitivity = 0.09;

  targetRotation.y = mouseX * mouseSensitivity;
  targetRotation.x = mouseY * mouseSensitivity;
});

// Clock for floating
const clock = new THREE.Clock();

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Smooth group rotation toward mouse
  starsGroup.rotation.y += (targetRotation.y - starsGroup.rotation.y) * 0.05;
  starsGroup.rotation.x += (targetRotation.x - starsGroup.rotation.x) * 0.05;

  // Update individual floating
  spheres.forEach((sprite) => {
    sprite.position.x =
      sprite.userData.basePosition.x +
      Math.sin(elapsed * sprite.userData.floatSpeed + sprite.id) *
        sprite.userData.floatAmplitude;
    sprite.position.y =
      sprite.userData.basePosition.y +
      Math.cos(elapsed * sprite.userData.floatSpeed + sprite.id) *
        sprite.userData.floatAmplitude;
  });

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Function to create soft glow texture
function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.6)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
