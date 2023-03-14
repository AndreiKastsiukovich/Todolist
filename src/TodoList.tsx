import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type OnClickHandler = () => void

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) =>void
    changeTodoListTitle:(title: string, todoListId: string)=>void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const addTask = (title:string) => props.addTask(title, props.todoListId)
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoTitle = (title:string) => {
        props.changeTodoListTitle(title,props.todoListId)
    }

    return (

        <div className={"todolist"}>

            <Typography
                gutterBottom
                align={'center'}
                variant={'h5'}>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>

                <IconButton
                    color={'primary'}
                    size={'small'}
                    onClick={removeTodoList}>
                    <DeleteForeverIcon/>
                </IconButton>
            </Typography>

                <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>

            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />

            <div className="filter-btn-container">
                <Button
                    size={'small'}
                    variant={"contained"}
                    disableElevation
                    color={props.filter ==="all" ? "secondary" : "primary"}
                    onClick={handlerCreator('all')}
                >All</Button>
                <Button
                    size={'small'}
                    variant={"contained"}
                    disableElevation
                    color={props.filter ==="active" ? "secondary" : "primary"}
                    onClick={handlerCreator("active")}
                >Active</Button>
                <Button
                    size={'small'}
                    variant={"contained"}
                    disableElevation
                    color={props.filter ==="completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}
                >Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;