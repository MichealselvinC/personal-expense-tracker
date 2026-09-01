import { NavLink, useNavigate } from "react-router-dom"


function Sidebar() {

  const navigate = useNavigate()


  // =========================
  // Logout
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("access_token")

    navigate("/login")

  }


  return (

    <aside className="w-64 min-h-screen bg-gray-950 text-white">

      {/* =========================
          Logo
      ========================= */}

      <div className="p-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          💰 Expense Tracker
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Manage your money
        </p>

      </div>


      {/* =========================
          Navigation
      ========================= */}

      <nav className="px-4 mt-6 space-y-2">

        {/* Dashboard */}

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `
            flex items-center gap-3
            px-4 py-3
            rounded-lg
            transition
            ${
              isActive
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }
            `
          }
        >

          <span className="text-lg">
            📊
          </span>

          <span>
            Dashboard
          </span>

        </NavLink>


        {/* Expenses */}

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `
            flex items-center gap-3
            px-4 py-3
            rounded-lg
            transition
            ${
              isActive
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }
            `
          }
        >

          <span className="text-lg">
            💳
          </span>

          <span>
            Expenses
          </span>

        </NavLink>

      </nav>


      {/* =========================
          Bottom Section
      ========================= */}

      <div className="absolute bottom-0 w-64 p-4">

        <div className="border-t border-gray-800 pt-4">

          {/* User */}

          <div className="flex items-center gap-3 px-4 py-3 mb-2">

            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold">
              S
            </div>

            <div>

              <p className="text-sm font-medium">
                Selvin
              </p>

              <p className="text-xs text-gray-500">
                Personal Account
              </p>

            </div>

          </div>


          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              text-gray-300
              hover:bg-red-600
              hover:text-white
              transition
            "
          >

            <span className="text-lg">
              🚪
            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </div>

    </aside>

  )
}


export default Sidebar
