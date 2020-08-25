const data = ['tomato', 'umbrella', 'sports', 'hockey', 'football', 'soccer', 'monk', 'warrior', 'wizard', 'necromancer', 'druid', 'warchief', 'lieutenant', 'apple', 'pear', 'banana', 'lettuce','spinach', 'chicken', 'beef', 'pork', 'army', 'random', 'computer', 'monitor', 'keyboard', 'mouse', 'book', 'glasses', 'pen']


const word = document.getElementById('word');
const popupContainer = document.getElementById(`popup-container`);
const notificationContainer = document.getElementById('notification-container');
const wrongLetter = document.getElementById('wrong-letters');
const finalMessage = document.getElementById('final-message');
const playAgain = document.getElementById('play-again');
const figureParts = document.querySelectorAll('.figure-part');

let randomWord = data[Math.round(Math.random()*data.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word
const displayWord = () => {
    
    word.innerHTML = `
        ${randomWord.split('')
        .map(letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : '' }
        </span>
        `).join('')
    }
    `;
    //display when won
    const innerWord = word.innerText.replace(/\n/g, '');

    if(innerWord === randomWord){
        finalMessage.innerText = 'congratulations!  You Won!';
        popupContainer.style.display = 'flex'
    }};


displayWord();

console.log(randomWord);
//update wrong letters
const updateWrongLettersEl = () =>{

    wrongLetter.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })
    //check if lost
    const gameOver = wrongLetters.length === figureParts.length;
        if(gameOver){
            finalMessage.innerText = 'Unfortunately you lost';
            popupContainer.style.display = 'flex'
        }
    };

const showNotification = () => {
    notificationContainer.classList.add('show');
    
    setTimeout(() => notificationContainer.classList.remove('show'), 2000)
};



window.addEventListener('keydown', (event)=>{
    const isValidKey = event.keyCode >= 65 && event.keyCode <= 90;
      if(isValidKey){
        const letter = event.key;
      
        const isDuplicateLetter = correctLetters.includes(letter) || wrongLetters.includes(letter);
        if (isDuplicateLetter) {
         return showNotification(); 
        }
        
        const isLetterIncluded = randomWord.includes(letter)
        if(!isLetterIncluded){
            wrongLetters.push(letter);
          return updateWrongLettersEl(letter);
        }
        
        correctLetters.push(letter);
        displayWord();
      }
  });

playAgain.addEventListener('click', () => {
    console.log('123')
    // reset arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    // new word
    randomWord = data[Math.round(Math.random()*data.length)];

    // update UI
    updateWrongLettersEl();
    displayWord();

    popupContainer.style.display = 'none';
});


