const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const movieSchema = new mongoose.Schema({
  title: String,
  teaser: String,
  description: String,
  director: String,
  // other fields
});

const Movie = mongoose.model('Movie', movieSchema);

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send('Please authenticate');
  }
};

app.get('/movies', authenticate, async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get('/movies/:id', authenticate, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
