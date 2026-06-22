const {Router} = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { expenseModel } = require('../schema/db');

const expenseRouter = Router();

expenseRouter.get('/', function(req, res){
  res.json({
    message: "some message"
  })
})

expenseRouter.post('/', authMiddleware, async function(req, res){
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
      message:"Expense added successfully!",
      expenseId: expense._id
    })
  } catch(e) {
    res.json({
      message: e.message
    })
  }
})

expenseRouter.put('/:expenseId', authMiddleware, async function(req, res){
  const userId = req.userId;
  const expenseId = req.params.expenseId;

  try {
    await expenseModel.findOneAndUpdate(
      {
        _id: expenseId,
        userId: userId
      },
      req.body,
      {new: true}
    );

    res.json({
      message: "Expense updated Successfully!"
    });
  } catch(e) {
    res.json({
      message: e.message
    })
  }

})

expenseRouter.post('/delete', function(req, res){
  res.json({
    message: "some message"
  })
})

module.exports = {
  expenseRouter: expenseRouter
}