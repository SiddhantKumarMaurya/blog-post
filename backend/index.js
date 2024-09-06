// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all posts
app.get('/posts', (req, res) => {
    db.all('SELECT * FROM Post', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ posts: rows });
    });
});

// GET a single post by ID
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM Post WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ post: row });
    });
});

// POST create a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ error: 'Title and content are required' });
        return;
    }
    db.run('INSERT INTO Post (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, content });
    });
});

// PUT update a post by ID
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title || !content) {
        res.status(400).json({ error: 'Title and content are required' });
        return;
    }
    
    db.run('UPDATE Post SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ updatedID: id, title, content });
    });
});

// DELETE a post by ID
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Post WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
