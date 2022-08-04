import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListAt = {
    type: "ADD-TODOLIST"
    title: string
    id: string
}
type ChangeToDoListTitle = {
    type: "CHANGE-TITLE-TODOLIST"
    title: string
    id: string
}
type FilterToDoList = {
    type: "FILTER-TODOLIST"
    id: string
    filter: FilterType
}
type ActionType = RemoveTodoListAT | AddTodoListAt | ChangeToDoListTitle | FilterToDoList
export const todolistsReducer = (todolists: ToDoListsType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(el => el.id !== action.id)
        case "ADD-TODOLIST":
            return [{id: action.id, title: action.title, filter: "All"}, ...todolists]
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
export const AddTodoListAC = (id: string, title: string): AddTodoListAt => (
    {
        type: "ADD-TODOLIST",
        title,
        id
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