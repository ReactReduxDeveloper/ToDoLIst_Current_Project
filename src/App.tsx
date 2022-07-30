import React, {useState} from 'react';
import './App.css';
import {MassiveObjectsType, ToDoList} from "./ToDoList";
import {v1} from 'uuid';

export type FilterType = "All" | "Active" | "Completed"
export type ToDoListsType = {
    id: string
    title: string
    Filter: FilterType
}

function App() {
    let [ToDoLists, SetTodoLists] = useState<ToDoListsType[]>(
        [
            {id: v1(), title: "What to Learn", Filter: "All"},
            {id: v1(), title: "What to Buy", Filter: "All"},
        ]
    )
    let [Tasks, SetTasks] = useState<MassiveObjectsType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "Css", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "SQL", isDone: true},
        {id: v1(), title: "Boosty", isDone: true}
    ])

    const DeleteFunc = (id: string) => {
        const FilteredTasks = Tasks.filter(el => el.id !== id)
        SetTasks(FilteredTasks)
    }
    const FilteredFunction = (value: FilterType) => {
        SetFilter(value)
    }
    const AddTaskFunction = (Title: string) => {
        let Task = {id: v1(), title: Title, isDone: false}
        let NewTasks = [Task, ...Tasks]
        SetTasks(NewTasks)

    }
    const ChangeCheckofTask = (id: string, isDone: boolean) => {
        SetTasks(Tasks.map(el => el.id === id ? {...el, isDone} : el))
    }
    return (
        <div className={"App"}>
            {ToDoLists.map(todolist => {
                let [Filter, SetFilter] = useState<FilterType>("All")
                let TasksForTodolist = Tasks
                if (Filter === "Active") {
                    TasksForTodolist = Tasks.filter(el => !el.isDone)
                }
                if (Filter === "Completed") {
                    TasksForTodolist = Tasks.filter(el => el.isDone)
                }
                return <ToDoList
                    key={todolist.id}
                    title={todolist.title}
                    MassiveObjects={TasksForTodolist}
                    DeleteFunc={DeleteFunc}
                    FilteredFunction={FilteredFunction}
                    AddTaskFunction={AddTaskFunction}
                    ChangeCheckofTask={ChangeCheckofTask}
                    Filter={todolist.Filter}

                />
            })}

        </div>
    )
}

export default App;
