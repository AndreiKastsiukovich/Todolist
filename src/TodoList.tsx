import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type OnClickHandler = () => void

type TodoListPropsType = {
    todoLostId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    changeTaskStatus: (taskId: string, isDone: boolean,todoLostId: string) => void
    removeTask: (taskId: string,todoLostId: string) => void
    addTask: (title: string,todoLostId: string) => void

    changeTodolistFilter: (filter: FilterValuesType,todoLostId: string) => void
    removeTodolist:(todoLostId: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // console.log(addTaskInput)
    // const addTask = () => {
    //     if(addTaskInput.current){
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ""
    //     }
    //
    // }
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle,props.todoLostId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addTask()

    const handlerCreator = (filter: FilterValuesType) => {    // функция.которая вызывает другую функцию
        return () => props.changeTodolistFilter(filter,props.todoLostId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todoLostId)
    }

    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div>
    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isAddBtnDisabled = title.length === 0
    return (
        <div className={"todolist"}>
            <h3>{props.title}
                <button onClick={removeTodolist}>DEL</button>
            </h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                <input
                    value={title}
                    placeholder="Please, enter title!!!"
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={inputErrorClasses}
                />
                <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
                {userMaxLengthMessage}
                {userErrorMessage}
            </div>
            <TasksList
                todoLostId={props.todoLostId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
            <div className="filter-btn-container">
                <button
                    className={props.filter ==="all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}
                >All</button>
                <button
                    className={props.filter ==="active" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("active")}
                >Active</button>
                <button
                    className={props.filter ==="completed" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("completed")}
                >Completed</button>
            </div>
        </div>
    );
};

export default TodoList;