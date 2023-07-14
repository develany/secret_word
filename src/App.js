import { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import { wordsList } from './data/word';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id: 1, name:'start'},
  {id: 2, name:'game'},
  {id: 3, name:'end'},
];

function App() {

  const [ gameStage, setGameStage] = useState(stages[0].name);
  const [words]= useState (wordsList);
  const [pickedWord, setPickedWord] = useState ('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState ([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrognLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickedWordAndPickedCategory = () =>{
    // aqui vai selecionar aleatoriamente a categoria das palavras
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(words).length)];
    // Math.floor arredonda p/ baixo e Math.random()*Object.keys(words).length) vai pegar um numero aleatorio por isso precisamos arrendondar para um iteiro pq assim conseguiremos um indice válido
    console.log(category);
    // aqui vai selecionar aleatoriamente a palavra da categoria selecionada acima
    const word = words[category][Math.floor(Math.random()*words[category].length)];
    console.log(word);
    return {word, category};
  };

  const startGame = ()=> {
    const {word, category} = pickedWordAndPickedCategory();
    //Criar um array de letras
    let wordLetters = word.split(''); // separa a palavra em letras
    wordLetters = wordLetters.map((letra) => letra.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }

  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }
  return (
    <div className="App">
    {gameStage === 'start' && <StartScreen startGame = {startGame} />}
    {gameStage === 'game' && (
      <Game 
      verifyLetter = {verifyLetter} 
      pickedWord = {pickedWord}
      pickedCategory = {pickedCategory}
      letters = {letters}
      guessedLetters = {guessedLetters}
      wrongLetters = {wrongLetters}
      guesses = {guesses}
      score = {score}
      />)}
    {gameStage === 'end' && <GameOver retry = {retry}/>}     
    </div>
  );
}

export default App;
