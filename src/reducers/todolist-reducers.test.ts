import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeFilterToDoListAC,
    ChangeTitleToDoListAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";

let todoListID1: string
let todoListID2: string
let startState: ToDoListsType[]
beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()

    startState = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]
})
test("correct todolist should be removed", () => {

    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, RemoveTodoListAC(todoListID1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})
test("correct todolist should be added", () => {

    let newTodolistTitle = "New Todolist"

    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test("correct filter of todolist should be changed", () => {

    let newFilter: FilterType = "Completed"

    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, ChangeFilterToDoListAC(todoListID1, newFilter))


    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe("All")
})
test("correct filter of todolist should be changed", () => {

    let newTodolistTitle = "Hello Young"

    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, ChangeTitleToDoListAC(todoListID1, newTodolistTitle))


    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[1].title).toBe("What to buy")
})

