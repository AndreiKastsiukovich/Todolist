import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type ButtonNameType = 'All'|'Active'|'Completed'

function App() {

    let [tasks1,SetTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ])

    const removeTasks = (id:number) => {
        let removingTasks = tasks1.filter((el)=>el.id !== id)
            SetTasks(removingTasks)
    }


    let [buttonName,SetButtonName] = useState('All')

    let filteringTasks = tasks1

     const filterTasks = (buttonName:ButtonNameType) => {
         SetButtonName(buttonName)
     }

     if (buttonName === 'All'){
         filteringTasks = tasks1
     }
     if (buttonName === 'Completed'){
         filteringTasks = tasks1.filter((el)=>el.isDone == true)
     }
    if (buttonName === 'Active'){
        filteringTasks = tasks1.filter((el)=>el.isDone == false)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteringTasks}
                      removeTasks={removeTasks}
                      filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
