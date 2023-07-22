import { nanoid } from 'nanoid';

export const checkURL = (name) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
};

export const uid = () => {
  let uid = nanoid();
  if (sessionStorage.getItem('uid')) {
    uid = sessionStorage.getItem('uid');
  } else {
    sessionStorage.setItem('uid', uid);
  }
  return uid;
};

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

export const setUpGame = (data) => {
  const types = shuffle([...Array(25).keys()]);
  const blackIndex = getRandomInt(17, 25);

  const currentTeam = Math.random() > 0.5 ? 'blue' : 'red';

  const words = data.map((word, index) => {
    let type = 'neutral';

    if (types[index] < 9) {
      type = currentTeam;
    } else if (types[index] > 8 && types[index] < 17) {
      type = currentTeam === 'blue' ? 'red' : 'blue';
    } else if (types[index] === blackIndex) {
      type = 'black';
    }

    return {
      showType: false,
      type,
      value: word,
      votes: '',
    };
  });

  return {
    currentTeam,
    words,
  };
};

export const gameLink = (roomId) => {
  if (checkURL('roomId')) {
    return window.location.href;
  } else {
    return `${window.location.href}?roomId=${roomId}`;
  }
};
