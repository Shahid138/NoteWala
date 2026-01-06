const { default: mongoose } = require("mongoose");
const Note = require("../models/notesModel");

// Get all notes
const getNotes = async (req, res) => {
  const user_id = req.user._id;
  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

// Get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Note exists" });
  }

  const note = await Note.findById(id);

  if (!note) return res.status(404).json({ error: "No such not exists" });

  res.status(200).json(note);
};

// Create a note
const createNote = async (req, res) => {
  const { title, snippet, body } = req.body;
  const user_id = req.user._id;
  let emptyField = [];

  if (!title) {
    emptyField.push("title");
  } else if (!snippet) {
    emptyField.push("snippet");
  } else if (!body) {
    emptyField.push("body");
  } else if (emptyField.length > 0) {
    return res.status(400).json({ error: "Please fill in all the flieds" });
  }

  try {
    const note = await Note.create({ title, snippet, body, user_id });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Note exists" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(404).json({ error: "No such Note exists" });
  }

  res.status(200).json(note);
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Note exists" });
  }
  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!note) return res.status(404).json({ error: "No such not exists" });
  res.status(200).json(note);
};

module.exports = { createNote, getNotes, getNote, deleteNote, updateNote };
