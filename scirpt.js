const CLICK_EVENT = 'click'
const FOCUS_EVENT = 'focus'
const FORWARD_COLLECTION = 'forward'
const BACK_COLLECTION = 'back'
const RESET_COLLECTION = 'reset'
const GAMES = 'games'
const POINTS = 'points'

const NUMBERS = Array.from(document.querySelectorAll('.number'));
const LEFT_INPUT = document.getElementById('left-input');
const RIGHT_INPUT = document.getElementById('right-input');
const ENTER = document.getElementById('enter');
const CLEAR_BTN = document.getElementById('clear');
const RESET = document.getElementById('reset');
const SCORE = document.getElementById('score');
const BACK_BTN = document.getElementById('back-btn');
const FORWARD = document.getElementById('forward');
const ZERO = document.getElementById("0");
const GAMES_CONTAINER = document.getElementById('games')
const POINTS_CONTAINER = document.getElementById('points')

let SELECTED = LEFT_INPUT;

document.addEventListener('click',()=>{
    SELECTED.focus()
})

document.addEventListener('resize',()=>{
    SELECTED.focus()
})

document.addEventListener('load',()=>{
    SELECTED.focus()
})


const INPUTS = Array.from(document.querySelectorAll('input'));

function isEligibleForEnter(){
    return isValidInput(LEFT_INPUT) || isValidInput(RIGHT_INPUT)
}

function isValidInput(input){
   return input.value != '' && input.value != 0
}

function isNotValidInput(input){
    return input.value == '' || input.value == 0
}

INPUTS.forEach(input=>{
    input.addEventListener(FOCUS_EVENT,e=>{
        SELECTED = e.target;
        NUMBERS.forEach(n=> disableIf(n,false));
        NUMBERS.forEach(n=> disableIf(n,SELECTED.value >= 20))
        disableIf(ZERO,SELECTED.value >= 20 || SELECTED.value === '0')
        SELECTED.focus()
        disableIf(ENTER,!isEligibleForEnter())
        disableIf(CLEAR_BTN,SELECTED.value === '0')
    })
})

NUMBERS.forEach(n=>{
    n.addEventListener(CLICK_EVENT,(e)=>{
        if(isDisabled(e.target)){
            return
        }
        const value = event.target.textContent;
        const resut = Number(SELECTED.value + value);
        SELECTED.value = resut;
        disableIf(CLEAR_BTN,false)
        SELECTED.focus();
    })
})


CLEAR_BTN.addEventListener(CLICK_EVENT,(e)=>{
        if(isDisabled(e.target)){
            return
        }
        SELECTED.value = Math.trunc(SELECTED.value / 10);
        SELECTED.focus();
        disableIf(CLEAR_BTN,SELECTED.value === '0')
    }
);

const table = document.getElementById('table');

function craeteCol(value,tdClass){
    const td = document.createElement('td');
    td.classList.add(tdClass)
    td.textContent = " " + value;
    return td;
}


function createRow(left, middle, right){
    const tr = document.createElement('tr');
    tr.append(
        craeteCol(left),
        craeteCol(middle),
        craeteCol(right)
    )

    return tr;
}


ENTER.addEventListener(CLICK_EVENT,(e)=>{
    if(isDisabled(e.target)){
        return
    }
    const record = new Record(POINTS,Number(LEFT_INPUT.value),Number(RIGHT_INPUT.value))
    addLast(FORWARD_COLLECTION,record);
    removeCollection(BACK_COLLECTION)
    removeCollection(RESET_COLLECTION)

    let [left,right,leftGames,rightGames] = render()
    SELECTED = LEFT_INPUT
    if(left != right && (left > 150 || right > 150)){
        if(left > right){
            leftGames++;
        }else{
            rightGames++;
        }
        left = 0;
        right = 0;
        append(createRow("",`${leftGames} - ${rightGames}`,""))
        addLast(FORWARD_COLLECTION,new Record(GAMES,leftGames,rightGames))
        setScore(left,right,leftGames,rightGames)
        disableIf(ENTER,true)
        disableIf(CLEAR_BTN,true)
    }
    disableIf(CLEAR_BTN,true)
});


function isDisabled(btn){
    if(btn.classList.contains('disabled-btn')){
        SELECTED.focus()
        return true
    }
    return false
}

function render(){
    disableIf(BACK_BTN,isEmpty(FORWARD_COLLECTION) && isEmpty(RESET_COLLECTION))
    disableIf(FORWARD,isEmpty(BACK_COLLECTION))
    disableIf(RESET,isEmpty(FORWARD_COLLECTION))
    SELECTED = LEFT_INPUT
    SELECTED.focus()
    NUMBERS.forEach(b=> disableIf(b,false))
    table.innerHTML = '';
    let left = 0;
    let right = 0;
    let leftGames = 0;
    let rightGames = 0;
    getCollection(FORWARD_COLLECTION).forEach(e=>{
        if(e.type == GAMES){
            table.append(createRow(left,"",right))
            const row =  createRow("",`${e.left} - ${e.right}`,"")
            table.append(row)
            row.scrollIntoView()
            left = 0;
            right = 0;
            leftGames = Number(e.left);
            rightGames = Number(e.right);
        }else{
            if(left != 0 || right != 0){
                append(
                    createRow(`${left} - ${e.left}`,"",`${right} - ${e.right}`)
                )
            }
            left += e.left;
            right += e.right;
        }
    });
    if(left != 0 || right != 0){
        const row = createRow(`${left}`,"",`${right}`);
        table.append(row);
        row.scrollIntoView()
    }
    INPUTS.forEach(i=> i.value = '0')
    disableIf(ZERO,SELECTED.value === '0')
    disableIf(ENTER,true)
    setScore(left,right,leftGames,rightGames)
    return [left,right,leftGames,rightGames];
}

function setScore(left,right,leftGames,rightGames){
    POINTS_CONTAINER.textContent = `${left} - ${right}`
    GAMES_CONTAINER.textContent =  `${leftGames} - ${rightGames}`
}

function append(...rows){
    rows.forEach(row=>{
        table.append(row)
        row.scrollIntoView()
    })
}

render()

const button = document.getElementById('my-button');

  




