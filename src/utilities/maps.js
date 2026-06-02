export const gamesMap = {
  csgo: 'Counter-Strike 2',
  lol: 'League of Legends',
  mch: 'Minecraft: Hunger Games',
  pubg: 'PUBG',
  val: 'Valorant'
};

export const gamesAcnMap = {
  csgo: 'CS2',
  lol: 'LoL',
  mch: 'MC:HG',
  pubg: 'PUBG',
  val: 'VAL'
};

export const transformXpToProgress = (xpAmount) => {
  const xp = Number.isFinite(Number(xpAmount)) ? Math.max(0, Number(xpAmount)) : 0;
  let prevAmount = 0;

  if (xp <= 0) {
    return {
      level: 0,
      progression: 0,
      nextLevelAmount: 100 - prevAmount,
    };
  }

  prevAmount = 0;

  if (xp < 100) {
    return {
      level: 1,
      progression: xp,
      nextLevelAmount: 100 - prevAmount,
    };
  }

  prevAmount = 100;

  if (xp < 250) {
    return {
      level: 2,
      progression: xp - 100,
      nextLevelAmount: 250 - prevAmount,
    };
  }

  prevAmount = 250;

  if (xp < 600) {
    return {
      level: 3,
      progression: xp - 250,
      nextLevelAmount: 600 - prevAmount,
    };
  }

  prevAmount = 600;

  return {
    level: 4,
    progression: 600,
    nextLevelAmount: prevAmount,
  };
};