import {calculatorReducer, div, mult, sub, sum} from "./tasks";

test("sum",()=>{
    const state = 10
    const num = 5
      const result = sum(state,num)

    expect(result).toBe(15)
    }
)
test("sub",()=>{
        const state = 10
        const num = 5
        const result = sub(state,num)

        expect(result).toBe(5)
    }
)
test("div",()=>{
        const state = 10
        const num = 5
        const result = div(state,num)

        expect(result).toBe(2)
    }
)
test("mult",()=>{
        const state = 10
        const num = 5
        const result = mult(state,num)

        expect(result).toBe(50)
    }
)
test ("sum of two number with reducer", ()=>{
    expect(calculatorReducer(5,{type:"SUM",number:10})).toBe(15)
})
test ("sum of two number with reducer", ()=>{
    expect(calculatorReducer(5,{type:"SUB",number:10})).toBe(-5)
})
test ("sum of two number with reducer", ()=>{
    expect(calculatorReducer(5,{type:"DIV",number:10})).toBe(0.5)
})
test ("sum of two number with reducer", ()=>{
    expect(calculatorReducer(5,{type:"MULT",number:10})).toBe(50)
})