import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoView from './components/TodoListView';

function App() {

  const [todoList, setTodoList] = useState([{}])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  //read all todos
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
      .then(res => {
        setTodoList(res.data)
      })
  });

  //post a todo
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo', {'title': title, 'description': desc})
    .then(res => console.log(res))
  };

  return (
    <div className='App list-group-item justify-content-center align-items-center mx-auto items-div' >
      <h1 className='card text-white bg-primary mb-1'>
        Task Manager
      </h1>
      <h6 className='card text-white bg-primary mb-3'>FastAPI - React - MongoDB</h6>
      <div className='card-body'>
        <h5 className='card text-white bg-dark mb-3'>Add your task</h5>
        <span className='card-text'>
          <input className='mb-2 form-control title-in' onChange={event => setTitle(event.target.value) } placeholder='Title' />
          <input className='mb-2 form-control desc-in' onChange={event => setDesc(event.target.value)} placeholder='Description' />
          <button className='btn btn-outline-primary mx-2 mb-3 my-btn' onClick={addTodoHandler}>Add Task</button>
        </span>
        <h5 className='card text-white bg-dark mb-3'>Your Tasks</h5>
        <div>
          <TodoView todoList={todoList} />
        </div>
      </div>
      <h6 className='card text-dark bg-warning py-1 mb-0'>&copy; 2023. Cheers.</h6>
    </div>
    
  );
}

export default App;
