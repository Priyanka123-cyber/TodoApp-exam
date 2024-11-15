import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

const Home = () => {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3020/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const AddTodo = async () => {
    console.log('Adding todo');
    try {
      await axios.post('http://localhost:3020/api/todos', { task });
      getTodos();
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


  const UpdateTodo = async (id) => {
    try {
      await axios.put(`http://localhost:3020/api/todos/${id}`, { completed: true });
      getTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  const DeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3020/api/todos/${id}`);
      getTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  return (
    <div>
     <Typography variant="h3" component="h2">Todo List App</Typography><br /><br />
      <div>
        <TextField id="outlined-basic"  variant="outlined" value={task} onChange={(e) => setTask(e.target.value)} sx={{marginRight:'3px'}} />
        <Button sx={{backgroundColor:'#526E48'}} variant="contained" onClick={AddTodo}>Add Todo</Button>
        
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} : {todo.completed ? 'Completed' : 'Ongoing'}
            {!todo.completed && (
              <>
                <button onClick={() => UpdateTodo(todo._id)}>Completed</button>
                <button onClick={() => DeleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      




    </div>
  )
}

export default Home
