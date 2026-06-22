const {Router} = require('express');
const {z} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel, expenseModel} = require('../schema/db.js');
const { authMiddleware } = require('../middlewares/auth.js');
const expense = require('./expense.js');

const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post('/signup', async function(req, res){
  const { email, password, name } = req.body;

  const format = z.object({
    email: z.string().min(5).max(100).email(),
    password: z.string().min(6).max(30),
    name: z.string().min(2).max(100)
  });

  const parsedBody = format.safeParse(req.body);

  if(!parsedBody.success){
    res.json({
      error: parsedBody.error.issues[0].message
    })
    return;
  }

  try{
    const hashedPass = await bcrypt.hash(password, 5);

    await userModel.create({
      email: email,
      password: hashedPass,
      name: name
    });

    res.json({
      message: "Sign up successfull"
    })
  } catch (e) {
    res.json({
      message: "User already exists"
    })
  }
})

userRouter.post('/signin', async function(req, res){
  const { email, password } = req.body;

  const format = z.object({
    email: z.string().min(5).max(100).email(),
    password: z.string().min(6).max(30)
  });

  const parsedBody = format.safeParse(req.body);

  if(!parsedBody.success){
    res.json({
      error: parsedBody.error.issues[0].message
    })
    return;
  }

  const user = await userModel.findOne({
    email: email
  })

  if(user){
    const passMatch = bcrypt.compare(password, user.password);

    if(passMatch){
      const token = jwt.sign({
        id: user._id
      }, JWT_SECRET);

      res.json({
        token: token
      });
    } else {
      res.status(403).json({
        message: "Invalid credentials"
      })
    }
  } else {
    res.json({
      message: "Sign up first"
    })
  }

})

userRouter.get('/', authMiddleware, async function(req, res){
  const userId = req.userId;

  const expenses = await expenseModel.find({
    userId: userId
  })

  res.json({
    message: "These are all your expenses- ",
    expenses: expenses
  })
})

module.exports = {
  userRouter: userRouter
}