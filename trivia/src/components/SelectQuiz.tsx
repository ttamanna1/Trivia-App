

const SelectQuiz = () => {
  return (
    <>
      <div className="background">
        <h1>Select Quiz</h1>
        <form method="" className="form">
          <div className="">

            <label hidden htmlFor="amount"></label>
            <select name="amount">
              <option value="" disabled selected>No. of Questions</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>

            <label hidden htmlFor="category"></label>
            <select name="category">
              <option value="" disabled selected>Select Category</option>
            </select>

            <label hidden htmlFor="difficulty"></label>
            <select name="difficulty">
              <option value="" disabled selected>Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </form>
      </div>
    </>
  )
}

export default SelectQuiz