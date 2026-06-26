let tasks = []
let searchedTasks= []
let nextID = 1
let statusFilter = "all"

const input = document.getElementById("addTaskInput")
const searchedInput = document.getElementById("searchTaskInput")
const button = document.getElementById("addTaskButton")
button.addEventListener("click", addTask)
searchedInput.addEventListener("input",searchTask)
const list = document.getElementById("list")
const totalTaskCount = document.getElementById("totalTaskCount")
const completedTaskCount = document.getElementById("completedTaskCount")
const pendingTaskCount = document.getElementById("pendingTaskCount")
const displayAllTasksElement = document.getElementById("displayAllTasks")
const displayCompletedTasksElement = document.getElementById("displayCompletedTasks")
const displayPendingTasksElement = document.getElementById("displayPendingTasks")

displayAllTasksElement.addEventListener("click", displayAllTasks)
displayCompletedTasksElement.addEventListener("click", displayCompletedTasks)
displayPendingTasksElement.addEventListener("click", displayPendingTasks)

function addTask(){
    if (input.value == "") {
        return
    }
    tasks.push({id: nextID ,task: input.value, completed: false})
    nextID++
    input.value = ""
    searchedInput.value=""
    statusFilter = "all"
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
    reRenderUI(getVisibleTasks())
}
function searchTask(tasks){
    reRenderUI(getVisibleTasks())
}
function completedTaskToggle(id, isChecked){
    tasks.forEach(task => {
        if(task.id == id){
            task.completed = isChecked
        }
    })
    reRenderUI(getVisibleTasks())
}
function taskCounter(){
    totalTaskCount.innerHTML = `Total Tasks: ${tasks.length}`
    completedTaskCount.innerHTML = `Completed Tasks: ${tasks.filter(task => task.completed == true).length}`
    pendingTaskCount.innerHTML = `Pending Tasks: ${tasks.filter(task => task.completed == false).length}`
}
function displayAllTasks(){
    statusFilter = "all"
    reRenderUI(getVisibleTasks())
}
function displayCompletedTasks(){
    statusFilter = "completed"
    reRenderUI(getVisibleTasks())
}
function displayPendingTasks(){
    statusFilter = "pending"
    reRenderUI(getVisibleTasks())
}
function getVisibleTasks(tasksArray = tasks){
    tasksArray = applyStatusFilter(tasksArray)
    tasksArray = applySearchFilter(tasksArray)    
    return tasksArray
}
function applyStatusFilter(tasksArray){
    if(statusFilter == "completed"){
        return tasksArray.filter(task => task.completed == true)
    }
    else if(statusFilter == "pending"){
        return tasks.filter(task => task.completed == false)
    }
    return tasksArray
}
function applySearchFilter(tasksArray){
    if(searchedInput.value != ''){
        return tasksArray.filter(task => task.task.includes(searchedInput.value))
    }
    return tasksArray
}

function reRenderUI(showTasks){
    taskCounter()
    list.innerHTML = ""
    for (let l = 0; l < showTasks.length; l++) {
        list.innerHTML += 
        `<div>
        <li>
        <input type=checkbox ${showTasks[l].completed==true?"checked":""} data-id= ${showTasks[l].id} />
        ${showTasks[l].task}  
        <button data-id= ${showTasks[l].id}>Delete</button>
        </li>
        </div>`
    }
    if(showTasks.length == 0){
        list.innerHTML = ""
        list.innerHTML += "<li>No tasks</li>"
    }
}
console.log("Javascript Connected")