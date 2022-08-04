import React, {useState} from 'react';
import './App.css';
import {MassiveObjectsType, ToDoList} from "./ToDoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography, useTheme} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterType = "All" | "Active" | "Completed"
export type ToDoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [todoListID: string]: MassiveObjectsType[]
}

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [ToDoLists, SetTodoLists] = useState<ToDoListsType[]>(
        [
            {id: todolistID1, title: "What to Learn", filter: "All"},
            {id: todolistID2, title: "What to Buy", filter: "All"},
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
    const FilteredFunction = (value: FilterType, todoListID: string) => {
        /* let todolist = ToDoLists.find(tl => tl.id = todolistID);
         if (todolist) {
             todolist.Filter = value
             SetTodoLists([...ToDoLists])
         }*/
        SetTodoLists(ToDoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }
    const changeToDoListTitle = (title: string, todoListID: string) => {
        SetTodoLists(ToDoLists.map(el => el.id === todoListID ? {...el, title} : el))
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
            filter: "All"
        }
        SetTodoLists([...ToDoLists, newTodoList])
        SetTasks({...Tasks, [newTodoListID]: []})
    }
    return (

        <div className={"App"}>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={'start'} color={'inherit'} area-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={'inherit'} variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm AddItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {ToDoLists.map(todolist => {
                        let TasksForTodolist = Tasks[todolist.id]
                        if (todolist.filter === "Active") {
                            TasksForTodolist = Tasks[todolist.id].filter(el => !el.isDone)
                        }
                        if (todolist.filter === "Completed") {
                            TasksForTodolist = Tasks[todolist.id].filter(el => el.isDone)
                        }
                        return (<Grid item key={todolist.id}>
                            <Paper variant={"outlined"} style={{padding: "20px"}}>
                                <ToDoList

                                    id={todolist.id}
                                    title={todolist.title}
                                    MassiveObjects={TasksForTodolist}
                                    DeleteFunc={DeleteFunc}
                                    FilteredFunction={FilteredFunction}
                                    AddTaskFunction={AddTaskFunction}
                                    ChangeCheckofTask={ChangeCheckofTask}
                                    Filter={todolist.filter}
                                    RemoveTodoList={RemoveTodoList}
                                    ChangeTaskTitle={ChangeTaskTitle}
                                    changeToDoListTitle={changeToDoListTitle}

                                />
                            </Paper>
                        </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
