import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const TriviaGame = () => {
  const location = useLocation()
  const { formData, sessionToken } = location.state
  const [questions, setQuestions] = useState<Question[]>([])

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

  return (
    <>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <h2>Question {index + 1}:</h2>
            <p>{question.question}</p>
            <ul>
              {question.incorrect_answers.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
              <li>{question.correct_answer}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default TriviaGame