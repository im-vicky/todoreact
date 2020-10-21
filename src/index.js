import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const DATA = [
    { id: "todo-0", name:"Eat", completed: true }
]

ReactDOM.render(<App tasks={DATA}/>, document.getElementById('root'));