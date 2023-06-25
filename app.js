const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

(async () => {
  try {
    await mongoose.connect('mongodb://localhost/bookCollectionDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
})();

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedYear: Number
});

const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => res.send('API is running'));

// GET: Retrieve all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});

// GET: Retrieve a book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve the book' });
  }
});

// POST: Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add the book' });
  }
});

// PUT: Update a book by ID
app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(updatedBook);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the book' });
  }
});

// DELETE: Delete a book by ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json({ message: 'Book deleted' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the book' });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
