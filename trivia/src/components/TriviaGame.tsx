import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const TriviaGame = () => {
  const location = useLocation()
  const { formData, sessionToken } = location.state
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const navigate = useNavigate()
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php`, {
          params: {
            amount: formData.amount,
            difficulty: formData.difficulty,
            token: sessionToken
          }
        })
        setQuestions(response.data.results)
      } catch (error) {
        console.error('Error fetching trivia questions:', error)
      }
    };

    fetchTriviaQuestions()
  }, [formData.amount, formData.difficulty, sessionToken])
  
  interface Question {
    question: string
    incorrect_answers: string[]
    correct_answer: string
  }

const handleNextQuestion = () => {
  setCurrentQuestionIndex(prevIndex => prevIndex + 1)
};

const handleGoHome = () => {
  navigate("/")
}

const currentQuestion = questions[currentQuestionIndex]

if (!currentQuestion) {
  return <div>Loading...</div>
}


  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}:</h2>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.incorrect_answers.map((option, optionIndex) => (
          <li key={optionIndex}>{option}</li>
        ))}
        <li>{currentQuestion.correct_answer}</li>
      </ul>
      {isLastQuestion ? (
        <button onClick={handleGoHome}>Home</button>
      ) : (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
    </div>
  )
}

export default TriviaGame