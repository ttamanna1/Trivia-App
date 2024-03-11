import background from './assets/bg.png'

function App() {


  return (
    <>
      <div className="container" style={ { backgroundImage: `url(${background})` } }></div>
      <div className='content'>
        <h1>Trivia</h1>
      </div>
      
      
      
    </>
  )
}

export default App
