import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import API from "../services/api"


function Register() {

  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      await API.post("/auth/register", { name, email, password })
      navigate("/login", { state: { registered: true } })
    } catch (requestError) {
      setError(
        requestError.response?.data?.detail || "Unable to create account"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Start tracking your expenses
        </p>

        {error && (
          <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
                required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
                required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
                minLength={6}
                required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>


        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}


export default Register