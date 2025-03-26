RESET.addEventListener(CLICK_EVENT,(e)=>{
    if(isDisabled(e.target)){
        return
    }
    removeCollection(BACK_COLLECTION)
    saveCollection(RESET_COLLECTION,removeCollection(FORWARD_COLLECTION))
    render()
})

BACK_BTN.addEventListener(CLICK_EVENT,(e)=>{
    if(isDisabled(e.target)){
        return
    }
    if(isEmpty(RESET_COLLECTION)){
        const last = removeLast(FORWARD_COLLECTION);
        addLast(BACK_COLLECTION,last)
        render()
        if(last.type == POINTS){
            LEFT_INPUT.value = last.left 
            RIGHT_INPUT.value = last.right 
            disableIf(ENTER,false)
            disableIf(ZERO,false)
        }


    } else {
        saveCollection(FORWARD_COLLECTION,removeCollection(RESET_COLLECTION))
        render()
    }
    disableIf(CLEAR_BTN,isNotValidInput(SELECTED))
})

FORWARD.addEventListener(CLICK_EVENT,(e)=>{
    if(isDisabled(e.target)){
        return
    }
    const lastBack = removeLast(BACK_COLLECTION)
    addLast(FORWARD_COLLECTION,lastBack)
    render()
})