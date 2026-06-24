import { useState } from "react";
import axios from "axios";

const Card = ({ onClose, onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  const clickhandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/expense/",
        {
          title,
          amount,
          date,
          category,
          note,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      const newExpense =
        response.data.expense ||
        response.data.data ||
        (response.data.expenseId && {
          _id: response.data.expenseId,
          title,
          amount,
          date,
          category,
          note,
        });

      if (newExpense?._id) {
        onAddExpense(newExpense);
      }

      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to add expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Add Expense</h2>

          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-500 hover:text-black"
          >
            &times;
          </button>
        </div>

        <form onSubmit={clickhandler} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter expense title"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Amount
              </label>

              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Enter amount"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Date
              </label>

              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Food</option>
                <option>Bills</option>
                <option>Fun</option>
                <option>Ration</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Note
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="3"
              placeholder="Add a note..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
