
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//? Styles
import './styles/main.scss'

//? Components
import App from './App.tsx'
import Home from './components/Home.tsx'
import SelectQuiz from './components/SelectQuiz.tsx'
import TriviaGame from './components/TriviaGame.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/select-quiz',
        element: <SelectQuiz />
      },
      {
        path: '/trivia-game',
        element: <TriviaGame />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
