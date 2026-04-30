(function () {
  var celestialNames = [
    "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune",
    "Luna", "Phobos", "Deimos", "Europa", "Ganymede", "Callisto", "Titan", "Enceladus",
    "Triton", "Pluto", "Ceres", "Vesta", "Halley", "Andromeda", "Triangulum", "Milky Way",
    "Sombrero", "Whirlpool", "Pinwheel", "Centaurus A", "Orion", "Cassiopeia", "Lyra",
    "Cygnus", "Vega", "Sirius", "Rigel", "Betelgeuse", "Proxima", "Alpha Centauri"
  ];

  var pilotRoles = [
    "Pilot", "Scout", "Ranger", "Cadet", "Navigator", "Voyager", "Explorer", "Observer",
    "Cartographer", "Comet Chaser", "Moon Mapper", "Orbit Ace", "Signal Finder", "Star Guide"
  ];

  var pilotNames = [];

  celestialNames.forEach(function (name) {
    pilotRoles.forEach(function (role) {
      pilotNames.push(name + " " + role);
    });
  });

  var playfulEmojiOptions = [
    "🛸", "✨", "🔺", "🛰️", "🛩️", "⚡", "🌟", "💫", "🔥", "💎",
    "🟢", "🔴", "🟡", "🦄", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊",
    "🐻", "🐼", "🐨", "🐯",
    "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🦉", "🦆",
    "🦅", "🦋", "🐝", "🐞", "🦀", "🐙", "🐬", "🐳", "🦖", "🦕",
    "🐢", "🐠", "🐡", "🐟", "🦑", "🐌", "🦜", "🦩", "🌵", "🌲",
    "🌳", "🌴", "🌱", "🌿", "☘️", "🍀", "🍄", "🌻", "🌼", "🌷",
    "🌹", "🌺", "🌸", "🍁", "🍂", "🍃", "🍎", "🍊", "🍋", "🍌",
    "🍉", "🍇", "🍓", "🫐", "🍒", "🍍", "🥝", "🥑", "🥕", "🌽",
    "🍕", "🍔", "🍟", "🌭", "🥨", "🧀", "🍩", "🍪", "🧁", "🍭",
    "🎈", "🎁", "🎮", "🧩", "🎲"
  ];

  window.SpaceInvaderConfig = {
    enemyEmojiOptions: ["👾"].concat(playfulEmojiOptions),
    gameVersion: "2.0.0",
    pilotNames: pilotNames,
    shipEmojiOptions: ["🚀"].concat(playfulEmojiOptions),
    storageKey: "space-invader-best-record"
  };
})();
