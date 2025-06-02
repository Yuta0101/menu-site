const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

// ✅ 調整初始設定
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let snowflakes = [];

function createSnowflakes() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * -canvas.height;
  const radius = Math.random() * 4 + 1;
  const speed = Math.random() * 1 + 0.5;
  snowflakes.push({ x, y, radius, speed });
}

function updateSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((flake) => {
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  });
}

function animate() {
  updateSnowflakes();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
setInterval(createSnowflakes, 50);
animate();
