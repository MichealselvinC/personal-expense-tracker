import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import API from "../services/api"


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const handleLogin = async (e) => {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      const response = await API.post("/auth/login", {
        email,
        password,
      })

      const token = response.data.access_token

      localStorage.setItem("access_token", token)

      navigate("/dashboard")

    } catch (error) {

      if (error.response) {
        setError(
          error.response.data.detail || "Login failed"
        )
      } else {
        setError("Unable to connect to server")
      }

    } finally {

      setLoading(false)

    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to manage your expenses
        </p>


        {error && (
          <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}


        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="text-center text-sm text-gray-600 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-black hover:underline"
          >
            Create account
          </Link>

        </p>

      </div>

    </div>
  )
}


export default Login