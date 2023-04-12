import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task:TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo((props:TaskPropsType) => {

    const onClickHandler = useCallback(() => {
            props.removeTask(props.task.id)
    },[props.removeTask,props.task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue);
    },[props.changeTaskStatus,props.task.id])

    const onTitleChangeHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    },[props.changeTaskTitle,props.task.id])

    return (
            <div className={props.task.isDone ? "is-done" : ""}>
                <Checkbox
                    checked={props.task.isDone}
                    color="primary"
                    onChange={onChangeHandler}
                />

                <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
                <IconButton onClick={onClickHandler}>
                    <Delete />
                </IconButton>
            </div>
    );
});

