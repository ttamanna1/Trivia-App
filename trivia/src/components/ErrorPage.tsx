import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError() 
  const navigate = useNavigate()

  
  if (!isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <button className="btn" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Something went wrong...</h1>
      <h2>Error {error.status}</h2>
      {error.data?.message && <p>{error.data.message}</p>}
      <button className="btn" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}