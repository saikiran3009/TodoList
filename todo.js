let todoContainer = document.getElementById("todoContainer");
let addEl = document.getElementById("add");
let saveEl = document.getElementById("save");
let userInputElement = document.getElementById("userInput");

function localStorageTodos(){
  let stringifiedTodo = localStorage.getItem("userTask");
  let parsedTodo = JSON.parse(stringifiedTodo);
  if (parsedTodo === null){
    return []
  }
  else{
    return parsedTodo;
  }
}

let todoList = localStorageTodos();
let todosCount = todoList.length;


saveEl.onclick = function(){
  localStorage.setItem("userTask",JSON.stringify(todoList))
}

function onAddTodo() {
  let userInputValue = userInputElement.value;

  if(userInputValue === ""){
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked : false
  };
  todoList.push(newTodo)
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}


addEl.onclick = function(){
  onAddTodo();
}

function markAsDone(labelId,checkboxId,todoId){
  let checkboxEl = document.getElementById(checkboxId);
  let labelEl = document.getElementById(labelId);

  if (checkboxEl.checked === true){
      labelEl.classList.add("checked")
  }
  else{
      labelEl.classList.remove("checked")
  }

  let todoObjectIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (todoId === eachTodoId){
      return true;
    }
    else{
      return false;
    }

  });
  
  let todoObject = todoList[todoObjectIndex]
  if (todoObject.isChecked===true){
    todoObject.isChecked = false;
  }
  else{
    todoObject.isChecked = true;
  }
}


function deleteTodo(todoId){
  let todoEl = document.getElementById(todoId)
  todoContainer.removeChild(todoEl);

  let deleteIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (todoId === eachTodoId){
      return true;
    }
    else{
      return false;
    }
  });
  todoList.splice(deleteIndex,1);
}


function createAndAppendTodo(todo){
  let checkboxId = "checkbox" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoItemEl = document.createElement("li");
  todoItemEl.classList.add("todo-item","d-flex","flex-row");
  todoItemEl.id = todoId;
  todoContainer.appendChild(todoItemEl);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.classList.add("checkbox")
  checkboxEl.id = checkboxId;
  checkboxEl.checked = todo.isChecked;
  checkboxEl.onclick = function(){
      markAsDone(labelId,checkboxId,todoId)
  }
  todoItemEl.appendChild(checkboxEl);


  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-conatiner");
  labelContainer.htmlFor = checkboxId;
  todoItemEl.appendChild(labelContainer);

  let labelEl = document.createElement("label");
  labelEl.classList.add("label");
  labelEl.id = labelId;
  labelEl.htmlFor = checkboxId;
  labelEl.textContent = todo.text;
  if (todo.isChecked === true){
    labelEl.classList.add("checked")
  }
  labelContainer.appendChild(labelEl);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
      deleteTodo(todoId);
  }
  labelContainer.appendChild(deleteIcon);
}


for (let todo of todoList){
  createAndAppendTodo(todo);
}

userInputElement.addEventListener("keydown",function(event){
  if (event.key === "Enter"){
    onAddTodo();
  }
});

