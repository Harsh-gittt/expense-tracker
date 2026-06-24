import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EditExpense from './EditExpense';
const XpenseList = () => {

  
    const navigate = useNavigate()
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/user/",
                    {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    }
                );

               setExpenses(response.data.expenses);
            } catch (error) {
                console.error(error);
            }
        };

        fetchExpenses();
    }, []);


    

    const [expenses, setExpenses] = useState([]);
    const [showCard, setShowCard] = useState(false);
    const [editCard, setEditCard] = useState(false)

    const addExpense = (expense) => {
        setExpenses((prev) => [...prev, expense]);
    };

    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
    );

    const deleteExpense = async(id) => {
       
          const response = await axios.delete(`http://localhost:3000/expense/${id}`,
            {
                headers: {
                    Authorization : localStorage.getItem("token")
                }
            }
          )
          if(response){
            navigate("/user/")
            console.log(response.data)
            setExpenses(expenses.filter(expense => expense._id !== id));
          }
    };
    const editHandler = (e) =>{
        setEditCard(true)

    }
    return (<div className="min-h-screen bg-gray-100 p-6">
        {/* Sticky Header */} <div className="sticky top-0 z-10 bg-gray-100 pb-6"> <div className="flex items-center justify-between mb-6"> <h1 className="text-3xl font-bold text-gray-800">
            Expense Dashboard </h1>

            <button
                onClick={() => setShowCard(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 cursor-pointer"
            >
                + Add Expense
            </button>
        </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
                    <p className="text-sm opacity-90">Total Expenses</p>
                    <h2 className="text-3xl font-bold mt-2">
                        ₹{totalExpenses.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg">
                    <p className="text-sm opacity-90">This Month</p>
                    <h2 className="text-3xl font-bold mt-2">
                        ₹{totalExpenses.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg">
                    <p className="text-sm opacity-90">Total Transactions</p>
                    <h2 className="text-3xl font-bold mt-2">
                        {expenses.length}
                    </h2>
                </div>
            </div>
        </div>

        {/* Add Expense Modal */}
        {showCard && (
            <Card
                onClose={() => setShowCard(false)}
                onAddExpense={addExpense}
            />
        
        )}
        {
            setEditCard&&(
                <EditExpense 
                  onClose={() => setEditCard(false)}/>
            )
        }

        {/* Expense Table */}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">

            {/* Sticky Header */}
            <div className="grid grid-cols-5 bg-gray-900 text-white p-4 font-semibold sticky top-0 z-20">
                <div>Expense</div>
                <div>Category</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Actions</div>
            </div>

            {/* Scrollable Body */}
            <div className="max-h-125 overflow-y-auto">
                {expenses.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No expenses added yet.
                    </div>
                ) : (
                    expenses.map((expense) => (
                        <div
                            key={expense._id}
                            className="grid grid-cols-5 items-center p-4 border-b hover:bg-gray-50 transition-all duration-200"
                        >
                            <div className="font-semibold text-gray-800">
                                {expense.title}
                            </div>

                            <div>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                    {expense.category}
                                </span>
                            </div>

                            <div className="font-bold text-red-500">
                                ₹{expense.amount}
                            </div>

                            <div className="text-gray-500">
                                {expense.date}
                            </div>

                            <div className="flex gap-2">
                                <button onClick={()=>editHandler(expense._id)}
                                className="bg-yellow-400 px-3 py-1 rounded-lg">
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteExpense(expense._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>

    );
};

export default XpenseList;
