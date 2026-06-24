import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import EditExpense from "./EditExpense";

const XpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
    
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense._id === updatedExpense._id
          ? updatedExpense
          : expense
      )
    );
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/expense/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Expense Dashboard
        </h1>

        <button
          onClick={() => setShowCard(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          + Add Expense
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-500 text-white p-6 rounded-xl">
          <p>Total Expenses</p>

          <h2 className="text-3xl font-bold">
            &#8377;{totalExpenses}
          </h2>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl">
          <p>This Month</p>

          <h2 className="text-3xl font-bold">
            &#8377;{totalExpenses}
          </h2>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl">
          <p>Total Transactions</p>

          <h2 className="text-3xl font-bold">
            {expenses.length}
          </h2>
        </div>
      </div>

      {/* Add Expense Modal */}

      {showCard && (
        <Card
          onClose={() => setShowCard(false)}
          onAddExpense={addExpense}
        />
      )}

      {/* Edit Expense Modal */}

      {editExpense && (
        <EditExpense
          expense={editExpense}
          onClose={() => setEditExpense(null)}
          onUpdate={updateExpense}
        />
      )}

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-900 text-white p-4 font-semibold">
          <div>Expense</div>
          <div>Category</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {expenses.map((expense, index) => (
          <div
            key={expense._id?.toString() || expense.id || index}
            className="grid grid-cols-5 p-4 border-b items-center"
          >
            <div>{expense.title}</div>

            <div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {expense.category}
              </span>
            </div>

            <div className="text-red-500 font-bold">
              &#8377;{expense.amount}
            </div>

            <div>{expense.date}</div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditExpense(expense)}
                className="bg-yellow-400 px-3 py-1 rounded-lg cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteExpense(expense._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XpenseList;
