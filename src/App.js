import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import './App.css'

const App = (props) => {

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

   function addTask(name){
        const newTask = {id: "todo-"+ nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
   }
   function toggleTaskCompleted(id){
       const updatedTask = tasks.map(task => {
           if(id === task.id){
               return {...tasks, completed: !task.completed}
           }
           return task;
       });
       setTasks(updatedTask);
   }
   function deleteTask(id){
       const remainingTasks = tasks.filter(task => id !== task.id);
       setTasks(remainingTasks);
   }
   function editTask(id, newName){
        const editTaskList = tasks.map( task => {
            if(id === task.id){
                return {...task, name: newName};
            }
            return task;
        });
        setTasks(editTaskList);
   }
   const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
   const headingText = `${taskList.length} ${tasksNoun} remaining`;
    return (
        <div className="todoapp stack-large">
      <h1>Todo App</h1>
      <Form addTask = {addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
    );
}

export default App
