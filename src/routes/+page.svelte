<script>
    import { onMount } from 'svelte';
    import { getRandomWord, checkGuess } from '$lib/wordle';
  
    let guess = '';
    let guesses = [];
    let answer = '';
    let gameOver = false;
    let maxAttempts = 6;
  
    onMount(() => {
      answer = getRandomWord();
    });
  
    function submitGuess() {
      if (guess.length !== 5 || gameOver) return;
      let result = checkGuess(guess.toLowerCase(), answer);
      guesses = [...guesses, { guess, result }];
      if (guess.toLowerCase() === answer) {
        gameOver = true;
        alert('Congratulations! You guessed the word.');
      } else if (guesses.length >= maxAttempts) {
        gameOver = true;
        alert(`Game over! The word was: ${answer}`);
      }
      guess = '';
    }
  
    function handleInput(event) {
      guess = event.target.value.toUpperCase();
    }
  </script>
  
  <main>
    <h1>Wordle Game</h1>
  
    <div class="guesses">
      {#each guesses as { guess, result }}
        <div class="guess">
          {#each result as { letter, status }}
            <span class={`letter ${status}`}>{letter}</span>
          {/each}
        </div>
      {/each}
    </div>
  
    {#if !gameOver}
      <input type="text" bind:value={guess} maxlength="5" on:input={handleInput} />
      <button on:click={submitGuess} disabled={guess.length !== 5}>Submit Guess</button>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      margin-top: 50px;
    }
    .guesses {
      margin-bottom: 20px;
    }
    .guess {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
    .letter {
      font-size: 24px;
      width: 40px;
      height: 40px;
      display: inline-block;
      margin: 5px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #ccc;
      text-transform: uppercase;
    }
    .letter.correct {
      background-color: green;
      color: white;
    }
    .letter.present {
      background-color: yellow;
      color: black;
    }
    .letter.absent {
      background-color: gray;
      color: white;
    }
  </style>
  