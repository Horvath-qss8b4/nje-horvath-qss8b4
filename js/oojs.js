 // Egyetlen feladatot reprezentáló osztály
class Task {
    constructor(text) {
        this.text = text;
    }

    createElement(onDelete) {
        const taskItem = document.createElement("div");
        taskItem.className = "todo-item";
        taskItem.textContent = this.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => onDelete(this);

        taskItem.appendChild(deleteBtn);
        return taskItem;
    }
}

// A teljes To-Do listát kezelő osztály
class TodoList {
    constructor() {
        this.tasks = [];
        this.taskListContainer = document.getElementById("taskList");
    }

    addTask(text) {
        if (text.trim() === "") return;

        const newTask = new Task(text);
        this.tasks.push(newTask);
        this.render();
    }

    removeTask(taskToRemove) {
        this.tasks = this.tasks.filter(task => task !== taskToRemove);
        this.render();
    }

    render() {
        this.taskListContainer.innerHTML = "";
        this.tasks.forEach(task => {
            this.taskListContainer.appendChild(task.createElement((task) => this.removeTask(task)));
        });
    }
}

// Örökölt osztály speciális stílussal
class StyledTodoList extends TodoList {
    constructor(bgColor) {
        super();
        this.bgColor = bgColor;
        document.querySelector('.todo-container').style.background = this.bgColor;
    }
}

// Példányosítás és eseménykezelők
const myTodoList = new StyledTodoList("#ddd");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    myTodoList.addTask(taskInput.value);
    taskInput.value = "";
});
