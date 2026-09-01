import { useEffect, useState } from "react"
import API from "../services/api"
import Layout from "../components/Layout"


function Expenses() {

  // =========================
  // Expense Data
  // =========================

  const [expenses, setExpenses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")


  // =========================
  // Add / Edit Form
  // =========================

  const [showForm, setShowForm] = useState(false)

  const [editingExpense, setEditingExpense] = useState(null)

  const [amount, setAmount] = useState("")

  const [category, setCategory] = useState("")

  const [description, setDescription] = useState("")

  const [expenseDate, setExpenseDate] = useState("")


  // =========================
  // Search / Filter / Sort
  // =========================

  const [search, setSearch] = useState("")

  const [filterCategory, setFilterCategory] = useState("")

  const [sortBy, setSortBy] = useState("")


  // =========================
  // Fetch Expenses
  // =========================

  const fetchExpenses = async () => {

    try {

      setLoading(true)

      setError("")

      const response = await API.get("/expenses/")

      setExpenses(response.data)

    } catch (error) {

      console.error(error)

      setError(
        error.response?.data?.detail ||
        "Unable to load expenses"
      )

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    fetchExpenses()

  }, [])


  // =========================
  // Add / Update Expense
  // =========================

  const handleAddExpense = async (e) => {

    e.preventDefault()

    try {

      const expenseData = {

        amount: Number(amount),

        category: category,

        description: description,

        expense_date: expenseDate

      }


      // UPDATE

      if (editingExpense) {

        await API.put(
          `/expenses/${editingExpense.id}`,
          expenseData
        )

      }

      // CREATE

      else {

        await API.post(
          "/expenses/",
          expenseData
        )

      }


      // Reset form

      setAmount("")

      setCategory("")

      setDescription("")

      setExpenseDate("")

      setEditingExpense(null)

      setShowForm(false)


      // Refresh expenses

      fetchExpenses()

    } catch (error) {

      console.error(error)

      alert(
        error.response?.data?.detail ||
        "Failed to save expense"
      )

    }

  }


  // =========================
  // Edit Expense
  // =========================

  const handleEdit = (expense) => {

    setEditingExpense(expense)

    setAmount(expense.amount)

    setCategory(expense.category)

    setDescription(expense.description || "")

    setExpenseDate(expense.expense_date)

    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }


  // =========================
  // Delete Expense
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    )


    if (!confirmDelete) {

      return

    }


    try {

      await API.delete(
        `/expenses/${id}`
      )


      setExpenses(
        expenses.filter(
          (expense) => expense.id !== id
        )
      )

    } catch (error) {

      console.error(error)

      alert(
        error.response?.data?.detail ||
        "Failed to delete expense"
      )

    }

  }


  // =========================
  // Cancel Edit
  // =========================

  const handleCancel = () => {

    setAmount("")

    setCategory("")

    setDescription("")

    setExpenseDate("")

    setEditingExpense(null)

    setShowForm(false)

  }


  // =========================
  // Search + Filter + Sort
  // =========================

  const filteredExpenses = expenses

    // Search
    .filter((expense) => {

      const searchText =
        search.toLowerCase().trim()


      if (!searchText) {

        return true

      }


      return (

        expense.category
          ?.toLowerCase()
          .includes(searchText)

        ||

        expense.description
          ?.toLowerCase()
          .includes(searchText)

      )

    })


    // Category Filter
    .filter((expense) => {

      if (!filterCategory) {

        return true

      }


      return (
        expense.category === filterCategory
      )

    })


    // Sorting
    .sort((a, b) => {

      if (sortBy === "high") {

        return (
          Number(b.amount) -
          Number(a.amount)
        )

      }


      if (sortBy === "low") {

        return (
          Number(a.amount) -
          Number(b.amount)
        )

      }


      if (sortBy === "newest") {

        return (
          new Date(b.expense_date) -
          new Date(a.expense_date)
        )

      }


      if (sortBy === "oldest") {

        return (
          new Date(a.expense_date) -
          new Date(b.expense_date)
        )

      }


      return 0

    })


  // =========================
  // Clear Filters
  // =========================

  const clearFilters = () => {

    setSearch("")

    setFilterCategory("")

    setSortBy("")

  }


  // =========================
  // UI
  // =========================

  return (

    <Layout>

      <div className="max-w-7xl mx-auto">


        {/* =========================
            Header
        ========================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-900">

              Expenses

            </h1>


            <p className="text-gray-500 mt-1">

              Manage your expenses

            </p>

          </div>


          <button

            onClick={() => {

              if (editingExpense) {

                handleCancel()

              } else {

                setShowForm(!showForm)

              }

            }}

            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"

          >

            {showForm
              ? "Close"
              : "+ Add Expense"
            }

          </button>

        </div>



        {/* =========================
            Add / Edit Form
        ========================== */}

        {showForm && (

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">


            <h2 className="text-xl font-bold mb-6">

              {editingExpense
                ? "Edit Expense"
                : "Add New Expense"
              }

            </h2>


            <form

              onSubmit={handleAddExpense}

              className="grid grid-cols-1 md:grid-cols-2 gap-5"

            >


              {/* Amount */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Amount

                </label>


                <input

                  type="number"

                  step="0.01"

                  min="0"

                  value={amount}

                  onChange={(e) =>
                    setAmount(e.target.value)
                  }

                  placeholder="Enter amount"

                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

                />

              </div>



              {/* Category */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Category

                </label>


                <select

                  value={category}

                  onChange={(e) =>
                    setCategory(e.target.value)
                  }

                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

                >

                  <option value="">

                    Select category

                  </option>


                  <option value="Food">

                    Food

                  </option>


                  <option value="Transport">

                    Transport

                  </option>


                  <option value="Shopping">

                    Shopping

                  </option>


                  <option value="Bills">

                    Bills

                  </option>


                  <option value="Entertainment">

                    Entertainment

                  </option>


                  <option value="Health">

                    Health

                  </option>


                  <option value="Education">

                    Education

                  </option>


                  <option value="Other">

                    Other

                  </option>

                </select>

              </div>



              {/* Description */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Description

                </label>


                <input

                  type="text"

                  value={description}

                  onChange={(e) =>
                    setDescription(e.target.value)
                  }

                  placeholder="Example: Lunch"

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

                />

              </div>



              {/* Date */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Date

                </label>


                <input

                  type="date"

                  value={expenseDate}

                  onChange={(e) =>
                    setExpenseDate(e.target.value)
                  }

                  required

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

                />

              </div>



              {/* Buttons */}

              <div className="md:col-span-2 flex gap-3">


                <button

                  type="submit"

                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"

                >

                  {editingExpense
                    ? "Update Expense"
                    : "Save Expense"
                  }

                </button>


                {editingExpense && (

                  <button

                    type="button"

                    onClick={handleCancel}

                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"

                  >

                    Cancel

                  </button>

                )}

              </div>

            </form>

          </div>

        )}



        {/* =========================
            Search & Filters
        ========================== */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


            {/* Search */}

            <input

              type="text"

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              placeholder="🔍 Search expenses..."

              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

            />



            {/* Category */}

            <select

              value={filterCategory}

              onChange={(e) =>
                setFilterCategory(e.target.value)
              }

              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

            >

              <option value="">

                All Categories

              </option>


              <option value="Food">

                Food

              </option>


              <option value="Transport">

                Transport

              </option>


              <option value="Shopping">

                Shopping

              </option>


              <option value="Bills">

                Bills

              </option>


              <option value="Entertainment">

                Entertainment

              </option>


              <option value="Health">

                Health

              </option>


              <option value="Education">

                Education

              </option>


              <option value="Other">

                Other

              </option>

            </select>



            {/* Sort */}

            <select

              value={sortBy}

              onChange={(e) =>
                setSortBy(e.target.value)
              }

              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"

            >

              <option value="">

                Sort By

              </option>


              <option value="high">

                Amount: High → Low

              </option>


              <option value="low">

                Amount: Low → High

              </option>


              <option value="newest">

                Date: Newest

              </option>


              <option value="oldest">

                Date: Oldest

              </option>

            </select>

          </div>



          {/* Filter Result + Clear */}

          <div className="flex items-center justify-between mt-4">


            <p className="text-sm text-gray-500">

              Showing {filteredExpenses.length} of{" "}
              {expenses.length} expenses

            </p>


            {(search ||
              filterCategory ||
              sortBy) && (

              <button

                onClick={clearFilters}

                className="text-sm font-medium text-red-600 hover:underline"

              >

                Clear Filters

              </button>

            )}

          </div>

        </div>



        {/* =========================
            Error
        ========================== */}

        {error && (

          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">

            {error}

          </div>

        )}



        {/* =========================
            Expense Table
        ========================== */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">


          <div className="p-6 border-b">

            <h2 className="text-xl font-bold">

              All Expenses

            </h2>

          </div>



          {loading ? (

            <div className="p-10 text-center text-gray-500">

              Loading expenses...

            </div>

          ) : filteredExpenses.length === 0 ? (

            <div className="p-10 text-center">


              <p className="text-gray-500">

                {expenses.length === 0
                  ? "No expenses found."
                  : "No expenses match your filters."
                }

              </p>


              {expenses.length === 0 && (

                <button

                  onClick={() =>
                    setShowForm(true)
                  }

                  className="mt-4 text-black font-semibold hover:underline"

                >

                  Add your first expense

                </button>

              )}

            </div>

          ) : (

            <div className="overflow-x-auto">


              <table className="w-full">


                <thead className="bg-gray-50">


                  <tr>


                    <th className="px-6 py-4 text-left text-sm font-semibold">

                      Category

                    </th>


                    <th className="px-6 py-4 text-left text-sm font-semibold">

                      Description

                    </th>


                    <th className="px-6 py-4 text-left text-sm font-semibold">

                      Date

                    </th>


                    <th className="px-6 py-4 text-right text-sm font-semibold">

                      Amount

                    </th>


                    <th className="px-6 py-4 text-center text-sm font-semibold">

                      Action

                    </th>


                  </tr>

                </thead>



                <tbody>


                  {filteredExpenses.map(
                    (expense) => (

                      <tr

                        key={expense.id}

                        className="border-t hover:bg-gray-50"

                      >


                        <td className="px-6 py-4 font-medium">

                          {expense.category}

                        </td>


                        <td className="px-6 py-4 text-gray-500">

                          {expense.description || "-"}

                        </td>


                        <td className="px-6 py-4 text-gray-500">

                          {expense.expense_date}

                        </td>


                        <td className="px-6 py-4 text-right font-semibold">

                          ₹
                          {Number(
                            expense.amount
                          ).toFixed(2)}

                        </td>


                        <td className="px-6 py-4">


                          <div className="flex items-center justify-center gap-4">


                            <button

                              onClick={() =>
                                handleEdit(expense)
                              }

                              className="text-blue-600 hover:text-blue-800 font-medium"

                            >

                              Edit

                            </button>


                            <button

                              onClick={() =>
                                handleDelete(
                                  expense.id
                                )
                              }

                              className="text-red-600 hover:text-red-800 font-medium"

                            >

                              Delete

                            </button>


                          </div>

                        </td>


                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </Layout>

  )

}


export default Expenses