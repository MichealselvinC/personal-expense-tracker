function Navbar({ onMenuClick }) {

  return (

    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">

      {/* Left */}

      <div className="flex items-center gap-3">

        {/* Mobile menu */}

        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center text-xl"
        >
          ☰
        </button>


        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Personal Expense Tracker
        </h2>

      </div>


      {/* User */}

      <div className="flex items-center gap-2 sm:gap-3">

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
          S
        </div>

        <span className="hidden sm:block font-medium text-gray-700">
          Selvin
        </span>

      </div>

    </header>

  )
}


export default Navbar
