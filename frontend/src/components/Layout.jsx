import { useState } from "react"

import Sidebar from "./Sidebar"
import Navbar from "./Navbar"


function Layout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)


  return (

    <div className="min-h-screen">


      {/* Mobile Overlay */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />

      )}


      {/* Sidebar */}

      <div
        className={`
          fixed
          left-0
          top-0
          bottom-0
          z-50
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        <Sidebar />

      </div>


      {/* Main Content */}

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
