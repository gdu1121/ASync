const $ = (id) => document.getElementById(id);
const interests = [
  "Music",
  "Gaming",
  "Art",
  "Technology",
  "Fitness",
  "Food",
  "Movies",
  "Travel",
  "Books",
  "Coffee",
];
const people = [
  {
    name: "Alex",
    age: 24,
    emoji: "🎧",
    goal: "friends",
    bio: "Always sharing playlists and looking for someone to check out live shows with.",
    interests: ["Music", "Gaming", "Movies", "Coffee"],
    starter: "What song have you had on repeat lately?",
  },
  {
    name: "Jordan",
    age: 26,
    emoji: "🎨",
    goal: "activities",
    bio: "Illustrator, weekend museum explorer, and occasional coffee enthusiast.",
    interests: ["Art", "Coffee", "Travel", "Books"],
    starter: "What creative project have you enjoyed recently?",
  },
  {
    name: "Sam",
    age: 23,
    emoji: "🎮",
    goal: "friends",
    bio: "Co-op games, new tech, and trying every noodle spot in town.",
    interests: ["Gaming", "Technology", "Food", "Movies"],
    starter: "What co-op game should everyone try?",
  },
  {
    name: "Taylor",
    age: 25,
    emoji: "🌿",
    goal: "dating",
    bio: "Into quiet bookstores, hikes, and meaningful conversations over coffee.",
    interests: ["Books", "Fitness", "Coffee", "Travel"],
    starter: "What does your ideal weekend look like?",
  },
  {
    name: "Casey",
    age: 27,
    emoji: "📷",
    goal: "activities",
    bio: "Always down for a photo walk, a new restaurant, or an art exhibit.",
    interests: ["Art", "Food", "Travel", "Music"],
    starter: "What place have you been wanting to explore?",
  },
  {
    name: "Riley",
    age: 24,
    emoji: "💻",
    goal: "dating",
    bio: "Software tinkerer who loves concerts, movies, and discovering new cafés.",
    interests: ["Technology", "Music", "Movies", "Coffee"],
    starter: "What are you building or learning right now?",
  },
];
let selected = new Set();
let discoveryMode = "friends";
const communities = [
  {
    emoji: "🎮",
    name: "Co-op Corner",
    topic: "Gaming",
    members: "Game nights · co-op squads",
    prompt: "What game deserves a second playthrough?",
  },
  {
    emoji: "🎧",
    name: "On Repeat",
    topic: "Music",
    members: "Playlists · concerts",
    prompt: "What album do you keep coming back to?",
  },
  {
    emoji: "☕",
    name: "Coffee & Conversations",
    topic: "Coffee",
    members: "Low-pressure hangouts · conversation",
    prompt: "What makes a great first conversation?",
  },
  {
    emoji: "💻",
    name: "Build Together",
    topic: "Technology",
    members: "Coding · creative projects",
    prompt: "What are you learning or making right now?",
  },
];
function renderCommunities() {
  const grid = $("communityGrid");
  grid.innerHTML = "";
  communities.forEach((c) => {
    const card = document.createElement("article");
    card.className = "community-card";
    const symbol = document.createElement("div");
    symbol.className = "community-symbol";
    symbol.textContent = c.emoji;
    const title = document.createElement("h3");
    title.textContent = c.name;
    const desc = document.createElement("p");
    desc.textContent = c.members;
    const tag = document.createElement("span");
    tag.className = "community-topic";
    tag.textContent = c.topic;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card-action";
    button.textContent = "Preview community ↗";
    button.addEventListener("click", () => {
      $("communityFeedback").textContent =
        `${c.name} · Conversation idea: ${c.prompt} (Preview only — no live community yet.)`;
    });
    card.append(symbol, tag, title, desc, button);
    grid.appendChild(card);
  });
}
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
$("friendsMode")?.addEventListener("click", () => setDiscoveryMode("friends"));
$("datingMode")?.addEventListener("click", () => setDiscoveryMode("dating"));
if ($("communityGrid")) renderCommunities();
function renderFilters() {
  $("interestFilters").innerHTML = "";
  interests.forEach((interest) => {
    const b = document.createElement("button");
    b.className = "chip" + (selected.has(interest) ? " selected" : "");
    b.type = "button";
    b.textContent = interest;
    b.setAttribute("aria-pressed", selected.has(interest));
    b.addEventListener("click", () => {
      selected.has(interest)
        ? selected.delete(interest)
        : selected.add(interest);
      renderFilters();
      renderProfiles();
    });
    $("interestFilters").appendChild(b);
  });
  $("interestCount").textContent = `${selected.size} selected`;
}
function renderProfiles() {
  const goal = $("connectionGoal").value;
  let matches = people
    .filter((p) => goal === "all" || p.goal === goal)
    .map((p) => ({ ...p, shared: p.interests.filter((i) => selected.has(i)) }));
  matches.sort(
    (a, b) => b.shared.length - a.shared.length || a.name.localeCompare(b.name),
  );
  $("resultCount").textContent = `${matches.length} example profiles`;
  $("profileGrid").innerHTML = "";
  matches.forEach((p) => {
    const score = selected.size
      ? Math.round((p.shared.length / selected.size) * 100)
      : null;
    const card = document.createElement("article");
    card.className = "profile-card";
    card.innerHTML = `<div class="profile-head"><div class="profile-avatar">${p.emoji}</div><div><h4>${p.name}, ${p.age}</h4><small>${{ friends: "Looking for friends", dating: "Open to dating", activities: "Activity partners" }[p.goal]}</small></div></div><div class="match-score">${score === null ? "Explore their interests" : `${p.shared.length} shared interest${p.shared.length === 1 ? "" : "s"} · ${score}% of your selections`}</div><div class="progress"><span style="width:${score === null ? 0 : score}%"></span></div><p>${p.bio}</p><div class="tags">${p.interests.map((i) => `<span>${i}</span>`).join("")}</div><button class="card-action" type="button">See conversation starter ↗</button>${p.goal !== "dating" ? '<button class="add-friend-btn" type="button">＋ Add friend</button>' : ""}`;
    card.querySelector("button").addEventListener("click", () => {
      $("matchExplanation").innerHTML =
        `<strong>Break the ice with ${p.name}:</strong> ${p.starter}`;
      $("matchExplanation").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
    if (p.goal !== "dating") {
      const add = card.querySelector(".add-friend-btn");
      add.textContent = chatState.friends.includes(p.name)
        ? "✓ Added — Open chat"
        : "＋ Add friend";
      add.addEventListener("click", () => {
        addFriend(p.name);
        add.textContent = "✓ Added — Open chat";
      });
    }
    $("profileGrid").appendChild(card);
  });
  $("matchExplanation").textContent = selected.size
    ? "Scores show the percentage of your selected interests shared by each fictional profile. This is a simple demo, not a predictive compatibility score."
    : "Choose a few interests to see how shared-interest recommendations change.";
}
$("connectionGoal")?.addEventListener("change", renderProfiles);
$("resetFilters")?.addEventListener("click", () => {
  selected.clear();
  setDiscoveryMode("friends");
  renderFilters();
  renderProfiles();
});
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
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    $("navLinks").classList.remove("open");
    $("menuBtn").setAttribute("aria-expanded", "false");
  }),
);
$("togglePassword")?.addEventListener("click", () => {
  const p = $("password");
  p.type = p.type === "password" ? "text" : "password";
  $("togglePassword").textContent = p.type === "password" ? "Show" : "Hide";
});
$("password")?.addEventListener("input", () => {
  const p = $("password").value;
  const s = $("strengthText");
  if (!p) {
    s.textContent = "";
    return;
  }
  const strong =
    p.length >= 12 &&
    /[A-Z]/.test(p) &&
    /[0-9]/.test(p) &&
    /[^A-Za-z0-9]/.test(p);
  s.textContent = strong
    ? "Strong password"
    : p.length >= 8
      ? "Moderate password"
      : "Weak password";
  s.style.color = strong ? "#268354" : p.length >= 8 ? "#bc7b18" : "#c83754";
});
$("signupForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("name").value.trim(),
    email = $("email").value.trim(),
    pass = $("password").value;
  const msg = $("message");
  msg.className = "error";
  $("profileSummary").hidden = true;
  if (!name || !email || !pass) {
    msg.textContent = "Please fill in all fields.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Please enter a valid email.";
    return;
  }
  if (pass.length < 8) {
    msg.textContent = "Password must be at least 8 characters.";
    return;
  }
  if (!$("intentFriends").checked && !$("intentDating").checked) {
    msg.textContent = "Choose friendship, dating, or both.";
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
  msg.className = "success";
  msg.textContent = `Welcome to ASync, ${name}! Your demo profile is ready.`;
  $("profileSummary").hidden = false;
  $("profileSummary").textContent =
    `Your profile: ${name} · ${[$("intentFriends").checked ? "Friendship" : null, $("intentDating").checked ? "Dating" : null].filter(Boolean).join(" & ")} · ${selected.size ? [...selected].join(", ") : "No interests selected yet"}. Choose interests above and create your profile again to update it.`;
  $("password").value = "";
  $("strengthText").textContent = "";
});

