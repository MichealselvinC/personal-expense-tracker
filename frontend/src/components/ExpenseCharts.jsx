import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

import { motion } from "framer-motion"


function ExpenseCharts({
  categoryData = [],
  monthlyData = []
}) {


  // ================================
  // Pie Chart Data
  // ================================

  const pieData = categoryData.map((item) => ({

    name: item.category,

    value: Number(item.total || 0)

  }))


  // ================================
  // Monthly Data
  // ================================

  const barData = monthlyData.map((item) => ({

    month:
      item.month ||
      item.name ||
      item.label ||
      "",

    total:
      Number(
        item.total ||
        item.amount ||
        item.expenses ||
        0
      )

  }))


  // ================================
  // Custom Tooltip
  // ================================

  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {

    if (!active || !payload || !payload.length) {
      return null
    }


    return (

      <div className="
        bg-gray-950/90
        backdrop-blur-xl
        border
        border-white/10
        rounded-xl
        px-4
        py-3
        shadow-2xl
        text-white
      ">

        {label && (

          <p className="
            text-xs
            text-gray-400
            mb-1
          ">
            {label}
          </p>

        )}

        <p className="
          font-bold
          text-sm
        ">
          ₹{Number(
            payload[0].value || 0
          ).toFixed(2)}
        </p>

      </div>

    )

  }


  // ================================
  // Empty State
  // ================================

  if (
    pieData.length === 0 &&
    barData.length === 0
  ) {

    return (

      <div className="
        glass-strong
        rounded-3xl
        p-10
        text-center
      ">

        <div className="text-4xl mb-3">
          📊
        </div>

        <h3 className="
          font-bold
          text-gray-800
        ">
          No analytics available
        </h3>

        <p className="
          text-sm
          text-gray-500
          mt-1
        ">
          Add some expenses to see your spending analytics.
        </p>

      </div>

    )

  }


  return (

    <div className="
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-6
    ">


      {/* ================================
          Category Chart
      ================================= */}

      <motion.div

        whileHover={{
          y: -3
        }}

        className="
          glass-strong
          rounded-3xl
          p-6
          min-h-[430px]
        "
      >

        <div className="mb-4">

          <p className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-indigo-500
          ">
            Distribution
          </p>

          <h2 className="
            text-xl
            font-bold
            text-gray-900
            mt-1
          ">
            Spending by Category
          </h2>

          <p className="
            text-sm
            text-gray-500
            mt-1
          ">
            Breakdown of your expenses
          </p>

        </div>


        {pieData.length === 0 ? (

          <div className="
            h-[300px]
            flex
            items-center
            justify-center
            text-gray-500
          ">
            No category data
          </div>

        ) : (

          <div className="
            h-[320px]
            w-full
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <defs>

                  <linearGradient
                    id="pieGradient1"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                    />

                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                    />

                  </linearGradient>


                  <linearGradient
                    id="pieGradient2"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#06b6d4"
                    />

                    <stop
                      offset="100%"
                      stopColor="#3b82f6"
                    />

                  </linearGradient>


                  <linearGradient
                    id="pieGradient3"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#10b981"
                    />

                    <stop
                      offset="100%"
                      stopColor="#14b8a6"
                    />

                  </linearGradient>


                  <linearGradient
                    id="pieGradient4"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#f59e0b"
                    />

                    <stop
                      offset="100%"
                      stopColor="#f97316"
                    />

                  </linearGradient>


                  <linearGradient
                    id="pieGradient5"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#ec4899"
                    />

                    <stop
                      offset="100%"
                      stopColor="#f43f5e"
                    />

                  </linearGradient>

                </defs>


                <Pie

                  data={pieData}

                  dataKey="value"

                  nameKey="name"

                  cx="50%"

                  cy="48%"

                  innerRadius={65}

                  outerRadius={105}

                  paddingAngle={3}

                  cornerRadius={7}

                  stroke="rgba(255,255,255,0.8)"

                  strokeWidth={3}

                  isAnimationActive={true}

                  animationDuration={900}
                >

                  {pieData.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          `url(#pieGradient${
                            (index % 5) + 1
                          })`
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip
                  content={<CustomTooltip />}
                />


                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )}

      </motion.div>


      {/* ================================
          Monthly Chart
      ================================= */}

      <motion.div

        whileHover={{
          y: -3
        }}

        className="
          glass-strong
          rounded-3xl
          p-6
          min-h-[430px]
        "
      >

        <div className="mb-4">

          <p className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-purple-500
          ">
            Trend
          </p>

          <h2 className="
            text-xl
            font-bold
            text-gray-900
            mt-1
          ">
            Monthly Spending
          </h2>

          <p className="
            text-sm
            text-gray-500
            mt-1
          ">
            Your spending trend over time
          </p>

        </div>


        {barData.length === 0 ? (

          <div className="
            h-[300px]
            flex
            items-center
            justify-center
            text-gray-500
          ">
            No monthly data
          </div>

        ) : (

          <div className="
            h-[320px]
            w-full
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={barData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5
                }}
              >

                <defs>

                  <linearGradient
                    id="barGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                    />

                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                    />

                  </linearGradient>

                </defs>


                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="rgba(100,116,139,0.18)"
                  vertical={false}
                />


                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 12
                  }}
                />


                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 12
                  }}

                  tickFormatter={(value) =>
                    `₹${value}`
                  }
                />


                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    fill: "rgba(99,102,241,0.06)"
                  }}
                />


                <Bar
                  dataKey="total"
                  fill="url(#barGradient)"
                  radius={[
                    8,
                    8,
                    2,
                    2
                  ]}
                  maxBarSize={55}
                  isAnimationActive={true}
                  animationDuration={900}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

      </motion.div>


    </div>

  )
}


export default ExpenseCharts