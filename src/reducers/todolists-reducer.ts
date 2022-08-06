import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAt = {
    type: "ADD-TODOLIST"
    title: string
    todolistID:string
}
export type ChangeToDoListTitle = {
    type: "CHANGE-TITLE-TODOLIST"
    title: string
    id: string
}
export type FilterToDoList = {
    type: "FILTER-TODOLIST"
    id: string
    filter: FilterType
}
export type ActionType = RemoveTodoListAT | AddTodoListAt | ChangeToDoListTitle | FilterToDoList
export const initialState:ToDoListsType[] = []
export const todolistsReducer = (todolists = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(el => el.id !== action.id)
        case "ADD-TODOLIST":
            return [{id: action.todolistID, title: action.title, filter: "All" as FilterType}, ...todolists]
        case "CHANGE-TITLE-TODOLIST":
            return todolists.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case "FILTER-TODOLIST":
            return todolists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => (
    {
        type: "REMOVE-TODOLIST",
        id
    }
)
export const AddTodolistAC = (title: string): AddTodoListAt => (
    {
        type: "ADD-TODOLIST",
        title,
        todolistID: v1()

    }
)
export const ChangeFilterToDoListAC = (id: string, filter: FilterType): FilterToDoList => (
    {
        type: "FILTER-TODOLIST",
        filter,
        id
    }
)
export const ChangeTitleToDoListAC = (id: string, title: string): ChangeToDoListTitle => (
    {
        type: "CHANGE-TITLE-TODOLIST",
        title,
        id
    }
)