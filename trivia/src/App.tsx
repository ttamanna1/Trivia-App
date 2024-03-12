import { useEffect } from "react"

function App() {
  useEffect(() => {
    const button: HTMLElement | null = document.getElementById('movingButton')

    function moveButton(): void {
      if (!button) return

      const maxX: number = window.innerWidth - (button.offsetWidth || 0)
      const maxY: number = window.innerHeight - (button.offsetHeight || 0)

      const randomX: number = Math.floor(Math.random() * maxX)
      const randomY: number = Math.floor(Math.random() * maxY)

      if (button.style) {
        button.style.left = randomX + 'px'
        button.style.top = randomY + 'px'
      }
    }

    const intervalId = setInterval(moveButton, 3000)

    return () => clearInterval(intervalId)
  }, [])


  return (
    <>
      <div className="container"></div>
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
        <button id="movingButton">Enter!</button>
      </div>
    </>
  )
}

export default App
