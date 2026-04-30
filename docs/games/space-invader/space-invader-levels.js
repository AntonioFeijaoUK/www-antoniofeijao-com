(function () {
  var levelTargets = [3, 5, 10, 15, 20, 30, 45, 80, 150, 200];

  function getLevelEnemyTarget(level) {
    if (level <= levelTargets.length) {
      return levelTargets[level - 1];
    }

    return 200 + (level - levelTargets.length) * 50;
  }

  function getLevelCapacity(gameWidth, gameHeight) {
    var horizontalSlots = Math.max(1, Math.floor((gameWidth - 80) / 52));
    var verticalSlots = Math.max(1, Math.floor((gameHeight * 0.42) / 38));

    return horizontalSlots * verticalSlots;
  }

  function getEnemyCountForLevel(level, gameWidth, gameHeight) {
    return Math.min(getLevelEnemyTarget(level), getLevelCapacity(gameWidth, gameHeight));
  }

  function createEnemies(level, gameWidth, gameHeight) {
    var enemies = [];
    var count = getEnemyCountForLevel(level, gameWidth, gameHeight);
    var maxColumns = Math.max(1, Math.floor((gameWidth - 80) / 52));
    var columns = Math.min(maxColumns, count);
    var rows = Math.ceil(count / columns);
    var usedColumns = Math.min(columns, count);
    var startX = Math.max(40, Math.round((gameWidth - ((usedColumns - 1) * 52 + 28)) / 2));
    var startY = 60;
    var gapX = 52;
    var gapY = 38;
    var created = 0;

    for (var row = 0; row < rows; row += 1) {
      for (var column = 0; column < columns; column += 1) {
        if (created >= count) {
          break;
        }

        enemies.push({
          x: startX + column * gapX,
          y: startY + row * gapY,
          width: 28,
          height: 20,
          alive: true
        });
        created += 1;
      }
    }

    return enemies;
  }

  function getLevelSpeed(level) {
    return 32 * Math.pow(1.22, level - 1);
  }

  function getEnemyDrop(level) {
    return Math.min(26, 16 + level);
  }

  window.SpaceInvaderLevels = {
    createEnemies: createEnemies,
    getEnemyCountForLevel: getEnemyCountForLevel,
    getEnemyDrop: getEnemyDrop,
    getLevelSpeed: getLevelSpeed
  };
})();
