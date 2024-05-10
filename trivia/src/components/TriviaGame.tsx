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
  const [lock, setLock] = useState(false)
  

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php`, {
          params: {
            amount: formData.amount,
            category: formData.category,
            difficulty: formData.difficulty,
            token: sessionToken
          }
        })
        const formattedQuestions = response.data.results.map((question: Question) => ({
          ...question,
          question: question.question
            .replace(/&#039;/g, "'")
            .replace(/&quot;/g, '"')
        }))
        setQuestions(formattedQuestions)
      } catch (error) {
        console.error('Error fetching trivia questions:', error)
      }
    };

    fetchTriviaQuestions()
  }, [formData.amount, formData.category, formData.difficulty, sessionToken])
  
  interface Question {
    type: string
    question: string
    incorrect_answers: string[]
    correct_answer: string
  }
  
  const checkAnswer = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedAnswer: string) => {
    if (lock === false) {
      if (selectedAnswer === currentQuestion.correct_answer) {
        e.currentTarget.classList.add("correct")
        setLock(true)
      }
      else {
        e.currentTarget.classList.add("wrong")
        setLock(true)
      }
    }
  }


  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1)
  }

  const handleGoHome = () => {
    navigate("/")
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return <div>Loading...</div>
  }


  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h2>Question {currentQuestionIndex + 1}:</h2>
        <hr/>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.incorrect_answers.map((option, optionIndex) => (
            <li key={optionIndex} onClick={(e) => {checkAnswer(e, option)}}>{option}</li>
          ))}
          <li onClick={(e) => {checkAnswer(e, currentQuestion.correct_answer)}}>{currentQuestion.correct_answer}</li>
        </ul>
        {isLastQuestion ? (
          <button className="btn" onClick={handleGoHome}>Home</button>
        ) : (
          <button className="btn" onClick={handleNextQuestion}>Next</button>
        )}
      </div>
    </div>
  )
}

export default TriviaGame



