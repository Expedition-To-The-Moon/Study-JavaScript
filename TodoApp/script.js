const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

// onclick을 사용해도 됨
createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
  // 새로운 객체 생성
  const item = {
    id: new Date().getTime(), // unique한 값이면 됨
    text: "",
    complete: false,
  };

  // 배열의 앞부분에 추가
  todos.unshift(item);
  // 요소 생성
  const { itemEl, inputEl, editEl, removeEl } = createTodoElement(item);

  // 리스트 요소에 생성한 itemEl 추가(첫번째 요소로)
  list.prepend(itemEl);
  // disabled 속성 제거 -> 내용 작성 가능
  inputEl.removeAttribute("disabled");
  // input 요소에 focus -> 바로 작성 가능하도록 함
  inputEl.focus();

  // local storage에 데이터 저장
  saveToLocal();
}

// 요소 생성 함수 
function createTodoElement(item) {
  // <div class="item"> 생성
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  // <input type="checkbox" /> 생성
  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.checked = item.complete;

  // <div class="item complete"> 로 complete 추가
  if (item.complete) {
    itemEl.classList.add("complete");
  }

  // <input type="text" value="todo content" disabled /> 생성
  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  // <div class="actions"> 생성
  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  // </div><button class="material-icons">edit</button> 생성
  const editEl = document.createElement("button");
  editEl.classList.add("material-icons");
  editEl.innerText = "edit";

  //<button class="material-icons remove-btn">remove-circle</button> 생성
  const removeEl = document.createElement("button");
  removeEl.classList.add("material-icons", "remove-btn");
  removeEl.innerText = "delete";

  // Event 발생할 경우
  checkboxEl.addEventListener("change", () => {
    // checked : 체크o => true , 체크x => false
    item.complete = checkboxEl.checked;
    if (item.complete) {
      inputEl.classList.add("complete");
    } else {
      inputEl.classList.remove("complete");
    }
    saveToLocal();
  });

  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
  });

  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    saveToLocal();
  });

  editEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  removeEl.addEventListener("click", () => {
    // 클릭한 요소의 id와 다른 것만 배열로 반환
    todos = todos.filter((t) => t.id != item.id);
    // 요소 삭제
    itemEl.remove();
    saveToLocal();
  });

  // itemEl 안에 요소 넣기
  itemEl.append(checkboxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);
  // actionsEl 안에 요소 넣기
  actionsEl.append(editEl);
  actionsEl.append(removeEl);

  return { itemEl, inputEl, editEl, removeEl };
}

// local storage에 데이터를 string 형태로 변환해서 저장하는 함수
function saveToLocal() {
  const data = JSON.stringify(todos);

  localStorage.setItem("my_todos", data);
}

// local storage에 저장된 데이터 가져오는 함수
function loadFromLocal() {
  const data = localStorage.getItem("my_todos");
  // data 가 있으면, 다시 배열 형태로 변환
  if (data) {
    todos = JSON.parse(data);
  }
}

// 배열안에 있는 객체 꺼내는 함수
function displayTodos() {
  loadFromLocal();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    const { itemEl } = createElement(item);

    list.append(itemEl);
  }
}

displayTodos();
