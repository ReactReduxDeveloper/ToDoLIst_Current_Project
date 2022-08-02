import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

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
        <TextField value={Title}
                   onChange={onChangeHandlerItem}
                   onKeyPress={onKeyPressHandlerItem}
                   variant={"outlined"}
                   error={Error}
                   size={"small"}
                   label={"Title"}
                   helperText={Error && "Title is Required"}
                   /*className={Error ? "error" : ""}*/
        />

        {/*<input value={Title}
               onChange={onChangeHandlerItem}
               onKeyPress={onKeyPressHandlerItem}
               className={Error ? "error" : ""}
        />*/}
        <IconButton onClick={AddFuncItem}>
            <AddCircleOutline/>
        </IconButton>
        {/*<button onClick={AddFuncItem}>+</button>*/}
     {/*   {Error && <div className="error-message">Title is required!</div>}*/}
    </div>
}