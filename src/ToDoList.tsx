import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {stringify} from "querystring";
import {FilterType} from "./App";
import {Simulate} from "react-dom/test-utils";


export type MassiveObjectsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    Filter:FilterType
    MassiveObjects: MassiveObjectsType[]
    DeleteFunc: (id: string) => void
    FilteredFunction: (value: FilterType) => void
    AddTaskFunction: (Title: string) => void
    ChangeCheckofTask: (id: string, isDone: boolean) => void
}

export const ToDoList = (props: PropsType) => {
    let [Title, SetTitle] = useState<string>("")
    let [Error, SetError] = useState<string | null>(null)
    const AddFunc = () => {
        if (Title.trim() !== '') {
            props.AddTaskFunction(Title.trim())
            SetTitle("")
        } else {
            SetError("Title is Required")
        }

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        SetTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        SetError(null)
        if (event.key === 'Enter') {
            AddFunc()
        }
    }
    const AllHandler = () => {
        props.FilteredFunction("All")
    }
    const ActiveHandler = () => {
        props.FilteredFunction("Active")
    }
    const CompletedHandler = () => {
        props.FilteredFunction("Completed")
    }
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={Title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={Error ? "error" : ""}
                    />
                    <button onClick={AddFunc}>+</button>
                    {Error && <div className="error-message">{Error}</div>}
                </div>
                <ul>
                    {props.MassiveObjects.map((el) => {
                        const ButtonHandler = () => {
                            props.DeleteFunc(el.id)
                        }
                        return (

                            <li key={el.id} className={el.isDone ? "is-done" : ''}>
                                <input type="checkbox" checked={el.isDone} onChange={(event) => {
                                    props.ChangeCheckofTask(el.id, event.currentTarget.checked)
                                }}/>
                                <span>{el.title}</span>
                                <button onClick={ButtonHandler}> ✖
                                </button>
                            </li>)
                    })}
                </ul>

                <div>
                    <button className={props.Filter === "All" ? "active-filter" : ''} onClick={AllHandler}>All
                    </button>
                    <button className={props.Filter === "Active" ? "active-filter" : ''} onClick={ActiveHandler}>Active
                    </button>
                    <button className={props.Filter === "Completed" ? "active-filter" : ''} onClick={CompletedHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
