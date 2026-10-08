(() => {
  const { $ } = window.ASyncDemo;

  $("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light",
    );
    $("darkModeBtn").textContent = document.body.classList.contains("dark-mode")
      ? "☀"
      : "☾";
  });
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    $("darkModeBtn").textContent = "☀";
  }
  $("menuBtn").addEventListener("click", () => {
    const open = $("navLinks").classList.toggle("open");
    $("menuBtn").setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav-links a").forEach((link) =>
    link.addEventListener("click", () => {
      $("navLinks").classList.remove("open");
      $("menuBtn").setAttribute("aria-expanded", "false");
    }),
  );
})();
