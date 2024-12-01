import './App.css';
import Add from './Add.js';
import Display from "./Display.js";
import { useState,useEffect } from 'react';

function App() {
  const [initialTasks, setiniTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [oritasks, setOritasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/fetch', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setiniTasks(data); // Update tasks state with fetched data
      setTasks(data);
      setOritasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    

    fetchTasks(); // Call fetchTasks when component mounts
  }, []);
  
  console.log(initialTasks,tasks);

  function sendAll() {
    setTasks(oritasks);
  }

  function sendDone() {
    const doneTasks = oritasks.filter(task => task.isDone);
    setTasks(doneTasks);
  }

  function sendTodo() {
    const todoTasks = oritasks.filter(task => !task.isDone);
    setTasks(todoTasks);
  }

  const handleAddTask = () => {
    fetchTasks();
  };

  const handleDeleteTask = (taskId) => {
    console.log(taskId);
    fetch('http://localhost:5000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskId }) 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
     
      fetchTasks();
    })
    .catch(error => console.error('Error:', error));
};

  const handleEditTask = (updatedTask) => {
    fetch('http://localhost:5000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskId : updatedTask.id , newTask : updatedTask}) // Convert taskId to JSON string
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // If you need to fetch tasks after deletion, call fetchTasks() here
      fetchTasks();
    })
    .catch(error => console.error('Error:', error));
  };
  function deleteAll(){
    fetch('http://localhost:5000/deleteall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      fetchTasks();
    })
    .catch(error => console.error('Error:', error));
  }
  function deleteDone(){
    fetch('http://localhost:5000/deletedone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      fetchTasks();
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className="container my-5 p-5 bg-white rounded">
      <center>
        <h1>Todo App</h1>
        <Add t={tasks} fetchAgain={handleAddTask} />
        <button className="btn btn-primary m-1" onClick={sendAll}>All</button>
        <button className="btn btn-primary m-1" onClick={sendDone}>Done</button>
        <button className="btn btn-primary m-1" onClick={sendTodo}>Todo</button>
        <Display t={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        <button className="btn btn-danger m-3" onClick={deleteAll}>Delete All</button>
        <button className="btn btn-danger m-3" onClick={deleteDone}>Delete Done</button>
      </center>
    </div>
  );
}

export default App;