import Sidebar from "./Sidebar"
import Navbar from "./Navbar"


function Layout({ children }) {

  return (

    <div className="min-h-screen bg-gray-100">

      <Sidebar />


      <div className="ml-64">

        <Navbar />

        <main className="p-6 md:p-8">

          {children}

        </main>

      </div>

    </div>

  )
}


export default Layout