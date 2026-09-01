import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"


function ExpenseCharts({ categoryData, monthlyData }) {

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


      {/* Category Chart */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Spending by Category
        </h2>


        {categoryData.length === 0 ? (

          <div className="h-72 flex items-center justify-center text-gray-500">
            No data available
          </div>

        ) : (

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {categoryData.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>


      {/* Monthly Chart */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Monthly Spending
        </h2>


        {monthlyData.length === 0 ? (

          <div className="h-72 flex items-center justify-center text-gray-500">
            No data available
          </div>

        ) : (

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={monthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </div>

  )
}


export default ExpenseCharts