import React, {useState} from 'react';
import './App.css';
import {MassiveObjectsType, ToDoList} from "./ToDoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterType = "All" | "Active" | "Completed"
export type ToDoListsType = {
    id: string
    title: string
    Filter: FilterType
}
export type TaskStateType = {
    [todoListID: string]: MassiveObjectsType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [ToDoLists, SetTodoLists] = useState<ToDoListsType[]>(
        [
            {id: todolistID1, title: "What to Learn", Filter: "All"},
            {id: todolistID2, title: "What to Buy", Filter: "All"},
        ]
    )
    let [Tasks, SetTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "Css", isDone: false},
            {id: v1(), title: "React", isDone: true}],
        [todolistID2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ]
    })

    const DeleteFunc = (id: string, todoListID: string) => {
        /* let currentTasks = Tasks[todoListID]
         const filteredTasks = currentTasks.filter(el => el.id !== id)
         Tasks[todoListID] = filteredTasks
         const copyTasks = {...Tasks}
         SetTasks(copyTasks)*/
        SetTasks({...Tasks, [todoListID]: Tasks[todoListID].filter(el => el.id !== id)})
    }
    const FilteredFunction = (value: FilterType, todoListID: string) => {
        /* let todolist = ToDoLists.find(tl => tl.id = todolistID);
         if (todolist) {
             todolist.Filter = value
             SetTodoLists([...ToDoLists])
         }*/
        SetTodoLists(ToDoLists.map(el => el.id === todoListID ? {...el, Filter: value} : el))
    }
    const changeToDoListTitle =  (title: string, todoListID: string)=> {
        SetTodoLists(ToDoLists.map(el => el.id === todoListID ? {...el, title} : el))
    }
    const AddTaskFunction = (title: string, todoListID: string) => {
        /*const currentTasks = Tasks[todoListID]
        const updatedTasks = [{id: v1(), title, isDone: false},...currentTasks]
        const copyTasks = {...Tasks}
        copyTasks[todoListID] = updatedTasks
        SetTasks(copyTasks)*/
        SetTasks({...Tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...Tasks[todoListID]]})
    }
    const ChangeCheckofTask = (id: string, isDone: boolean, todoListID: string) => {
        SetTasks({...Tasks, [todoListID]: Tasks[todoListID].map(el => el.id === id ? {...el, isDone} : el)})
    }
    const ChangeTaskTitle = (id: string, title: string, todoListID: string) => {
        SetTasks({...Tasks, [todoListID]: Tasks[todoListID].map(el => el.id === id ? {...el, title} : el)})
    }
    const RemoveTodoList = (todoListID: string) => {
        SetTodoLists(ToDoLists.filter(el => el.id !== todoListID))
        delete Tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: ToDoListsType = {
            id: newTodoListID,
            title,
            Filter: "All"
        }
        SetTodoLists([...ToDoLists, newTodoList])
        SetTasks({...Tasks, [newTodoListID]: []})
    }
    return (
        <div className={"App"}>
            <AddItemForm AddItem={addTodoList}/>
            {ToDoLists.map(todolist => {
                let TasksForTodolist = Tasks[todolist.id]
                if (todolist.Filter === "Active") {
                    TasksForTodolist = Tasks[todolist.id].filter(el => !el.isDone)
                }
                if (todolist.Filter === "Completed") {
                    TasksForTodolist = Tasks[todolist.id].filter(el => el.isDone)
                }
                return <ToDoList
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    MassiveObjects={TasksForTodolist}
                    DeleteFunc={DeleteFunc}
                    FilteredFunction={FilteredFunction}
                    AddTaskFunction={AddTaskFunction}
                    ChangeCheckofTask={ChangeCheckofTask}
                    Filter={todolist.Filter}
                    RemoveTodoList={RemoveTodoList}
                    ChangeTaskTitle={ChangeTaskTitle}
                    changeToDoListTitle={changeToDoListTitle}

                />
            })}

        </div>
    )
}

export default App;
