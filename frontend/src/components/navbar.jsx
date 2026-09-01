function Navbar() {

  return (

    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <div>

        <h2 className="text-lg font-semibold text-gray-800">
          Personal Expense Tracker
        </h2>

      </div>


      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
          S
        </div>

        <span className="font-medium text-gray-700">
          Selvin
        </span>

      </div>

    </header>

  )
}


export default Navbar