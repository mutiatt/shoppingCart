import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {getDatabase, ref, push,onValue, remove} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://mutiat-331a7-default-rtdb.firebaseio.com/"
}

const app =initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")




const inputFieldEl =document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl =document.getElementById("shopping-list")

addButtonEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDb, inputValue)
    resetInput()
    
    
})

onValue(shoppingListInDb, function(snapshot){
    if(snapshot.exists()){
        let ItemsArray = Object.entries(snapshot.val())
    clearList()
    for(let i= 0; i < ItemsArray.length; i++){
        let currentItem = ItemsArray[i]
        let currentItemId = currentItem[0]
        let currentItemValue =currentItem[1]
    appendItemList(currentItem)

    }
    }else{
        shoppingListEl.innerHTML = "No items here yet"

    }
    
    
    
    
})



function clearList(){
    shoppingListEl.innerHTML =""
}
function resetInput(){
    inputFieldEl.value =""
}

function appendItemList(item){
    let itemId = item[0]
    let itemValue =item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDb = ref(database,`shoppingList/${itemId}`)
        remove(exactLocationOfItemInDb )


    })

    shoppingListEl.append(newEl)

}


