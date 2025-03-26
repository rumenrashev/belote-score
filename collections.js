class Record{
    constructor(type,left,right){
        this.type = type;
        this.left = left;
        this.right = right;
    }
}

function saveCollection(name,arr){
    localStorage.setItem(name,JSON.stringify(arr))
}

function removeCollection(name){
    const collection = getCollection(name)
    localStorage.removeItem(name)
    return collection
}

function getCollection(name){
    const collection = localStorage.getItem(name)
    return collection ? JSON.parse(collection) : []
}

function addLast(name,record){
    const collection = getCollection(name)
    collection.push(record)
    saveCollection(name,collection)
}

function removeLast(name){
    const collection = getCollection(name)
    const last = collection.pop()
    saveCollection(name,collection)
    return last
}

function isEmpty(name){
    return getCollection(name).length == 0
}

function disableIf(element, conditon){
    if(conditon){
        element.classList.add('disabled-btn')
    }else{
        element.classList.remove('disabled-btn')
    }
}