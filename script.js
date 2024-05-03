firebase.initializeApp({
    // Import the functions you need from the SDKs you need
    apiKey: "YOUR API",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR PROJECT ID",
    storageBucket: "...........com",
    messagingSenderId: "00000000000",
    appId: "1............",
});

const db = firebase.firestore();

//function to add our tasks
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if(task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        taskInput.value = "";
        console.log("Task added.");
    }
}

function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
             <span>${doc.data().task}</span>
            <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
    .orderBy("timestamp","desc")
    .onSnapshot(snapshot =>{
        const changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.type ==="added"){
                renderTasks(change.doc)
            }
        });
    });

    function deleteTask(id){
        db.collection("tasks").doc(id).delete();
        location.reload();
    }
