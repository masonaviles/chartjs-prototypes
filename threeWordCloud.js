// word cloud scene setup
const wordCloudContainer = document.getElementById("wordCloudContainer");
const cloudScene = new THREE.Scene();

const cloudCamera = new THREE.PerspectiveCamera(
  50,
  wordCloudContainer.clientWidth / wordCloudContainer.clientHeight,
  0.1,
  1000
);
cloudCamera.position.z = 10;

const cloudRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
cloudRenderer.setSize(
  wordCloudContainer.clientWidth,
  wordCloudContainer.clientHeight
);
cloudRenderer.setPixelRatio(window.devicePixelRatio);
wordCloudContainer.appendChild(cloudRenderer.domElement);

// Lighting (optional for future material upgrades)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
cloudScene.add(ambientLight);

// Text material (fake "glow" by color intensity)
const textMaterial = new THREE.MeshBasicMaterial({
  color: 0x99ccff, // Brighter blue
  transparent: true,
  opacity: 1,
});

// Word list
const words = [
  "State Park",
  "Hiking Area",
  "Historical Landmark",
  "Public Beach",
  "Campground",
  "Fishing Area",
  "Picnic Ground",
  "Vista Point",
  "National Forest",
];

const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    words.forEach((word) => {
      const geometry = new THREE.TextGeometry(word, {
        font: font,
        size: 1.2,
        height: 0.2,
        curveSegments: 10,
      });

      const textMesh = new THREE.Mesh(geometry, textMaterial.clone());

      textMesh.position.x = (Math.random() - 0.5) * 5; // Smaller spread
      textMesh.position.y = (Math.random() - 0.5) * 3;
      textMesh.position.z = (Math.random() - 0.5) * 3;

      textMesh.rotation.y = Math.random() * Math.PI * 2;
      textMesh.rotation.x = Math.random() * Math.PI * 2;

      animateText(textMesh);

      cloudScene.add(textMesh);
    });

    animate();
  }
);

function animateText(mesh) {
  gsap.to(mesh.position, {
    x: `+=${(Math.random() - 0.5) * 1}`,
    y: `+=${(Math.random() - 0.5) * 1}`,
    z: `+=${(Math.random() - 0.5) * 1}`,
    duration: 5 + Math.random() * 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// Mouse tracking
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  cloudCamera.position.x += (mouse.x * 3 - cloudCamera.position.x) * 0.05;
  cloudCamera.position.y += (mouse.y * 3 - cloudCamera.position.y) * 0.05;
  cloudCamera.lookAt(cloudScene.position);

  cloudRenderer.render(cloudScene, cloudCamera);
}

// Handle resize
window.addEventListener("resize", () => {
  cloudCamera.aspect =
    wordCloudContainer.clientWidth / wordCloudContainer.clientHeight;
  cloudCamera.updateProjectionMatrix();
  cloudRenderer.setSize(
    wordCloudContainer.clientWidth,
    wordCloudContainer.clientHeight
  );
});
