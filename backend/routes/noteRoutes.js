const express = require('express');
const {createNote, getNotes, getNote, deleteNote, updateNote } = require('../controllers/noteController')
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')


// Auth protected middleware for all routes
router.use(requireAuth);

// All notes
router.get("/", getNotes);

// Fetch a note
router.get("/:id", getNote);

// Post a note
router.post("/", createNote);

// Delete a note
router.delete("/:id", deleteNote);

// Update a note
router.patch("/:id", updateNote);

module.exports = router;
