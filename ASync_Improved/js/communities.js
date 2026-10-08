(() => {
  const { $, communities } = window.ASyncDemo;

  function renderCommunities() {
    const grid = $("communityGrid");
    grid.innerHTML = "";
    communities.forEach((community) => {
      const card = document.createElement("article");
      card.className = "community-card";
      const symbol = document.createElement("div");
      symbol.className = "community-symbol";
      symbol.textContent = community.emoji;
      const title = document.createElement("h3");
      title.textContent = community.name;
      const desc = document.createElement("p");
      desc.textContent = community.members;
      const tag = document.createElement("span");
      tag.className = "community-topic";
      tag.textContent = community.topic;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "card-action";
      button.textContent = "Preview community ↗";
      button.addEventListener("click", () => {
        $("communityFeedback").textContent =
          `${community.name} · Conversation idea: ${community.prompt} (Preview only — no live community yet.)`;
      });
      card.append(symbol, tag, title, desc, button);
      grid.appendChild(card);
    });
  }

  if ($("communityGrid")) renderCommunities();
})();
