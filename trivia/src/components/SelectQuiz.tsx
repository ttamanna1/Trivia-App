import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SelectQuiz = () => {
  const navigate = useNavigate()
  const [sessionToken, setSessionToken] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])

  const [formData, setFormData] = useState({
    amount: 10,
    category: 'General Knowledge', 
    difficulty: 'easy'
  })

  interface Category {
    id: number
    name: string
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php?amount=10')
        const { trivia_categories } = response.data
        setCategories(trivia_categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const startNewGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.get('https://opentdb.com/api_token.php?command=request')
      const { token } = response.data
      setSessionToken(token)

      navigate('/trivia-game', {
        state: {
          formData: { ...formData },
          sessionToken: token
        }
      })
      
    } catch (error) {
      console.error('Error starting new game:', error)
    }
  }

  
  return (
    <>
      <div className="background">
        <h1>Select Quiz</h1>
        <form onSubmit={startNewGame} className="form">
          <div className="selections">

            <div className="select-container">
              <p>No. of Questions</p>
              <label hidden htmlFor="amount"></label>
              <select name="amount" value={formData.amount} onChange={handleChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
              </select>
            </div>

            <div className="select-container">
              <p>Select Category</p>
              <label hidden htmlFor="category"></label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="select-container">
              <p>Select Difficulty</p>
              <label hidden htmlFor="difficulty"></label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

          </div>

          <div className="start-button">
            <button type="submit">Start New Game!</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default SelectQuiz