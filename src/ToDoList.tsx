import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {stringify} from "querystring";
import {FilterType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutlined} from "@material-ui/icons";


export type MassiveObjectsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    Filter: FilterType
    MassiveObjects: MassiveObjectsType[]
    DeleteFunc: (id: string, todoListID: string) => void
    FilteredFunction: (value: FilterType, todoListID: string) => void
    AddTaskFunction: (title: string, todoListID: string) => void
    ChangeCheckofTask: (id: string, isDone: boolean, todoListID: string) => void
    RemoveTodoList: (todoListID: string) => void
    ChangeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeToDoListTitle: (title: string, todoListID: string) => void
}

export const ToDoList = (props: PropsType) => {

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
        return () => props.FilteredFunction(filter, props.id)
    }

    const RemoveToDoList = () => {
        props.RemoveTodoList(props.id)
    }

    const addTask = (title: string) => props.AddTaskFunction(title, props.id)
    const changeToDoListTitle = (title: string) => props.changeToDoListTitle(title, props.id)
    return (
        <div className="App">
            <div>
                <h3>

                    <EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>
                    <IconButton onClick={RemoveToDoList}>
                        <DeleteOutlined/>
                    </IconButton>
                    {/*   <button onClick={RemoveToDoList}>X</button>*/}

                </h3>

                <AddItemForm AddItem={addTask}/>
                <ul>
                    {props.MassiveObjects.map((el) => {
                        const ButtonHandler = () => {
                            props.DeleteFunc(el.id, props.id)
                        }
                        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeCheckofTask(el.id, event.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.ChangeTaskTitle(el.id, title, props.id)
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
                        color={props.Filter === "All" ? "primary" : 'secondary'}
                        className={props.Filter === "All" ? "active-filter" : ''}
                        onClick={uniFilterHandler("All")}>All
                    </Button>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        color={props.Filter === "Active" ? "primary" : 'secondary'}
                        className={props.Filter === "Active" ? "active-filter" : ''}
                        onClick={uniFilterHandler("Active")}>Active
                    </Button>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        color={props.Filter === "Completed" ? "primary" : 'secondary'}
                        className={props.Filter === "Completed" ? "active-filter" : ''}
                        onClick={uniFilterHandler("Completed")}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}