// Friends-only chat prototype. No server or real messaging is involved.
const CHAT_KEY = "async-chat-demo-v1";
const defaultChat = {
  friends: ["Alex", "Sam"],
  groups: [
    { id: "group-hangout", name: "The Hangout", members: ["Alex", "Sam"] },
  ],
  messages: {
    "dm:Alex": [
      { from: "Alex", text: "Hey! What have you been listening to lately?" },
    ],
    "dm:Sam": [{ from: "Sam", text: "Anyone up for co-op this weekend?" }],
    "group-hangout": [
      { from: "Alex", text: "Welcome to our little hangout 👋" },
      { from: "Sam", text: "We should plan a game night!" },
    ],
  },
};
function loadChat() {
  try {
    const value = JSON.parse(localStorage.getItem(CHAT_KEY));
    if (
      value &&
      Array.isArray(value.friends) &&
      Array.isArray(value.groups) &&
      value.messages &&
      typeof value.messages === "object"
    )
      return value;
  } catch (e) {}
  return structuredClone(defaultChat);
}
let chatState = loadChat();
let activeRoom = localStorage.getItem("async-active-room") || "dm:Alex";
function saveChat() {
  localStorage.setItem(CHAT_KEY, JSON.stringify(chatState));
}
function addFriend(name) {
  if (!chatState.friends.includes(name)) {
    chatState.friends.push(name);
    chatState.messages["dm:" + name] = [
      { from: "system", text: `You added ${name} as a friend. Say hello!` },
    ];
    saveChat();
  }
  activeRoom = "dm:" + name;
  localStorage.setItem("async-active-room", activeRoom);
  saveChat();
  window.location.href = "messages.html";
}
function renderChat() {
  const dm = $("friendList"),
    groups = $("groupList");
  dm.replaceChildren();
  groups.replaceChildren();
  chatState.friends.forEach((name) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className =
      "room-button" + (activeRoom === "dm:" + name ? " selected" : "");
    b.textContent = "● " + name;
    b.addEventListener("click", () => {
      activeRoom = "dm:" + name;
      localStorage.setItem("async-active-room", activeRoom);
      renderChat();
    });
    dm.appendChild(b);
  });
  chatState.groups.forEach((g) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "room-button" + (activeRoom === g.id ? " selected" : "");
    b.textContent = "# " + g.name;
    b.addEventListener("click", () => {
      activeRoom = g.id;
      localStorage.setItem("async-active-room", activeRoom);
      renderChat();
    });
    groups.appendChild(b);
  });
  const friend = activeRoom?.startsWith("dm:") ? activeRoom.slice(3) : null;
  const group = chatState.groups.find((g) => g.id === activeRoom);
  const exists = friend ? chatState.friends.includes(friend) : !!group;
  if (!exists) activeRoom = null;
  const label =
    friend && exists ? friend : group?.name || "Choose a conversation";
  $("chatTitle").textContent = label;
  $("chatSubtitle").textContent =
    friend && exists
      ? "Direct message · friends only"
      : group
        ? "Group room · " + group.members.join(", ")
        : "Select a friend or room";
  $("removeFriendBtn").hidden = !(friend && exists);
  $("chatInput").disabled = !exists;
  $("sendChatBtn").disabled = !exists;
  $("chatInput").placeholder = exists
    ? "Message " + label + "..."
    : "Select a conversation to start chatting...";
  const area = $("chatMessages");
  area.replaceChildren();
  if (!exists) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent =
      "Add a friend from Discover to start a conversation, or create a group room.";
    area.appendChild(empty);
    return;
  }
  (chatState.messages[activeRoom] || []).forEach((m) => {
    const item = document.createElement("div");
    item.className =
      "chat-bubble " +
      (m.from === "You" ? "mine" : m.from === "system" ? "system" : "theirs");
    if (m.from !== "system") {
      const sender = document.createElement("strong");
      sender.textContent = m.from;
      item.appendChild(sender);
    }
    const text = document.createElement("p");
    text.textContent = m.text;
    item.appendChild(text);
    area.appendChild(item);
  });
  area.scrollTop = area.scrollHeight;
}
$("chatForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = $("chatInput").value.trim();
  if (!activeRoom || !value) return;
  (chatState.messages[activeRoom] ??= []).push({ from: "You", text: value });
  $("chatInput").value = "";
  saveChat();
  renderChat();
  $("chatInput").focus();
});
$("createRoomBtn")?.addEventListener("click", () => {
  const name = prompt("Name your new group room:");
  if (!name || !name.trim()) return;
  const clean = name.trim().slice(0, 35);
  const id = "group-" + Date.now();
  chatState.groups.push({ id, name: clean, members: [...chatState.friends] });
  chatState.messages[id] = [
    {
      from: "system",
      text: "Group created! This is a local demonstration; friends cannot see these messages.",
    },
  ];
  activeRoom = id;
  saveChat();
  renderChat();
});
$("removeFriendBtn")?.addEventListener("click", () => {
  if (!activeRoom?.startsWith("dm:")) return;
  const name = activeRoom.slice(3);
  if (!confirm("Remove " + name + " from your friends list?")) return;
  chatState.friends = chatState.friends.filter((f) => f !== name);
  delete chatState.messages[activeRoom];
  activeRoom = chatState.friends.length
    ? "dm:" + chatState.friends[0]
    : chatState.groups[0]?.id || null;
  saveChat();
  renderChat();
  if ($("profileGrid")) renderProfiles();
});
if ($("friendList")) renderChat();

if ($("profileGrid")) {
  renderFilters();
  setDiscoveryMode(
    document.body.dataset.mode === "dating" ? "dating" : "friends",
  );
}
