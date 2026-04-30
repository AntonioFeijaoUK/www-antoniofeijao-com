(function () {
  function create(storageKey) {
    function getBestRecord() {
      var fallback = {
        enemy: "",
        nickname: "",
        ship: "",
        score: 0
      };

      try {
        var saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved && Number.isFinite(Number(saved.score))) {
          saved.score = Number(saved.score);
          return saved;
        }
      } catch (error) {
        return fallback;
      }

      return fallback;
    }

    function setBestRecord(game) {
      if (game.score > getBestRecord().score) {
        try {
          localStorage.setItem(storageKey, JSON.stringify({
            enemy: game.profile.enemy,
            nickname: game.profile.nickname,
            ship: game.profile.ship,
            score: game.score
          }));
        } catch (error) {
          return;
        }
      }
    }

    return {
      getBestRecord: getBestRecord,
      setBestRecord: setBestRecord
    };
  }

  window.SpaceInvaderStorage = {
    create: create
  };
})();
