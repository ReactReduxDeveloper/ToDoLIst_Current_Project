import {FilterType, TaskStateType, ToDoListsType} from "../App";
import {v1} from "uuid";
import {AddTodoListAt, RemoveTodoListAT} from "./todolists-reducer";


export type FirstActionType = ReturnType<typeof removeTaskAC>
export type SecondActionType = ReturnType<typeof addTaskAC>
export type ThirdActionType = ReturnType<typeof changeTaskStatusAC>
export type FourthActionType = ReturnType<typeof changeTaskTitleAC>
type ActionType = FirstActionType |
    SecondActionType | ThirdActionType |
    FourthActionType | AddTodoListAt | RemoveTodoListAT
export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.taskID)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListID]]
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskID ? {...el, isDone: action.isDone} : el)
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskID ? {...el, title: action.title} : el)
            }
            case "ADD-TODOLIST":
            return {
                ...state,
              [action.todolistID]:[]
            }
            case "REMOVE-TODOLIST":
                let copyState = {...state}
                delete  copyState[action.id]
            return copyState
        default:
            throw new Error("I dont't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todoListID: string) => (
    {
        type: "REMOVE-TASK" as const,
        taskID,
        todoListID

    }
)
export const addTaskAC = (title: string, todoListID: string) => (
    {
        type: "ADD-TASK" as const,
        todoListID,
        title
    }
)
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => (
    {
        type: "CHANGE-STATUS" as const,
        isDone,
        todoListID,
        taskID
    }
)
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => (
    {
        type: "CHANGE-TITLE" as const,
        title,
        todoListID,
        taskID
    }
)
