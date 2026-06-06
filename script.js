const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

function createFavicon(initials = 'SS') {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#111110';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#f7f5f2';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 32px serif';
  ctx.fillText(initials, size / 2, size / 2);
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');
  document.head.appendChild(link);
}
createFavicon('SS');

window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

function animateCursor() {
  currentX += (mouseX - currentX) * 0.18;
  currentY += (mouseY - currentY) * 0.18;
  cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('.work-item').forEach(item => {
  item.querySelector('.work-row').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

if (window.matchMedia('(pointer: coarse)').matches) cursor.style.display = 'none';
