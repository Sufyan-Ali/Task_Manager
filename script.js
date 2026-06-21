let tasks = []
let searchedTasks= []
let nextID = 1

const input = document.getElementById("input")
const button = document.getElementById("addTaskButton")
button.addEventListener("click", addTask)
const list = document.getElementById("list")

function addTask(){
    if (input.value == "") {
        return
    }
    tasks.push({id: nextID ,task: input.value})
    nextID++
    input.value = ""
    reRenderUI(tasks)
}
list.addEventListener("click", function(event){
    const clickedTag = event.target
    if(clickedTag.tagName.toLowerCase() == "button"){
        deleteTask(clickedTag.dataset.id)
    }
    
})

function deleteTask(id){
    tasks = tasks.filter(task => task.id != id)
    reRenderUI(tasks)
}
function reRenderUI(showTasks){
    list.innerHTML = ""
    for (let l = 0; l < showTasks.length; l++) {
        list.innerHTML += "<div><li>"+showTasks[l].task  +"<button id=deleteTaskButton data-id="+ showTasks[l].id +">Delete</button></li></div>"
    }
}
console.log("Javascript Connected")