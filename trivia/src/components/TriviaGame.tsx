import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"

const TriviaGame = () => {
  const location = useLocation()
  const { formData, sessionToken } = location.state
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const navigate = useNavigate()
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const [lock, setLock] = useState(false)
  const correctAnswerRef = useRef<HTMLLIElement>(null)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])

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
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"'), 
          correct_answer: question.correct_answer
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"'),
          incorrect_answers: question.incorrect_answers.map(answer => 
            answer.replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
          )
        }))
        setQuestions(formattedQuestions)
      } catch (error) {
        console.error('Error fetching trivia questions:', error)
      }
    }

    fetchTriviaQuestions()
  }, [formData.amount, formData.category, formData.difficulty, sessionToken])
  
  interface Question {
    type: string
    question: string
    incorrect_answers: string[]
    correct_answer: string
  }

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    if (currentQuestion) {
      // Fisher-Yates sorting algorithm to shuffle incorrect answers and correct answer
      const shuffleAnswers = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }
  
      // Shuffle the questions array
      const shuffledAnswers = shuffleAnswers([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ])
      
      setShuffledAnswers(shuffledAnswers)
    }
  }, [currentQuestion])

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  const checkAnswer = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedAnswer: string) => {
      if (lock === false) {
        if (selectedAnswer === currentQuestion.correct_answer) {
          e.currentTarget.classList.add("correct")
          setLock(true)
          setScore(prevScore => prevScore + 1)
        }
        else {
          e.currentTarget.classList.add("wrong")
          if (correctAnswerRef.current) {
            correctAnswerRef.current.classList.add("correct")
          }
          setLock(true)
        }
      }
  }

  const handleNextQuestion = () => {
    if (lock === true) {
      if (isLastQuestion) {
        setResult(true)
        return 0
      }
      setCurrentQuestionIndex(prevIndex => prevIndex + 1)
      setLock(false)
      const options = document.querySelectorAll("li")
      options.forEach(option => {
        option.classList.remove("wrong")
        option.classList.remove("correct")
      })
    }
  }

  const handleGoHome = () => {
    if (lock === true) {
      navigate("/")
    }
  }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {result ? <></> : <>
        <h2>Question {currentQuestionIndex + 1}:</h2>
        <hr/>
        <p>{currentQuestion.question}</p>
        <ul>
          {shuffledAnswers.map((option, optionIndex) => (
            <li 
            key={optionIndex} 
            onClick={(e) => {checkAnswer(e, option)}}
            ref={option === currentQuestion.correct_answer ? correctAnswerRef : null}
            >
              {option}
            </li>
          ))}
        </ul>
          <button className="btn" onClick={handleNextQuestion}>Next</button>
          <div className="index">{currentQuestionIndex + 1} of {questions.length} questions</div>
        </>}  
        {result ? <>
          <h2>Score: {score} out of {questions.length}</h2>
          <button className="btn" onClick={handleGoHome}>Home</button>
        </>
        :
        <></>}
      </div>
    </div>
  )
}

export default TriviaGame



