export const sum = (state: number, num: number) => {
    return (state + num)
}
export const sub = (state: number, num: number) => {
    return (state - num)
}
export const div = (state: number, num: number) => {
    return (state / num)
}
export const mult = (state: number, num: number) => {
    return (state * num)
}

export type ActionType = {
    type: "SUM" | "SUB" | "DIV" | "MULT"
    number: number
}

export const calculatorReducer = (state: number, action: ActionType) => {
    switch (action.type) {
        case "SUM":
            return state + action.number;
            break;
        case "SUB":
            return state - action.number;
            break;
        case "DIV":
            return state / action.number;
            break;
        case "MULT":
            return state * action.number;

    }
}