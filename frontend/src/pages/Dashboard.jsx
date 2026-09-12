import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import API from "../services/api"
import Layout from "../components/Layout"
import ExpenseCharts from "../components/ExpenseCharts"


function Dashboard() {

  const [data, setData] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  // ================================
  // Fetch Dashboard
  // ================================

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


  // ================================
  // Initial Load
  // ================================

  useEffect(() => {

    fetchDashboard()

  }, [])


  // ================================
  // Loading
  // ================================

  if (loading) {

    return (

      <Layout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            className="
              glass-strong
              rounded-3xl
              px-10
              py-8
              text-center
            "
          >

            <div className="
              w-11
              h-11
              border-4
              border-indigo-200
              border-t-indigo-600
              rounded-full
              animate-spin
              mx-auto
            " />

            <p className="mt-4 text-gray-500">
              Loading dashboard...
            </p>

          </motion.div>

        </div>

      </Layout>

    )
  }


  // ================================
  // Error
  // ================================

  if (error) {

    return (

      <Layout>

        <div className="max-w-7xl mx-auto">

          <div className="
            bg-red-500/10
            backdrop-blur-xl
            border
            border-red-300/40
            text-red-700
            rounded-2xl
            p-6
            shadow-lg
          ">

            <h2 className="font-bold text-lg">
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

              className="
                mt-5
                px-5
                py-2.5
                rounded-xl
                bg-gray-900
                text-white
                hover:bg-gray-800
                transition
              "
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

      <div className="max-w-7xl mx-auto pb-10">


        {/* ================================
            Header
        ================================= */}

        <motion.div

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.45
          }}

          className="mb-8"
        >

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          ">

            <div>

              <p className="
                text-sm
                font-medium
                text-indigo-600
                mb-1
              ">
                Overview
              </p>

              <h1 className="
                text-3xl
                sm:text-4xl
                font-extrabold
                text-gray-900
                tracking-tight
              ">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Here's your expense overview
              </p>

            </div>


            <motion.button

              whileHover={{
                y: -2,
                scale: 1.02
              }}

              whileTap={{
                scale: 0.97
              }}

              onClick={() => {

                setLoading(true)

                fetchDashboard()

              }}

              className="
                self-start
                glass
                glass-hover
                px-5
                py-2.5
                rounded-xl
                text-gray-700
                font-medium
                flex
                items-center
                gap-2
              "
            >

              <span className="text-lg">
                ↻
              </span>

              Refresh

            </motion.button>

          </div>

        </motion.div>


        {/* ================================
            Summary Cards
        ================================= */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
        ">


          {/* Total */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: 0.1
            }}

            whileHover={{
              y: -6
            }}

            className="
              relative
              overflow-hidden
              glass-strong
              rounded-3xl
              p-6
              min-h-[170px]
            "
          >

            <div className="
              absolute
              -top-16
              -right-16
              w-40
              h-40
              rounded-full
              bg-indigo-400/20
              blur-3xl
            " />


            <div className="
              relative
              flex
              items-start
              justify-between
            ">

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Total Expenses
                </p>

                <h2 className="
                  text-3xl
                  font-extrabold
                  text-gray-900
                  mt-3
                ">
                  ₹{Number(
                    data?.total_expenses || 0
                  ).toFixed(2)}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  All time spending
                </p>

              </div>


              <div className="
                w-12
                h-12
                rounded-2xl
                bg-indigo-500/10
                border
                border-indigo-300/20
                backdrop-blur-md
                flex
                items-center
                justify-center
                text-2xl
              ">
                💰
              </div>

            </div>

          </motion.div>


          {/* Income */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden glass-strong rounded-3xl p-6 min-h-[170px]"
          >

            <div className="relative flex items-start justify-between">

              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Income
                </p>

                <h2 className="text-3xl font-extrabold text-emerald-700 mt-3">
                  ₹{Number(data?.total_income || 0).toFixed(2)}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  All time income
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-300/20 flex items-center justify-center text-2xl">
                ↗
              </div>

            </div>

          </motion.div>


          {/* Balance */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden glass-strong rounded-3xl p-6 min-h-[170px]"
          >

            <div className="relative flex items-start justify-between">

              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Balance
                </p>

                <h2 className={`text-3xl font-extrabold mt-3 ${
                  Number(data?.balance || 0) >= 0
                    ? "text-emerald-700"
                    : "text-red-600"
                }`}>
                  ₹{Number(data?.balance || 0).toFixed(2)}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  Income minus expenses
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300/20 flex items-center justify-center text-2xl">
                =
              </div>

            </div>

          </motion.div>


          {/* Monthly */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: 0.2
            }}

            whileHover={{
              y: -6
            }}

            className="
              relative
              overflow-hidden
              glass-strong
              rounded-3xl
              p-6
              min-h-[170px]
            "
          >

            <div className="
              absolute
              -top-16
              -right-16
              w-40
              h-40
              rounded-full
              bg-purple-400/20
              blur-3xl
            " />


            <div className="
              relative
              flex
              items-start
              justify-between
            ">

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  This Month
                </p>

                <h2 className="
                  text-3xl
                  font-extrabold
                  text-gray-900
                  mt-3
                ">
                  ₹{Number(
                    data?.monthly_expenses || 0
                  ).toFixed(2)}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  Current month spending
                </p>

              </div>


              <div className="
                w-12
                h-12
                rounded-2xl
                bg-purple-500/10
                border
                border-purple-300/20
                backdrop-blur-md
                flex
                items-center
                justify-center
                text-2xl
              ">
                📅
              </div>

            </div>

          </motion.div>


          {/* Today */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: 0.3
            }}

            whileHover={{
              y: -6
            }}

            className="
              relative
              overflow-hidden
              glass-strong
              rounded-3xl
              p-6
              min-h-[170px]
            "
          >

            <div className="
              absolute
              -top-16
              -right-16
              w-40
              h-40
              rounded-full
              bg-emerald-400/20
              blur-3xl
            " />


            <div className="
              relative
              flex
              items-start
              justify-between
            ">

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Today
                </p>

                <h2 className="
                  text-3xl
                  font-extrabold
                  text-gray-900
                  mt-3
                ">
                  ₹{Number(
                    data?.today_expenses || 0
                  ).toFixed(2)}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  Today's spending
                </p>

              </div>


              <div className="
                w-12
                h-12
                rounded-2xl
                bg-emerald-500/10
                border
                border-emerald-300/20
                backdrop-blur-md
                flex
                items-center
                justify-center
                text-2xl
              ">
                📌
              </div>

            </div>

          </motion.div>

        </div>


        {/* ================================
            Charts
        ================================= */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            delay: 0.4
          }}

          className="mt-7"
        >

          <ExpenseCharts
            categoryData={
              data?.category_breakdown || []
            }

            monthlyData={
              monthlyData || []
            }
          />

        </motion.div>


        {/* ================================
            Category Breakdown
        ================================= */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            delay: 0.5
          }}

          className="
            mt-7
            glass-strong
            rounded-3xl
            overflow-hidden
          "
        >

          <div className="p-6">

            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-indigo-500
            ">
              Analytics
            </p>

            <h2 className="
              text-xl
              font-bold
              text-gray-900
              mt-1
            ">
              Category Breakdown
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              See where your money is going
            </p>

          </div>


          {data?.category_breakdown?.length === 0 ? (

            <div className="
              px-6
              pb-8
              text-center
              text-gray-500
            ">
              No category data available.
            </div>

          ) : (

            <div className="px-6 pb-6 space-y-3">

              {data?.category_breakdown?.map(
                (item, index) => (

                  <motion.div

                    key={item.category}

                    initial={{
                      opacity: 0,
                      x: -20
                    }}

                    animate={{
                      opacity: 1,
                      x: 0
                    }}

                    transition={{
                      delay: 0.1 * index
                    }}

                    whileHover={{
                      x: 4
                    }}

                    className="
                      flex
                      items-center
                      justify-between
                      p-4
                      rounded-2xl
                      bg-white/30
                      border
                      border-white/40
                      hover:bg-white/45
                      transition
                    "
                  >

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <div className="
                        w-10
                        h-10
                        rounded-xl
                        bg-indigo-500/10
                        border
                        border-indigo-300/20
                        flex
                        items-center
                        justify-center
                      ">
                        📁
                      </div>

                      <span className="
                        font-semibold
                        text-gray-800
                      ">
                        {item.category}
                      </span>

                    </div>


                    <span className="
                      font-bold
                      text-gray-900
                    ">
                      ₹{Number(
                        item.total || 0
                      ).toFixed(2)}
                    </span>

                  </motion.div>

                )
              )}

            </div>

          )}

        </motion.div>


        {/* ================================
            Recent Expenses
        ================================= */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            delay: 0.6
          }}

          className="
            mt-7
            glass-strong
            rounded-3xl
            overflow-hidden
          "
        >

          <div className="
            p-6
            border-b
            border-white/40
          ">

            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-indigo-500
            ">
              Transactions
            </p>

            <h2 className="
              text-xl
              font-bold
              text-gray-900
              mt-1
            ">
              Recent Expenses
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest transactions
            </p>

          </div>


          {data?.recent_expenses?.length === 0 ? (

            <div className="
              p-10
              text-center
              text-gray-500
            ">

              <div className="text-4xl mb-3">
                🧾
              </div>

              No recent expenses.

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-white/20">

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      uppercase
                      tracking-wider
                      font-semibold
                      text-gray-500
                    ">
                      Category
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      uppercase
                      tracking-wider
                      font-semibold
                      text-gray-500
                    ">
                      Description
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      uppercase
                      tracking-wider
                      font-semibold
                      text-gray-500
                    ">
                      Date
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-right
                      text-xs
                      uppercase
                      tracking-wider
                      font-semibold
                      text-gray-500
                    ">
                      Amount
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data?.recent_expenses?.map(
                    (expense, index) => (

                      <motion.tr

                        key={expense.id}

                        initial={{
                          opacity: 0
                        }}

                        animate={{
                          opacity: 1
                        }}

                        transition={{
                          delay: 0.08 * index
                        }}

                        className="
                          border-t
                          border-white/30
                          hover:bg-white/30
                          transition
                        "
                      >

                        <td className="px-6 py-4">

                          <span className="
                            inline-flex
                            px-3
                            py-1.5
                            rounded-full
                            bg-indigo-500/10
                            border
                            border-indigo-300/20
                            text-sm
                            font-medium
                            text-indigo-700
                          ">
                            {expense.category}
                          </span>

                        </td>


                        <td className="
                          px-6
                          py-4
                          text-gray-600
                        ">
                          {expense.description || "-"}
                        </td>


                        <td className="
                          px-6
                          py-4
                          text-gray-500
                        ">
                          {expense.expense_date}
                        </td>


                        <td className="
                          px-6
                          py-4
                          text-right
                          font-bold
                          text-gray-900
                        ">
                          ₹{Number(
                            expense.amount || 0
                          ).toFixed(2)}
                        </td>

                      </motion.tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </motion.div>


      </div>

    </Layout>

  )
}


export default Dashboard