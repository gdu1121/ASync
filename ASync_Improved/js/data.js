(() => {
  const app = (window.ASyncDemo = {});
  app.$ = (id) => document.getElementById(id);
  app.interests = [
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
  app.people = [
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
  app.selected = new Set();
  app.communities = [
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
})();
