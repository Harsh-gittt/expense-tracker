import React, { useState } from 'react'
import axios from 'axios';

const Card = () => {


  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  async function clickhandler(e) {
    e.preventDefault();
    console.log(localStorage.getItem("token"))
    const response = await axios.post(
    "http://localhost:3000/expense/",
    {
      title: title,
      amount: amount,
      date: date,
      category: category,
      note: note
    },
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }
  );
    console.log(response.data)
  }
  return (
    <div>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-5">Add Expense</h2>

        <form className="space-y-4">

          <div className='flex gap-4'>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter expense title"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Enter amount"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className='flex justify-between'>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input onChange={(e) => setDate(e.target.value)}
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Note <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea onChange={(e) => setNote(e.target.value)}
              rows="3"
              placeholder="Add a note..."
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button onClick={clickhandler}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition active:scale-95 cursor-pointer"
          >
            Add Expense
          </button>

        </form>
      </div>
    </div>
  )
}

export default Card
