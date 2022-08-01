import React, {ChangeEvent,KeyboardEvent, useState} from "react";

type EditableSpan = {
    title: string
    changeTitle:(title: string)=>void
}
export const EditableSpan = (props: EditableSpan) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [Title, SetTitle] = useState<string>(props.title)
    const onChangeHandlerItem = (event: ChangeEvent<HTMLInputElement>) => {
        SetTitle(event.currentTarget.value)
    }
    const onEditMode = ()=> setEditMode(true)
    const offEditMode = ()=>
    {
        props.changeTitle(Title)
        setEditMode(false)
    }
    const enterKeyPressInput = (event: KeyboardEvent<HTMLInputElement>)=> {
        if (event.key === 'Enter') {
            offEditMode()

        }}
    return (
        editMode ?
            <input onKeyPress={enterKeyPressInput}  onBlur={offEditMode} autoFocus value={Title} onChange={onChangeHandlerItem}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}