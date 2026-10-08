(() => {
  const { $, selected } = window.ASyncDemo;

  $("togglePassword")?.addEventListener("click", () => {
    const password = $("password");
    password.type = password.type === "password" ? "text" : "password";
    $("togglePassword").textContent =
      password.type === "password" ? "Show" : "Hide";
  });
  $("password")?.addEventListener("input", () => {
    const password = $("password").value;
    const strength = $("strengthText");
    if (!password) {
      strength.textContent = "";
      return;
    }
    const strong =
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);
    strength.textContent = strong
      ? "Strong password"
      : password.length >= 8
        ? "Moderate password"
        : "Weak password";
    strength.style.color = strong
      ? "#268354"
      : password.length >= 8
        ? "#bc7b18"
        : "#c83754";
  });
  $("signupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("name").value.trim();
    const email = $("email").value.trim();
    const password = $("password").value;
    const message = $("message");
    message.className = "error";
    $("profileSummary").hidden = true;
    if (!name || !email || !password) {
      message.textContent = "Please fill in all fields.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.textContent = "Please enter a valid email.";
      return;
    }
    if (password.length < 8) {
      message.textContent = "Password must be at least 8 characters.";
      return;
    }
    if (!$("intentFriends").checked && !$("intentDating").checked) {
      message.textContent = "Choose friendship, dating, or both.";
      return;
    }
    localStorage.setItem(
      "async-demo-profile",
      JSON.stringify({
        name,
        email,
        interests: [...selected],
        intentions: [
          $("intentFriends").checked ? "friendship" : null,
          $("intentDating").checked ? "dating" : null,
        ].filter(Boolean),
      }),
    );
    message.className = "success";
    message.textContent = `Welcome to ASync, ${name}! Your demo profile is ready.`;
    $("profileSummary").hidden = false;
    $("profileSummary").textContent =
      `Your profile: ${name} · ${[$("intentFriends").checked ? "Friendship" : null, $("intentDating").checked ? "Dating" : null].filter(Boolean).join(" & ")} · ${selected.size ? [...selected].join(", ") : "No interests selected yet"}. Choose interests above and create your profile again to update it.`;
    $("password").value = "";
    $("strengthText").textContent = "";
  });
})();
