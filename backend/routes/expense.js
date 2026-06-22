const { Router } = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { expenseModel } = require('../schema/db');

const expenseRouter = Router();

expenseRouter.post('/', authMiddleware, async function (req, res) {
  const userId = req.userId;
  const { title, amount, date, category, note } = req.body;

  try {
    const expense = await expenseModel.create({
      title: title,
      amount: amount,
      date: date,
      category: category,
      note: note,
      userId: userId
    });

    res.json({
      message: "Expense added successfully!",
      expenseId: expense._id
    })
  } catch (e) {
    res.json({
      message: e.message
    })
  }
})

expenseRouter.put('/:expenseId', authMiddleware, async function (req, res) {
  const userId = req.userId;
  const expenseId = req.params.expenseId;

  try {
    await expenseModel.findOneAndUpdate(
      {
        _id: expenseId,
        userId: userId
      },
      req.body,
      { new: true }
    );

    res.json({
      message: "Expense updated Successfully!"
    });
  } catch (e) {
    res.json({
      message: e.message
    })
  }

})

expenseRouter.delete('/:expenseId', authMiddleware, async function (req, res) {
  const userId = req.userId;
  const expenseId = req.params.expenseId;

  const deleted = await expenseModel.findOneAndDelete(
    {
      _id: expenseId,
      userId: userId
    }
  )

  if (deleted) {
    res.json({
      message: "expense deleted successfully!"
    })
  } else {
    res.status(403).json({
      message: "expense not found"
    })
  }
})

module.exports = {
  expenseRouter: expenseRouter
}