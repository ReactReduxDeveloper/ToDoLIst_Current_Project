import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    AddItem: (title: string) => void

}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [Title, SetTitle] = useState<string>("")
    let [Error, SetError] = useState<boolean>(false)
    const AddFuncItem = () => {
        if (Title.trim() !== '') {
            props.AddItem(Title.trim())
            SetTitle("")
        } else {
            SetError(true)
        }
        SetTitle("")

    }
    const onChangeHandlerItem = (event: ChangeEvent<HTMLInputElement>) => {
        Error && SetError(false)
        SetTitle(event.currentTarget.value)
    }
    const onKeyPressHandlerItem = (event: KeyboardEvent<HTMLInputElement>) => {
        SetError(false)
        if (event.key === 'Enter') {
            AddFuncItem()
        }
    }
    return <div>
        <input value={Title}
               onChange={onChangeHandlerItem}
               onKeyPress={onKeyPressHandlerItem}
               className={Error ? "error" : ""}
        />
        <button onClick={AddFuncItem}>+</button>
        {Error && <div className="error-message">Title is required!</div>}
    </div>
}