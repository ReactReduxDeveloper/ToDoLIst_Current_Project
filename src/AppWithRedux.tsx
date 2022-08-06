import React, {useReducer} from 'react';
import './App.css';
import {MassiveObjectsType, ToDoList} from "./ToDoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography, useTheme} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeFilterToDoListAC,
    ChangeTitleToDoListAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {ToDoList1} from "./ToDoList1";


export type FilterType = "All" | "Active" | "Completed"
export type ToDoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [todoListID: string]: MassiveObjectsType[]
}

function AppWithRedux() {


    let todolistID1 = v1()
    let todolistID2 = v1()
    const ToDoLists = useSelector<AppRootStateType, ToDoListsType[]>(state => state.todolists)

    const Tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()
    const DeleteFunc = (id: string, todoListID: string) => {
        /* let currentTasks = Tasks[todoListID]
         const filteredTasks = currentTasks.filter(el => el.id !== id)
         Tasks[todoListID] = filteredTasks
         const copyTasks = {...Tasks}
         dispatchTasks(copyTasks)*/
        let action = removeTaskAC(id, todoListID)
        dispatch(action)
    }

    const AddTaskFunction = (title: string, todoListID: string) => {
        /*const currentTasks = Tasks[todoListID]
        const updatedTasks = [{id: v1(), title, isDone: false},...currentTasks]
        const copyTasks = {...Tasks}
        copyTasks[todoListID] = updatedTasks
        dispatchTasks(copyTasks)*/
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }
    const ChangeCheckofTask = (id: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatch(action)
    }
    const ChangeTaskTitle = (id: string, title: string, todoListID: string) => {
        let action = changeTaskTitleAC(id, title, todoListID)
        dispatch(action)
    }
    const FilteredFunction = (value: FilterType, todoListID: string) => {
        /* let todolist = ToDoLists.find(tl => tl.id = todolistID);
         if (todolist) {
             todolist.Filter = value
             dispatchToDoLists([...ToDoLists])
         }*/
        let action = ChangeFilterToDoListAC(todoListID, value)
        dispatch(action)
    }
    const changeToDoListTitle = (title: string, todoListID: string) => {
        let action = ChangeTitleToDoListAC(todoListID, title)
        dispatch(action)
    }
    const RemoveTodoList = (todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)

    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
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
                        /*let TasksForTodolist = Tasks[todolist.id]
                        if (todolist.filter === "Active") {
                            TasksForTodolist = Tasks[todolist.id].filter(el => !el.isDone)
                        }
                        if (todolist.filter === "Completed") {
                            TasksForTodolist = Tasks[todolist.id].filter(el => el.isDone)
                        }*/
                        return (<Grid item key={todolist.id}>
                            <Paper variant={"outlined"} style={{padding: "20px"}}>
                                <ToDoList1

                                    todolist={todolist}

                                />
                            </Paper>
                        </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
