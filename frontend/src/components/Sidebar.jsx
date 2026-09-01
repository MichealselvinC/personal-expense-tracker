import { NavLink, useNavigate } from "react-router-dom"


function Sidebar() {

  const navigate = useNavigate()


  const handleLogout = () => {

    localStorage.removeItem("access_token")

    navigate("/login")

  }


  return (

    <aside className="w-64 min-h-screen bg-gray-950 text-white fixed left-0 top-0">

      <div className="p-6">

        <h1 className="text-2xl font-bold">
          💰 Expense Tracker
        </h1>

      </div>


      <nav className="px-4 mt-6 space-y-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          📊 Dashboard
        </NavLink>


        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          💳 Expenses
        </NavLink>

      </nav>


      <div className="absolute bottom-6 left-4 right-4">

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          🚪 Logout
        </button>

      </div>

    </aside>

  )
}


export default Sidebar