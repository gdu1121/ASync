(() => {
  const app = window.ASyncDemo;
  const { $, people } = app;
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
    } catch (error) {}
    return structuredClone(defaultChat);
  }

  const chatState = loadChat();
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
    if ($("friendList")) {
      renderChat();
      $("peopleSearch").value = "";
      $("peopleSearchResults").replaceChildren();
    } else {
      window.location.href = "messages.html";
    }
  }

  function renderPeopleSearch() {
    const query = $("peopleSearch").value.trim().toLocaleLowerCase();
    const results = $("peopleSearchResults");
    results.replaceChildren();
    if (!query) return;
    const matches = people.filter((person) =>
      person.name.toLocaleLowerCase().includes(query),
    );
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "people-search-empty";
      empty.textContent = "No demo profiles found. Try another name.";
      results.appendChild(empty);
      return;
    }
    matches.forEach((person) => {
      const row = document.createElement("div");
      row.className = "people-search-result";
      const name = document.createElement("span");
      name.textContent = person.name;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = chatState.friends.includes(person.name)
        ? "Added"
        : "＋ Add";
      button.disabled = chatState.friends.includes(person.name);
      button.addEventListener("click", () => addFriend(person.name));
      row.append(name, button);
      results.appendChild(row);
    });
  }

  function renderChat() {
    const dm = $("friendList");
    const groups = $("groupList");
    dm.replaceChildren();
    groups.replaceChildren();
    renderPeopleSearch();
    chatState.friends.forEach((name) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "room-button" + (activeRoom === "dm:" + name ? " selected" : "");
      button.textContent = "● " + name;
      button.addEventListener("click", () => {
        activeRoom = "dm:" + name;
        localStorage.setItem("async-active-room", activeRoom);
        renderChat();
      });
      dm.appendChild(button);
    });
    chatState.groups.forEach((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "room-button" + (activeRoom === group.id ? " selected" : "");
      button.textContent = "# " + group.name;
      button.addEventListener("click", () => {
        activeRoom = group.id;
        localStorage.setItem("async-active-room", activeRoom);
        renderChat();
      });
      groups.appendChild(button);
    });
    const friend = activeRoom?.startsWith("dm:")
      ? activeRoom.slice(3)
      : null;
    const group = chatState.groups.find((room) => room.id === activeRoom);
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
    (chatState.messages[activeRoom] || []).forEach((message) => {
      const item = document.createElement("div");
      item.className =
        "chat-bubble " +
        (message.from === "You"
          ? "mine"
          : message.from === "system"
            ? "system"
            : "theirs");
      if (message.from !== "system") {
        const sender = document.createElement("strong");
        sender.textContent = message.from;
        item.appendChild(sender);
      }
      const text = document.createElement("p");
      text.textContent = message.text;
      item.appendChild(text);
      area.appendChild(item);
    });
    area.scrollTop = area.scrollHeight;
  }

  app.chatState = chatState;
  app.addFriend = addFriend;

  $("chatForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $("chatInput").value.trim();
    if (!activeRoom || !value) return;
    (chatState.messages[activeRoom] ??= []).push({ from: "You", text: value });
    $("chatInput").value = "";
    saveChat();
    renderChat();
    $("chatInput").focus();
  });
  $("peopleSearch")?.addEventListener("input", renderPeopleSearch);
  $("createRoomBtn")?.addEventListener("click", () => {
    const choices = $("groupMemberChoices");
    choices.replaceChildren();
    $("groupFormMessage").textContent = "";
    chatState.friends.forEach((friend) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "groupMember";
      checkbox.value = friend;
      label.append(checkbox, document.createTextNode(" " + friend));
      choices.appendChild(label);
    });
    $("groupForm").reset();
    $("groupDialog").showModal();
    $("groupName").focus();
  });
  $("cancelGroupBtn")?.addEventListener("click", () => {
    $("groupDialog").close();
  });
  $("groupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("groupName").value.trim();
    const members = [
      ...$("groupMemberChoices").querySelectorAll(
        'input[name="groupMember"]:checked',
      ),
    ].map((checkbox) => checkbox.value);
    if (!name) {
      $("groupFormMessage").textContent = "Enter a name for your group chat.";
      $("groupName").focus();
      return;
    }
    if (!members.length) {
      $("groupFormMessage").textContent =
        "Select at least one friend to create a group chat.";
      return;
    }
    const id = "group-" + Date.now();
    chatState.groups.push({ id, name, members });
    chatState.messages[id] = [
      {
        from: "system",
        text: `Group created with ${members.join(", ")}. This is a local demonstration; friends cannot see these messages.`,
      },
    ];
    activeRoom = id;
    localStorage.setItem("async-active-room", activeRoom);
    saveChat();
    $("groupDialog").close();
    $("groupForm").reset();
    renderChat();
  });
  $("removeFriendBtn")?.addEventListener("click", () => {
    if (!activeRoom?.startsWith("dm:")) return;
    const name = activeRoom.slice(3);
    if (!confirm("Remove " + name + " from your friends list?")) return;
    chatState.friends = chatState.friends.filter((friend) => friend !== name);
    delete chatState.messages[activeRoom];
    activeRoom = chatState.friends.length
      ? "dm:" + chatState.friends[0]
      : chatState.groups[0]?.id || null;
    saveChat();
    renderChat();
    if ($("profileGrid")) app.renderProfiles();
  });
  if ($("friendList")) renderChat();
})();
