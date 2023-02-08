import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type ButtonNameType = 'All'| 'Active' |'Completed'

function App() {

    let [tasks1,SetTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "ReactJS", isDone: false },
        { id: 5, title: "ReactJS", isDone: false }
    ])

    let removeTask = tasks1
    const removeTasks = (id:number) => {
        removeTask = tasks1.filter((el)=>el.id !== id)
        SetTasks(removeTask)
    }

    let [buttonName,SetButtonName] = useState<ButtonNameType>('All')

    const filterTask = (buttonName:ButtonNameType) => {
        SetButtonName(buttonName)
    }

    let filterTasks = tasks1

    if (buttonName === 'All') {
        filterTasks = tasks1
    }
    if (buttonName === 'Active') {
        filterTasks = tasks1.filter((el) => el.isDone == false)
    }
    if (buttonName === 'Completed') {
        filterTasks = tasks1.filter((el) => el.isDone == true)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filterTasks}
                      removeTasks={removeTasks}
                      filterTask={filterTask}
            />
        </div>
    );
}

export default App;
