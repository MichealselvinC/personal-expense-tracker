import { useEffect, useState } from "react"
import API from "../services/api"
import Layout from "../components/Layout"
import ExpenseCharts from "../components/ExpenseCharts"


function Dashboard() {

  const [data, setData] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  const fetchDashboard = async () => {

    try {

      const dashboardResponse =
        await API.get("/dashboard/summary")

      const monthlyResponse =
        await API.get("/dashboard/monthly")


      setData(dashboardResponse.data)

      setMonthlyData(monthlyResponse.data)

    } catch (error) {

      console.error("Dashboard Error:", error)

      setError(
        error.response?.data?.detail ||
        "Unable to load dashboard"
      )

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    fetchDashboard()

  }, [])


  // Loading

  if (loading) {

    return (

      <Layout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <div className="text-center">

            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500">
              Loading dashboard...
            </p>

          </div>

        </div>

      </Layout>

    )
  }


  // Error

  if (error) {

    return (

      <Layout>

        <div className="max-w-7xl mx-auto">

          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">

            <h2 className="font-semibold text-lg">
              Dashboard Error
            </h2>

            <p className="mt-1">
              {error}
            </p>

            <button
              onClick={() => {
                setLoading(true)
                setError("")
                fetchDashboard()
              }}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Try Again
            </button>

          </div>

        </div>

      </Layout>

    )
  }


  return (

    <Layout>

      <div className="max-w-7xl mx-auto">


        {/* Header */}

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Here's your expense overview
              </p>

            </div>


            <button
              onClick={() => {
                setLoading(true)
                fetchDashboard()
              }}
              className="self-start px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ↻ Refresh
            </button>

          </div>

        </div>


        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          {/* Total Expenses */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Expenses
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{Number(data?.total_expenses || 0).toFixed(2)}
                </h2>

              </div>


              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                💰
              </div>

            </div>

          </div>


          {/* Monthly Expenses */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  This Month
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{Number(data?.monthly_expenses || 0).toFixed(2)}
                </h2>

              </div>


              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                📅
              </div>

            </div>

          </div>


          {/* Today's Expenses */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Today
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{Number(data?.today_expenses || 0).toFixed(2)}
                </h2>

              </div>


              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                📌
              </div>

            </div>

          </div>

        </div>


        {/* Charts */}

        <ExpenseCharts
          categoryData={data?.category_breakdown || []}
          monthlyData={monthlyData || []}
        />


        {/* Category Breakdown */}

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Category Breakdown
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                See where your money is going
              </p>

            </div>

          </div>


          {data?.category_breakdown?.length === 0 ? (

            <div className="py-10 text-center">

              <p className="text-gray-500">
                No category data available.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {data?.category_breakdown?.map((item) => (

                <div
                  key={item.category}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      📁
                    </div>

                    <span className="font-medium text-gray-800">
                      {item.category}
                    </span>

                  </div>


                  <span className="font-semibold text-gray-900">
                    ₹{Number(item.total || 0).toFixed(2)}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* Recent Expenses */}

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-6 border-b border-gray-100">

            <h2 className="text-xl font-bold text-gray-900">
              Recent Expenses
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest transactions
            </p>

          </div>


          {data?.recent_expenses?.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-4xl mb-3">
                🧾
              </div>

              <p className="text-gray-500">
                No recent expenses.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Description
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                      Amount
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data?.recent_expenses?.map((expense) => (

                    <tr
                      key={expense.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4">

                        <span className="inline-flex px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                          {expense.category}
                        </span>

                      </td>


                      <td className="px-6 py-4 text-gray-600">
                        {expense.description || "-"}
                      </td>


                      <td className="px-6 py-4 text-gray-500">
                        {expense.expense_date}
                      </td>


                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        ₹{Number(expense.amount || 0).toFixed(2)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


      </div>

    </Layout>

  )
}


export default Dashboard