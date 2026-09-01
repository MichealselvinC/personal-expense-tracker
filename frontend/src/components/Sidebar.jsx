import { NavLink, useNavigate } from "react-router-dom"


function Sidebar() {

  const navigate = useNavigate()


  const handleLogout = () => {

    localStorage.removeItem("access_token")

    navigate("/login")

  }


  return (

    <aside className="w-64 min-h-screen bg-gray-950/80 backdrop-blur-2xl border-r border-white/10 text-white shadow-2xl">

      {/* Logo */}

      <div className="p-6 border-b border-white/10">

        <h1 className="text-2xl font-bold">
          💰 Expense Tracker
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Manage your money
        </p>

      </div>


      {/* Navigation */}

      <nav className="px-4 mt-6 space-y-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            border
            transition-all
            duration-300
            ${
              isActive
                ? "bg-white/15 text-white border-white/20 shadow-lg backdrop-blur-md"
                : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
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


        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            border
            transition-all
            duration-300
            ${
              isActive
                ? "bg-white/15 text-white border-white/20 shadow-lg backdrop-blur-md"
                : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
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


      {/* Bottom */}

      <div className="absolute bottom-0 w-64 p-4">

        <div className="border-t border-white/10 pt-4">


          {/* User */}

          <div className="flex items-center gap-3 px-4 py-3 mb-2">

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg">
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
              rounded-xl
              text-gray-400
              hover:bg-red-500/20
              hover:text-red-300
              transition-all
              duration-300
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
