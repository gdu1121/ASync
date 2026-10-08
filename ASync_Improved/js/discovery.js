(() => {
  const { $, interests, people, selected } = window.ASyncDemo;
  const app = window.ASyncDemo;
  let discoveryMode = "friends";

  function setDiscoveryMode(mode) {
    discoveryMode = mode;
    $("friendsMode").classList.toggle("active", mode === "friends");
    $("datingMode").classList.toggle("active", mode === "dating");
    $("friendsMode").setAttribute("aria-pressed", String(mode === "friends"));
    $("datingMode").setAttribute("aria-pressed", String(mode === "dating"));
    $("modeIntro").textContent =
      mode === "friends"
        ? "Friendship space · Meet people to hang out with, learn alongside, or simply talk to."
        : "Dating space · Explore romantic connections with people who are also open to dating.";
    $("resultsHeading").textContent =
      mode === "friends" ? "People you might befriend" : "People open to dating";
    const goal = $("connectionGoal");
    goal.innerHTML = "";
    const choices =
      mode === "friends"
        ? [
            ["all", "Friends & activity partners"],
            ["friends", "Friendship"],
            ["activities", "Activity partners"],
          ]
        : [["dating", "Open to dating"]];
    choices.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      goal.appendChild(option);
    });
    renderProfiles();
  }

  function renderFilters() {
    $("interestFilters").innerHTML = "";
    interests.forEach((interest) => {
      const button = document.createElement("button");
      button.className = "chip" + (selected.has(interest) ? " selected" : "");
      button.type = "button";
      button.textContent = interest;
      button.setAttribute("aria-pressed", selected.has(interest));
      button.addEventListener("click", () => {
        selected.has(interest)
          ? selected.delete(interest)
          : selected.add(interest);
        renderFilters();
        renderProfiles();
      });
      $("interestFilters").appendChild(button);
    });
    $("interestCount").textContent = `${selected.size} selected`;
  }

  function renderProfiles() {
    const goal = $("connectionGoal").value;
    const matches = people
      .filter((person) => goal === "all" || person.goal === goal)
      .map((person) => ({
        ...person,
        shared: person.interests.filter((interest) => selected.has(interest)),
      }));
    matches.sort(
      (a, b) => b.shared.length - a.shared.length || a.name.localeCompare(b.name),
    );
    $("resultCount").textContent = `${matches.length} example profiles`;
    $("profileGrid").innerHTML = "";
    matches.forEach((person) => {
      const score = selected.size
        ? Math.round((person.shared.length / selected.size) * 100)
        : null;
      const card = document.createElement("article");
      card.className = "profile-card";
      card.innerHTML = `<div class="profile-head"><div class="profile-avatar">${person.emoji}</div><div><h4>${person.name}, ${person.age}</h4><small>${{ friends: "Looking for friends", dating: "Open to dating", activities: "Activity partners" }[person.goal]}</small></div></div><div class="match-score">${score === null ? "Explore their interests" : `${person.shared.length} shared interest${person.shared.length === 1 ? "" : "s"} · ${score}% of your selections`}</div><div class="progress"><span style="width:${score === null ? 0 : score}%"></span></div><p>${person.bio}</p><div class="tags">${person.interests.map((interest) => `<span>${interest}</span>`).join("")}</div><button class="card-action" type="button">See conversation starter ↗</button>${person.goal !== "dating" ? '<button class="add-friend-btn" type="button">＋ Add friend</button>' : ""}`;
      card.querySelector("button").addEventListener("click", () => {
        $("matchExplanation").innerHTML =
          `<strong>Break the ice with ${person.name}:</strong> ${person.starter}`;
        $("matchExplanation").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
      if (person.goal !== "dating") {
        const addButton = card.querySelector(".add-friend-btn");
        addButton.textContent = app.chatState.friends.includes(person.name)
          ? "✓ Added — Open chat"
          : "＋ Add friend";
        addButton.addEventListener("click", () => {
          app.addFriend(person.name);
          addButton.textContent = "✓ Added — Open chat";
        });
      }
      $("profileGrid").appendChild(card);
    });
    $("matchExplanation").textContent = selected.size
      ? "Scores show the percentage of your selected interests shared by each fictional profile. This is a simple demo, not a predictive compatibility score."
      : "Choose a few interests to see how shared-interest recommendations change.";
  }

  app.renderProfiles = renderProfiles;
  $("friendsMode")?.addEventListener("click", () =>
    setDiscoveryMode("friends"),
  );
  $("datingMode")?.addEventListener("click", () =>
    setDiscoveryMode("dating"),
  );
  $("connectionGoal")?.addEventListener("change", renderProfiles);
  $("resetFilters")?.addEventListener("click", () => {
    selected.clear();
    setDiscoveryMode("friends");
    renderFilters();
    renderProfiles();
  });

  if ($("profileGrid")) {
    renderFilters();
    setDiscoveryMode(
      document.body.dataset.mode === "dating" ? "dating" : "friends",
    );
  }
})();
