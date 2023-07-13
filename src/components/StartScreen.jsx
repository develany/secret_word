import './StartScreen.css'
const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
    <h1>Secret Word</h1>
    <p>Clique no botão para começar a jogar</p>
    <button onClick={startGame}>COMEÇAR</button>
    <h1> PROX AULA 74</h1>
    </div>
  )
}

export default StartScreen