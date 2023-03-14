import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) =>void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)

            const changeTaskTitleHandler = (title:string) => {
                props.changeTaskTitle(task.id,title,props.todoListId)
            }

            const changeTaskStatusHandler =
                (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            return (

                <ListItem
                    key={task.id}
                    disableGutters     // отступы
                    divider           //лист в полоску
                    secondaryAction={
                        <IconButton
                            color={'primary'}
                            size={'small'}
                            onClick={removeTaskHandler}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    }
                >
                    <Checkbox
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>

                </ListItem>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <List disablePadding={true}>
            {tasksItems}
        </List>
    );
};

export default TasksList;