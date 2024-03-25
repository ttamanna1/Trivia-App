

const SelectQuiz = () => {
  return (
    <>
      <div className="background">
        <h1>Select Quiz</h1>
        <form method="" className="form">
          <div className="selections">

            <div className="select-container">
              <p>No. of Questions</p>
              <label hidden htmlFor="amount"></label>
              <select name="amount" defaultValue={10}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
              </select>
            </div>

            <div className="select-container">
              <p>Select Category</p>
              <label hidden htmlFor="category"></label>
              <select name="category">
                <option value="" disabled>Select Category</option>
              </select>
            </div>

            <div className="select-container">
              <p>Select Difficulty</p>
              <label hidden htmlFor="difficulty"></label>
              <select name="difficulty" defaultValue="easy">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

          </div>

          <div className="start-button">
            <button>Start New Game!</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default SelectQuiz