import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(taskId: string,isDone:boolean)=>void
    filter:FilterValuesType
    setError:(error:string|null)=>void
    error:string|null
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        if(title !== ''){
            props.addTask(title.trim())
            setTitle("")
        }else{
            props.setError('Error')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError('')
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   placeholder="Please, enter title"
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={props.error ? "input-error":''}
            />
            <button onClick={addTask}>+</button>
            <div>{props.error }</div>

        </div>
        <ul>
            {
                props.tasks.map(t => {

                  /*  const taskClasses = ['task']
                        t.isDone && taskClasses.push('task-done')*/

                    const onClickHandler = () => props.removeTask(t.id)

                    const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id,e.currentTarget.checked)
                    }

                    return <li key={t.id}>

                        <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>

                        <span className={`task ${t.isDone ? 'task-done' : ''}`}>{t.title}</span>
                        {/*<span className={taskClasses.join('')}>{t.title}</span>*/}

                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div className="filter-btn-container">
            <button
                className={props.filter === "all" ? "active-filter" : 'active-filter1'}
                onClick={ onAllClickHandler }>All</button>
            <button
                className={props.filter === "active" ? 'active-filter' : ''}
                onClick={ onActiveClickHandler }>Active</button>
            <button
                className={props.filter === "completed" ? 'active-filter' : ''}
                onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
