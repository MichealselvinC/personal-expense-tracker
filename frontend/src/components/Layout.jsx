import { useState } from "react"

import Sidebar from "./Sidebar"
import Navbar from "./Navbar"


function Layout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)


  return (

    <div className="min-h-screen bg-gray-100">

      {/* Mobile overlay */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />

      )}


      {/* Sidebar */}

      <div
        className={`
          fixed
          z-50
          transition-transform
          duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        <Sidebar />

      </div>


      {/* Main */}

      <div className="lg:ml-64">

        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>

  )
}


export default Layout