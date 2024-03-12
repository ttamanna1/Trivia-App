import background from './assets/bg.png'

function App() {


  return (
    <>
      <div className="container" style={ { backgroundImage: `url(${background})` } }></div>
      <div className='content'>
        <div className="wrapper">
          <div className="heading"> 
            <span className="char1" data-heading="The">The</span> 
            <span className="char2" data-heading="Ultimate">Ultimate</span> 
            <span className="char3" data-heading="Trivia">Trivia</span> 
            <span className="char4" data-heading="Extravaganza">Extravaganza</span> 
            <span className="char5" data-heading="!">!</span>    
          </div>
        </div>
      </div>
    </>
  )
}

export default App
