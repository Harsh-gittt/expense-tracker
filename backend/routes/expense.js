const {Router} = require('express');

const expenseRouter = Router();

expenseRouter.get('/', function(req, res){
  res.json({
    message: "some message"
  })
})

expenseRouter.post('/', function(req, res){
  res.json({
    message: "some message"
  })
})

expenseRouter.put('/', function(req, res){
  res.json({
    message: "some message"
  })
})

expenseRouter.post('/delete', function(req, res){
  res.json({
    message: "some message"
  })
})

module.exports = {
  expenseRouter: expenseRouter
}