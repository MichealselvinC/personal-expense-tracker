import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import API from "../services/api"
import Layout from "../components/Layout"


function Income() {
  const [income, setIncome] = useState([])
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")
  const [incomeDate, setIncomeDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchIncome = async () => {
    try {
      const response = await API.get("/income/")
      setIncome(response.data)
    } catch (error) {
      toast.error(error.response?.data?.detail || "Unable to load income")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncome()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    try {
      await API.post("/income/", {
        amount: Number(amount),
        source,
        description,
        income_date: incomeDate
      })

      setAmount("")
      setSource("")
      setDescription("")
      setIncomeDate("")
      toast.success("Income added successfully!")
      await fetchIncome()
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to save income")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) {
      return
    }

    try {
      await API.delete(`/income/${id}`)
      setIncome((items) => items.filter((item) => item.id !== id))
      toast.success("Income deleted successfully!")
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to delete income")
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Income</h1>
            <p className="text-gray-500 mt-1">Record money you receive</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Add Income</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input type="number" step="0.01" min="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount" required className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Source</label>
              <input type="text" value={source} onChange={(event) => setSource(event.target.value)} placeholder="Salary, freelance, gift" required className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Optional note" className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input type="date" value={incomeDate} onChange={(event) => setIncomeDate(event.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" />
            </div>

            <button type="submit" disabled={saving} className="md:col-span-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
              {saving ? "Saving..." : "Add Income"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-5">Income History</h2>
          {loading ? (
            <p className="text-gray-500">Loading income...</p>
          ) : income.length === 0 ? (
            <p className="text-gray-500">No income recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {income.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{item.source}</p>
                    <p className="text-sm text-gray-500">{item.description || "No description"} · {item.income_date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-emerald-700">+₹{Number(item.amount).toFixed(2)}</span>
                    <button onClick={() => handleDelete(item.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}


export default Income