// app.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost/money_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your MongoDB schema and model here (see step 4)

// Routes (see step 5)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.js

const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);


// app.js

app.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.render('index', { expenses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/addExpense', async (req, res) => {
  const { category, amount } = req.body;

  try {
    await Expense.create({ category, amount });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
