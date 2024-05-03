firebase.initializeApp({
    // Import the functions you need from the SDKs you need
    apiKey: "AIzaSyDieewnNcwvWlAAe0O5mlRlCV30P5LMc_E",
    authDomain: "ms-eve-apps.firebaseapp.com",
    projectId: "ms-eve-apps",
    storageBucket: "ms-eve-apps.appspot.com",
    messagingSenderId: "847843896670",
    appId: "1:847843896670:web:a685ab9231f012a0bd73cf",
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