document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks=[];

const saveTask=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const addTask=()=>{
    const taskInput=document.getElementById("taskInput");
    const text=taskInput.value.trim();
    if (text) {
        tasks.push({text:text,completed:false})
        taskInput.value="";
        updateTaskList();
        updateStats();
        saveTask();
    }
    // console.log(tasks);
}

const toggleTaskcompleted=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    console.log({tasks});
    updateStats();
    saveTask();
}

const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTask();
};

const editTask=(index)=>{
    const taskInput=document.getElementById("taskInput");
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTaskList(); 
    updateStats();
    saveTask();
}

const updateStats=()=>{
    const completeTasks=tasks.filter(task=>task.completed).length;
    const totalTasks=tasks.length;
    const progress=(completeTasks/totalTasks)*100;
    const progressBar=document.getElementById('progress')
    progressBar.style.width=`${progress}%`;
    document.getElementById('right').innerText=`${completeTasks} / ${totalTasks}`
};
const updateTaskList = ()=>{
    const taskList =document.getElementById('taskList');
    taskList.innerHTML='';

    tasks.forEach((task,index)=>{
        const listItem=document.createElement("li");
        listItem.innerHTML=`
       
        <ul id="task-list">
            <div class="taskItem">
                <div class="task ${task.completed ? "completed":""}">
                    <input type="checkbox" class="checkbox" ${task.completed?"checked":""}>
                    <p id="taskText">${task.text}</p>
                </div>
                <div class="icons">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfAvY_Eh1MQV4JEuWukiBONMdqh5VjmzNHl-_vmZfyS2_Jx2NnsTKPNcY&s" onClick="editTask(${index})">
                    <img src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png" onClick="deleteTask(${index})">
                </div>
            </div>
        </ul>
        
        `
        listItem.addEventListener('change',()=>toggleTaskcompleted(index))
        taskList.append(listItem);
    })
}
document.getElementById("newTask").addEventListener('click', function(e){
    e.preventDefault();

    addTask();
});