import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";


function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard(token);
                setDashboard(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [token]);


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }


    if (!dashboard) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Unable to load dashboard.</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Expense Dashboard
            </h1>


            {/* Summary Cards */}

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">
                        Total Expenses
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        ₹{dashboard.total_expenses}
                    </h2>
                </div>


                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">
                        This Month
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        ₹{dashboard.monthly_expenses}
                    </h2>
                </div>


                <div className="rounded-xl bg-white p-6 shadow">
                    <p className="text-gray-500">
                        Today
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        ₹{dashboard.today_expenses}
                    </h2>
                </div>

            </div>


            {/* Category Breakdown */}

            <div className="mt-8 rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Category Breakdown
                </h2>

                <div className="space-y-3">

                    {dashboard.category_breakdown.map(
                        (item) => (
                            <div
                                key={item.category}
                                className="flex justify-between border-b pb-2"
                            >
                                <span>
                                    {item.category}
                                </span>

                                <span className="font-semibold">
                                    ₹{item.total}
                                </span>
                            </div>
                        )
                    )}

                </div>

            </div>


            {/* Recent Expenses */}

            <div className="mt-8 rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Recent Expenses
                </h2>

                <div className="space-y-3">

                    {dashboard.recent_expenses.map(
                        (expense) => (
                            <div
                                key={expense.id}
                                className="flex items-center justify-between border-b pb-3"
                            >

                                <div>
                                    <p className="font-medium">
                                        {expense.category}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {expense.description}
                                    </p>
                                </div>

                                <p className="font-semibold">
                                    ₹{expense.amount}
                                </p>

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>
    );
}


export default Dashboard;