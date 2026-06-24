import { useState } from "react";
import axios from "axios";

const EditExpense = ({ expense, onClose, onUpdate }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(expense.date);
  const [category, setCategory] = useState(expense.category);
  const [note, setNote] = useState(expense.note || "");

  const clickhandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/expense/${expense._id}`,
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

      const updatedExpense = {
        ...expense,
        title,
        amount,
        date,
        category,
        note,
      };

      onUpdate(updatedExpense);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Edit Expense</h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl cursor-pointer"
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
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Amount
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
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
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
