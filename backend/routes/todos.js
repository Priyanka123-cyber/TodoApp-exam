const express = require('express');
const router = express.Router();
const Todo = require('../model/todo_model');

router.post('/todos', async (req, res) => {
    try {
      const { task } = req.body;
      const newTodo = new Todo({ task });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  router.put('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
      res.json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.delete('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Todo.findByIdAndDelete(id);
      res.json({ msg: 'Todo deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

module.exports=router