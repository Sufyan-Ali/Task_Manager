let tasks = []
let searchedTasks= []
let nextID = 1

const input = document.getElementById("addTaskInput")
const searchedInput = document.getElementById("searchTaskInput")
const button = document.getElementById("addTaskButton")
button.addEventListener("click", addTask)
searchedInput.addEventListener("input",searchTask)
const list = document.getElementById("list")

function addTask(){
    if (input.value == "") {
        return
    }
    tasks.push({id: nextID ,task: input.value, completed: false})
    nextID++
    input.value = ""
    reRenderUI(tasks)
}
list.addEventListener("click", function(event){
    const clickedTag = event.target
    if(clickedTag.tagName.toLowerCase() == "button"){
        deleteTask(clickedTag.dataset.id)
    }
    if(clickedTag.tagName.toLowerCase()== "input"){
    completedTaskToggle(clickedTag.dataset.id,clickedTag.checked)
    }
})

function deleteTask(id){
    tasks = tasks.filter(task => task.id != id)
    reRenderUI(tasks)
    if(searchedInput.value != ''){
        searchTask()
    }
}
function searchTask(){
    searchedTasks = tasks.filter(task => task.task.includes(searchedInput.value))
    searchedInput.value == '' ? reRenderUI(tasks) : reRenderUI(searchedTasks)
    
}
function completedTaskToggle(id, isChecked){
    tasks.forEach(task => {
        if(task.id == id){
            task.completed = isChecked
        }
    })

    console.log(tasks)
}
function reRenderUI(showTasks){
    list.innerHTML = ""
    for (let l = 0; l < showTasks.length; l++) {
        list.innerHTML += "<div><li><input type=checkbox checked="+"false"+" data-id="+ showTasks[l].id +" />"+showTasks[l].task  +"<button data-id="+ showTasks[l].id +">Delete</button></li></div>"
    }
    if(showTasks.length == 0){
        list.innerHTML = ""
        list.innerHTML += "<li>No tasks</li>"
    }
}
console.log("Javascript Connected")