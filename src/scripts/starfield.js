export function spawnStars(containerId, count = 50) {
  const container = document.getElementById(containerId);

  if (!container) return;

  // Xóa sao cũ nếu có
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");

    star.classList.add("star");

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(star);
  }
}