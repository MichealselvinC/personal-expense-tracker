import { Link } from "react-router-dom"


function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to manage your expenses
        </p>


        <form className="mt-8 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Login
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