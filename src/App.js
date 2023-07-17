import { useCallback, useEffect, useState } from 'react';
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

  const pickedWordAndPickedCategory = useCallback (() =>{
    // aqui vai selecionar aleatoriamente a categoria das palavras
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(words).length)];
    // Math.floor arredonda p/ baixo e Math.random()*Object.keys(words).length) vai pegar um numero aleatorio por isso precisamos arrendondar para um iteiro pq assim conseguiremos um indice válido
    // aqui vai selecionar aleatoriamente a palavra da categoria selecionada acima
    const word = words[category][Math.floor(Math.random()*words[category].length)];
    return {word, category};
  }, [words])

  const startGame = useCallback ( ()=> {
    clearLetterStates()
    const {word, category} = pickedWordAndPickedCategory();
    //Criar um array de letras
    let wordLetters = word.split(''); // separa a palavra em letras
    wordLetters = wordLetters.map((letra) => letra.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickedWordAndPickedCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //validando se a letra já foi ultilizada de alguma maneira

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }
    //enviar as letras p/ o lugar das certas ou das erradas

    if (letters.includes(normalizedLetter)){
      setGuessedLetters ((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter])
    } else {
      setWrognLetters ((actualWrognLetters) => [...actualWrognLetters, normalizedLetter])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }
    const clearLetterStates = () => {
      setGuessedLetters ([])
      setWrognLetters ([])
    }

    //aqui verifica a quantidade de tentativas
    useEffect(() => {
      if (guesses <= 0) {
        // reiniciar o jogo
        clearLetterStates()
        setGameStage (stages[2].name)
      }
    }, [guesses])
    //aqui verifica as condições para ganhar
    useEffect (() => {
      const uniqueLetters = [...new Set(letters)]// new Set() gera um novo array com elementos únicos
      
      if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
        setScore((actualScore) => actualScore +=100)
        startGame();
      }
    },[guessedLetters, letters, startGame])

  const retry = () => {
    setScore (0)
    setGuesses (3)
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
    {gameStage === 'end' && <GameOver retry = {retry} score={score}/>}     
    </div>
  );
}

export default App;
