export const WORD_LIST = ["scale", "space", "built", "mould", "plane"];

export function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export function checkGuess(guess, answer) {
  let result = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result.push({ letter: guess[i], status: 'correct' });
    } else if (answer.includes(guess[i])) {
      result.push({ letter: guess[i], status: 'present' });
    } else {
      result.push({ letter: guess[i], status: 'absent' });
    }
  }
  return result;
}
