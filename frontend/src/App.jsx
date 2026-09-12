import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Expenses from "./pages/Expenses"
import Income from "./pages/Income"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/register" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}


export default App