let tasks = []
let searchedTasks= []
let nextID = 1
let statusFilter = "all"
const categories = ["study","personal","work"]
let categoryFilter = "all"


const input = document.getElementById("addTaskInput")
const searchedInput = document.getElementById("searchTaskInput")
const button = document.getElementById("addTaskButton")
const list = document.getElementById("list")
const totalTaskCount = document.getElementById("totalTaskCount")
const completedTaskCount = document.getElementById("completedTaskCount")
const pendingTaskCount = document.getElementById("pendingTaskCount")
const displayAllTasksElement = document.getElementById("displayAllTasks")
const displayCompletedTasksElement = document.getElementById("displayCompletedTasks")
const displayPendingTasksElement = document.getElementById("displayPendingTasks")
const displayAllCategoriesElement = document.getElementById("displayAllCategory")
const displayStudyCategoryElement = document.getElementById("displayStudyCategory")
const displayWorkCategoryElement = document.getElementById("displayWorkCategory")
const displayPersonalCategoryElement = document.getElementById("displayPersonalCategory")
const importTasksButton = document.getElementById("importTasksButton")
const importPTag = document.getElementById("importPTag")
// const categoryInput = document.getElementById("categoryInput")
const categoryCheckbox = document.getElementsByName("categoryCheckbox")
// console.log(categoryInput.childNodes)

importTasksButton.addEventListener("click", importTasks)
button.addEventListener("click", addTask)
searchedInput.addEventListener("input",searchTask)
displayAllTasksElement.addEventListener("click", displayAllTasks)
displayCompletedTasksElement.addEventListener("click", displayCompletedTasks)
displayPendingTasksElement.addEventListener("click", displayPendingTasks)
displayAllCategoriesElement.addEventListener("click", displayAllCategories)
displayStudyCategoryElement.addEventListener("click", displayStudyCategory)
displayWorkCategoryElement.addEventListener("click", displayWorkCategory)
displayPersonalCategoryElement.addEventListener("click", displayPersonalCategory)

try {
    const storedTasks = localStorage.getItem("tasks")
    if(typeof(storedTasks) == "string"){
       tasks = JSON.parse(storedTasks)
       if(tasks.length > 0){
           nextID = tasks[tasks.length-1].id + 1
       }
       else{
        nextID = 1
       }
       reRenderUI(tasks)
    }
}catch(e){
    console.log(e,"Error while loading tasks from the local storage.")
}

async function importTasks(){
    try {
       let importedTasks = await fetch("https://jsonplaceholder.typicode.com/todos")
       importedTasks = await importedTasks.json()
       for (let l = 0; l < 5; l++) {
        const tempTask = {
            id : nextID,
            task : importedTasks[l].title,
            completed : importedTasks[l].completed
        };
        tasks.push(tempTask)
        nextID++
       }
       saveTasks(tasks)
       reRenderUI(tasks)
    } catch (error) {
        displayImportError()
        console.log(error, "Something went wrong")
    }finally{
        console.log("Import Button Was Clicked")
    }
}


function addTask(){
    if (input.value == "") {
        return
    }
    let tempCategory=[]
    categoryCheckbox.forEach(element => {
        if(element.checked){
            tempCategory.push(element.value)
        }
    });
    tasks.push({id: nextID ,task: input.value, completed: false, categories: tempCategory})
    nextID++
    input.value = ""
    searchedInput.value=""
    statusFilter = "all"
    saveTasks(tasks)
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
    saveTasks(tasks)
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
    saveTasks(tasks)
    reRenderUI(getVisibleTasks())
}
function taskCounter(){
    totalTaskCount.innerHTML = `Total Tasks: ${tasks.length}`
    completedTaskCount.innerHTML = `Completed Tasks: ${tasks.filter(task => task.completed == true).length}`
    pendingTaskCount.innerHTML = `Pending Tasks: ${tasks.filter(task => task.completed == false).length}`
}
function displayAllCategories(){
    categoryFilter ="all"
    reRenderUI(getVisibleTasks())    
}
function displayWorkCategory(){
    categoryFilter ="work"
    reRenderUI(getVisibleTasks())    
}
function displayStudyCategory(){
    categoryFilter ="study"
    reRenderUI(getVisibleTasks())        
}
function displayPersonalCategory(){
    categoryFilter ="personal"
    reRenderUI(getVisibleTasks())    
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
    tasksArray = appylCategoryFilter(tasksArray)  
    tasksArray = applySearchFilter(tasksArray)
    return tasksArray
}
function appylCategoryFilter(tasksArray){
    
    // if(categoryFilter == "work"){
    //     return tasksArray.filter(task => {
    //         if(task.categories !=undefined){
    //             return task.categories.indexOf(categoryFilter) >= 0
    //         }
    //     })
    // }
    // else if(categoryFilter == "study"){
    //     return tasksArray.filter(task => {
    //         if(task.categories !=undefined){
    //             return task.categories.indexOf(categoryFilter) >= 0
    //         }
    //     })
    // }
    // else if(categoryFilter == "personal"){
    //     return tasksArray.filter(task => {
    //         if(task.categories !=undefined){
    //             return task.categories.indexOf(categoryFilter) >= 0
    //         }
    //     })
    // }
    return tasksArray.filter(task => {
            if(task.categories !=undefined){
                return task.categories.indexOf(categoryFilter) >= 0
            }
        })
}
function applyStatusFilter(tasksArray){
    if(statusFilter == "completed"){
        return tasksArray.filter(task => task.completed == true)
    }
    else if(statusFilter == "pending"){
        return tasksArray.filter(task => task.completed == false)
    }
    return tasksArray
}
function applySearchFilter(tasksArray){
    if(searchedInput.value != ''){
        return tasksArray.filter(task => task.task.includes(searchedInput.value))
    }
    return tasksArray
}
function displayImportError(){
    importPTag.innerHTML +=`<p style="color:red">Something went wrong while importing tasks</p>`
    setTimeout(()=> {
        importPTag.innerHTML = ""
    },2000)
}

function saveTasks(tasksArray){
    const tasksString = JSON.stringify(tasksArray)
    localStorage.setItem("tasks",tasksString)
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
        ${showTasks[l].categories != undefined?`Categories: ${showTasks[l].categories}`:""}
        </li>
        </div>`
    }
    if(showTasks.length == 0){
        list.innerHTML = ""
        list.innerHTML += "<li>No tasks</li>"
    }
}
console.log("Javascript Connected")