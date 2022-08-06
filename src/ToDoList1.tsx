import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {stringify} from "querystring";
import {FilterType, TaskStateType, ToDoListsType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {ChangeTitleToDoListAC, RemoveTodoListAC} from "./reducers/todolists-reducer";


export type MassiveObjectsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolist: ToDoListsType

}

export const ToDoList1 = ({todolist}: PropsType) => {
    const {title, id, filter} = todolist
    let tasks = useSelector<AppRootStateType, MassiveObjectsType[]>(state => state.tasks[id])

    const dispatch = useDispatch()
    /*  const AllHandler = () => {
          props.FilteredFunction("All", props.id)
      }
      const ActiveHandler = () => {
          props.FilteredFunction("Active", props.id)
      }
      const CompletedHandler = () => {
          props.FilteredFunction("Completed", props.id)
      }*/
    const uniFilterHandler = (filter: FilterType) => {
        return () => dispatch(changeToDoListTitle(filter))
    }

    const RemoveToDoList = () => {
        dispatch(RemoveTodoListAC(id))
    }

    const addTask = (title: string) => dispatch(addTaskAC(title, id))
    const changeToDoListTitle = (title: string) => dispatch(ChangeTitleToDoListAC(id,title))

    if (filter === "Active") {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === "Completed") {
        tasks = tasks.filter(el => el.isDone)
    }
    return (
        <div className="App">
            <div>
                <h3>

                    <EditableSpan title={title} changeTitle={changeToDoListTitle}/>
                    <IconButton onClick={RemoveToDoList}>
                        <DeleteOutlined/>
                    </IconButton>
                    {/*   <button onClick={RemoveToDoList}>X</button>*/}

                </h3>

                <AddItemForm AddItem={addTask}/>
                <ul>
                    {tasks.map((el) => {
                        const ButtonHandler = () => {
                            dispatch(removeTaskAC(el.id,id))
                        }
                        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(el.id,event.currentTarget.checked,id))
                        }
                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC(el.id,title,id))
                        }
                        return (

                            <li key={el.id} className={el.isDone ? "is-done" : ''}>
                                <Checkbox
                                    size={"small"}
                                    color={"primary"}
                                    checked={el.isDone} onChange={changeTaskStatus}
                                />
                                <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
                                <IconButton onClick={ButtonHandler}>
                                    <DeleteOutlined/>
                                </IconButton>
                                {/*<button onClick={ButtonHandler}>✖</button>*/}
                            </li>)
                    })}
                </ul>

                <div>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        color={filter === "All" ? "primary" : 'secondary'}
                        className={filter === "All" ? "active-filter" : ''}
                        onClick={uniFilterHandler("All")}>All
                    </Button>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        color={filter === "Active" ? "primary" : 'secondary'}
                        className={filter === "Active" ? "active-filter" : ''}
                        onClick={uniFilterHandler("Active")}>Active
                    </Button>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        color={filter === "Completed" ? "primary" : 'secondary'}
                        className={filter === "Completed" ? "active-filter" : ''}
                        onClick={uniFilterHandler("Completed")}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}
