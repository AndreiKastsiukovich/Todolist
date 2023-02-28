import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id:string,
    title:string,
    filter:FilterValuesType
}

type TasksStateType = {
    [todoLostId:string]:Array<TaskType>
}

function App (): JSX.Element {
    //BLL:
    const todoLostId_1 = v1()
    const todoLostId_2 = v1()

    const [todoLists,setTodoLists] = useState<Array<TodolistType>>([
        {id: todoLostId_1, title:'What to buy',filter:'all'},
        {id: todoLostId_2, title:'What to learn',filter:'all'},
    ])

    const [tasks,setTasks] = useState<TasksStateType>({
        [todoLostId_1]:[
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
        [todoLostId_2]:[
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Butter", isDone: false},
        ],
    })

    //BLL:

    const removeTask = (taskId: string,todoLostId:string) => {
        const tasksForUpdate = tasks[todoLostId]
        const updatedTasks = tasksForUpdate.filter(el=>el.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todoLostId] = updatedTasks
        setTasks(copyTasks)

        // или так setTasks({...tasks,[todoLostId]: tasks[todoLostId].filter(el => el.id !== taskId)})
    }
    const addTask = (title: string,todoLostId:string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const tasksForUpdate = tasks[todoLostId]
        const updatedTasks = [newTask,...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoLostId] = updatedTasks
        setTasks(copyTasks)

        // или так setTasks({...tasks,[todoLostId]:[newTask,...tasks[todoLostId]]})

    }


    const changeTaskStatus = (taskId: string, newIsDone: boolean,todoLostId:string) => {
        const tasksForUpdate = tasks[todoLostId]
        const updatedTasks = tasksForUpdate.map(el => el.id === taskId ? {...el, isDone:newIsDone}:el)
        const copyTasks = {...tasks}
        copyTasks[todoLostId] = updatedTasks
        setTasks(copyTasks)

       // или так setTasks({...tasks,[todoLostId]:tasks[todoLostId].map((t )=> t.id === taskId ? {...t, isDone: newIsDone}  : t)})
    }

    const changeTodolistFilter = (filter: FilterValuesType,todoLostId:string) => {
        setTodoLists(todoLists.map(el=>el.id === todoLostId ? {...el,filter:filter}:el))
    }

    const removeTodolist = (todoLostId: string) => {       // удаление тудулистов и их тасок
        setTodoLists(todoLists.filter(el => el.id !== todoLostId))
        // delete tasks[todoLostId]
        const copyTasks = {...tasks}
        delete copyTasks[todoLostId]
        setTasks(copyTasks)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType):  Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(el => !el.isDone)
            case "completed":
                return tasks.filter(el => el.isDone)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map((el=>{

        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[el.id], el.filter)

        return(
            <TodoList
                key={el.id}
                todoLostId={el.id}
                title={el.title}
                filter={el.filter}
                tasks={filteredTasks}

                changeTaskStatus={changeTaskStatus}
                removeTask={removeTask}
                addTask={addTask}

                changeTodolistFilter={changeTodolistFilter}
                removeTodolist={removeTodolist}
            />
        )
    }))

    //UI:
    return (
        <div className="App">

            {todoListsComponents}

        </div>

    );
}

export default App;
