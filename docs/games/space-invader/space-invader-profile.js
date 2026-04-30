(function () {
  function createEmojiOption(name, emoji, isChecked) {
    var label = document.createElement("label");
    var input = document.createElement("input");
    var span = document.createElement("span");

    input.type = "radio";
    input.name = name;
    input.value = emoji;
    input.checked = isChecked;
    span.textContent = emoji;

    label.appendChild(input);
    label.appendChild(span);
    return label;
  }

  function create(options) {
    var form = options.form;
    var nicknameInput = options.nicknameInput;
    var randomNameButton = options.randomNameButton;
    var pilotNames = options.pilotNames;
    var shipEmojiOptions = options.shipEmojiOptions;
    var enemyEmojiOptions = options.enemyEmojiOptions;

    function getRandomName() {
      return pilotNames[Math.floor(Math.random() * pilotNames.length)] + " " + Math.floor(10 + Math.random() * 90);
    }

    function normaliseNickname(value) {
      var nickname = value.trim().replace(/\s+/g, " ");
      return nickname || getRandomName();
    }

    function renderEmojiOptions(name, emojiOptions, defaultEmoji) {
      var container = form.querySelector("[data-emoji-options='" + name + "']");
      var hasDefault = emojiOptions.indexOf(defaultEmoji) !== -1;

      if (!container) {
        return;
      }

      container.textContent = "";
      emojiOptions.forEach(function (emoji, index) {
        container.appendChild(createEmojiOption(
          name,
          emoji,
          emoji === defaultEmoji || (!hasDefault && index === 0)
        ));
      });
    }

    function renderEmojiPickers() {
      renderEmojiOptions("ship", shipEmojiOptions, "🚀");
      renderEmojiOptions("enemy", enemyEmojiOptions, "👾");
    }

    function getSelectedEmoji(name, fallback) {
      var selected = form.querySelector("input[name='" + name + "']:checked");
      return selected ? selected.value : fallback;
    }

    function getProfile() {
      return {
        enemy: getSelectedEmoji("enemy", "👾"),
        nickname: normaliseNickname(nicknameInput.value),
        ship: getSelectedEmoji("ship", "🚀")
      };
    }

    function selectRandomOption(name) {
      var choices = form.querySelectorAll("input[name='" + name + "']");
      if (choices.length === 0) {
        return;
      }

      choices[Math.floor(Math.random() * choices.length)].checked = true;
    }

    function selectRandomEmojis() {
      selectRandomOption("ship");
      selectRandomOption("enemy");
    }

    function bind(onEmojiChange) {
      form.addEventListener("change", function (event) {
        if (event.target && (event.target.name === "ship" || event.target.name === "enemy")) {
          onEmojiChange(getProfile());
        }
      });

      randomNameButton.addEventListener("click", function () {
        nicknameInput.value = getRandomName();
        nicknameInput.focus();
      });
    }

    return {
      bind: bind,
      getProfile: getProfile,
      renderEmojiPickers: renderEmojiPickers,
      selectRandomEmojis: selectRandomEmojis
    };
  }

  window.SpaceInvaderProfile = {
    create: create
  };
})();
