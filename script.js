let tasks = []
let searchedTasks= []
let nextID = 1
let totalTasks = 0
let completedTasks = 0
let pendingTasks = 0

const input = document.getElementById("addTaskInput")
const searchedInput = document.getElementById("searchTaskInput")
const button = document.getElementById("addTaskButton")
button.addEventListener("click", addTask)
searchedInput.addEventListener("input",searchTask)
const list = document.getElementById("list")
const totalTaskCount = document.getElementById("totalTaskCount")
const completedTaskCount = document.getElementById("completedTaskCount")
const pendingTaskCount = document.getElementById("pendingTaskCount")

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
    taskCounter()
    reRenderUI(tasks)
}
function taskCounter(){
    totalTasks = tasks.length
    completedTasks = tasks.filter(task => task.completed == true).length
    pendingTasks = tasks.filter(task => task.completed == false).length
    console.log(totalTasks ,completedTasks, pendingTasks)
}
function reRenderUI(showTasks){
    taskCounter()
    totalTaskCount.innerHTML = `Total Tasks: ${totalTasks}`
    completedTaskCount.innerHTML = `Completed Tasks: ${completedTasks}`
    pendingTaskCount.innerHTML = `Pending Tasks: ${pendingTasks}`

    list.innerHTML = ""
    for (let l = 0; l < showTasks.length; l++) {
        list.innerHTML += 
        `<div>
        <li>
        <input type=checkbox ${showTasks[l].completed==true?"checked":""} data-id= ${showTasks[l].id} />
        ${showTasks[l].task}  
        <button data-id= ${showTasks[l].id} >Delete</button>
        </li>
        </div>`
    }
    if(showTasks.length == 0){
        list.innerHTML = ""
        list.innerHTML += "<li>No tasks</li>"
    }
}
console.log("Javascript Connected")