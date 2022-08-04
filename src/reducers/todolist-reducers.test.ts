import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";
import {
    AddTodoListAC,
    ChangeFilterToDoListAC,
    ChangeTitleToDoListAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";


test("correct todolist should be removed", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: ToDoListsType[] = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]
    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, RemoveTodoListAC(todoListID1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})
test("correct todolist should be added", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let newTodolistTitle = "New Todolist"
    const startState: ToDoListsType[] = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]
    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, AddTodoListAC(v1(), newTodolistTitle))


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test("correct filter of todolist should be changed", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let newFilter: FilterType = "Completed"
    const startState: ToDoListsType[] = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]
    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, ChangeFilterToDoListAC(todoListID1, newFilter))


    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe("All")
})
test("correct filter of todolist should be changed", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let newTodolistTitle = "Hello Young"
    const startState: ToDoListsType[] = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]
    //Вызываем функци. через определение
    const endState = todolistsReducer(startState, ChangeTitleToDoListAC(todoListID1, newTodolistTitle))


    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[1].title).toBe("What to buy")
})

