//READ ME:
//This small project is can display, store, update, and delete text input submissions

console.log(1);
if (typeof document !== "undefined") {
    // document exists
    console.log('exist');
} else {
    // document does not exist
    console.log('nono');
}
// let load = true;
//GetElements
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var upbtn = document.getElementById('updateBtn');
var currentEl= document.getElementById('updateBtn');
var clear= document.getElementById('clear');
hideUpdate();

//Add event listeners
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
filter.addEventListener('keyup', filterItems);
upbtn.addEventListener('click', reset)
clear.addEventListener('click', clearFilter)

function reset(e) {
    console.log('in reset')
    var upbox = upbtn.parentElement.querySelector('.updateBox')
    //currentEl.innerText = upbox.value;
    console.log(currentEl)
    let val = upbox.value
    let parent = currentEl.parentElement

    //this whole section until replacechild was duplicated from additem.unnecessary
    li = makeNewList(val)
    // var li = document.createElement('li');
    // li.className = 'list-group-item';
    // li.appendChild(document.createTextNode(val));
    // itemList.appendChild(li);


    // var deleteBtn = document.createElement('button');
    // var up = document.createElement('button');
    // deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // up.className = 'btn btn-primary btn-sm float-right update mr-4';
    // deleteBtn.appendChild(document.createTextNode('X'));
    // up.appendChild(document.createTextNode('UP'));
    // li.appendChild(deleteBtn);
    // li.appendChild(up);
    //^^^duplicated work. fix later
    parent.replaceChild(li, currentEl)
    hideUpdate()
    let addctn = document.querySelector('.add-container');
    //let og = addctn.style.display
    console.log('end')
    addctn.style.display = 'block'
    upbox.value = ''
}   
//Add new list elements after submit click
function addItem(e){
    e.preventDefault();
    console.log('imhere')
    var newItem = document.getElementById('item').value;
    Items.addItemToStore(newItem);
    makeNewList(newItem);

    let inputBox = document.getElementById('item');
    document.getElementById('item').value = ''
    //inputBox.
}

//remove elements after 'X' button click
function removeItem(e) {
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure you want to delete this item?')){
            console.log(e.target.parentElement);
            let parentLi = e.target.parentElement;
            //or itemList.removeChild(parentLi);
            Items.removeItem(parentLi.textContent)
            parentLi.remove();
            
        }

    }
    if(e.target.classList.contains('update')){
        //hides all the items and shows a new unput box and submit button
        console.log('update')
        if(confirm('Are you sure you want to update this item?')){
            let box = document.querySelector('.updateBox');
            let upbtn = document.querySelector('#updateBtn');
            console.log(box)
            box.style.display = 'block'
            upbtn.style.display = 'block'
            let addctn = document.querySelector('.add-container');
            //let og = addctn.style.display
            console.log(addctn)
            addctn.style.display = 'none'
            currentEl = e.target.parentElement
        }
        

    }
}
// handles getting, storing, and deleting items in the local browser cache storage
class Items{
    static getItems(){
        let itemList = localStorage.getItem('itemList')
        if(itemList == null){
            itemList = []
        }
        else{
            itemList = JSON.parse(itemList)
        }
        return itemList
        
    }
    static addItemToStore(item){
        let itemList = Items.getItems();
        itemList.push(item);
        localStorage.setItem('itemList', JSON.stringify(itemList))
    }
    static removeItem(text){
        console.log(text.slice(0, text.length -3))
        text = text.slice(0, text.length -3)
        let itemList = Items.getItems();
        console.log(itemList)
        itemList.forEach((item, index) => {
            if(item == text){
                console.log(`item: ${item} | text: ${text}`)
                itemList.splice(index, 1)
            }
        })
        console.log(itemList)
        localStorage.setItem('itemList', JSON.stringify(itemList))
        
    }

    static loadItems(){
        //if(load){
            //load = false;
            let itemListy = Items.getItems();
            itemListy.forEach((item) => {
                makeNewList(item);
            })
        //}
        
    }
}
// function loadItems(){

// }

//Filter elements after typing 
function filterItems(e){
    console.log(e.target)
    var text = e.target.value.toLowerCase();
    // console.log(itemList.getElementsByTagName('li'))
    let items = itemList.getElementsByTagName('li')
    // Array.from(items).forEach((item) => {
    //       item.style.display = 'block'
        
    // })
    Array.from(items).forEach((item) => {
        // console.log(typeof(item.firstChild.textContent))
        var itemName = item.firstChild.textContent
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block'
        }
        else{
            item.style.display = 'none'
        }
    })

    // itemList.getElementsByTagName
}

function hideUpdate(){
    let box = document.querySelector('.updateBox');
    let upbtn = document.querySelector('#updateBtn');
    box.style.display = 'none'
    upbtn.style.display = 'none'
}

function clearFilter(e){
    filter.value = ''
    console.log(filter)
    let items = itemList.getElementsByTagName('li')
    // Array.from(items).forEach((item) => {
    //       item.style.display = 'block'
        
    // })
    Array.from(items).forEach((item) => {
        item.style.display = 'block'
    })
}

function makeNewList(item){
    console.log(item)
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(item));
    console.log(li);
    itemList.appendChild(li);

    var deleteBtn = document.createElement('button');
    var up = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    up.className = 'btn btn-primary btn-sm float-right update mr-4';
    deleteBtn.appendChild(document.createTextNode('X'));
    up.appendChild(document.createTextNode('UP'));
    li.appendChild(deleteBtn);
    li.appendChild(up)
    return li;
}
document.addEventListener('DOMContentLoaded', Items.loadItems);

