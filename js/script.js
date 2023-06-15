const localStorageKey = 'grocery-list';
const addItemBtn = document.getElementById('btn-add-item');
const updateItemBtn = document.getElementById('btn-update-item');
const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
const input = document.getElementById('input-new-item');
let idToUpdate = '';
let lastItem = '';
let lastId = '';

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addItemBtn.style.display != "none" ? addItemBtn.click() : updateItemBtn.click();
  };
});

function addNewItem() {
  const newItem = {
    Item: input.value,
    Status: 'Pendente'
  };

  input.style.border = '';

  if(!input.value) {
    input.style.border = '1px solid red';
    return alert('Digite um item para incluir na lista.');
  } 
  
  if (values.length == 0) {
    values.push({
      Id: values.length + 1,
      ...newItem
    });

    saveList();
    input.value = '';
    return showGroceryList();
  }

    lastItem = values.findLast(({ Id }) => Id >= values.length);
    lastId = lastItem.Id;

    values.push({
      Id: lastId + 1,
      ...newItem
    });

    saveList();
    input.value = '';
    showGroceryList();
};

function saveList() {
  localStorage.setItem(localStorageKey, JSON.stringify(values));
}

function showGroceryList() {
  const list = document.getElementById('grocery-list');

  list.innerHTML = '';  

  for (let value of values) {
    list.innerHTML += `
        <li>
          <span class='${value.Status == "Finalizado" ? 'item-done' : ''}'>${value.Item}</span>
            <div id='btn-item'>
              <button id='btn-edit' onclick='editItem("${value.Id}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
              <button id='btn-remove' onclick='removeItem("${value.Id}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
              </button>
              <button id='btn-done' onclick='doneItem("${value.Id}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
              </button>
            </div>
        </li>
      <hr>
    `
  };
};

function editItem(data) {
  const index = values.findIndex(i => i.Id == data);

  idToUpdate = values[index].Id;
  input.value = values[index].Item;

  addItemBtn.style.display = 'none';
  updateItemBtn.style.display = 'block';
};

function removeItem(data) {
  const index = values.findIndex(i => i.Id == data);
  values.splice(index,1);
  saveList();
  showGroceryList();
};

function doneItem(data) {
  const index = values.findIndex(i => i.Id == data);
  values[index].Status == "Finalizado" ? values[index].Status = "Pendente" : values[index].Status = "Finalizado"
  saveList();
  showGroceryList();
};

function updateItem() {
  const index = values.findIndex(i => i.Id == idToUpdate);

  /* let value = {
    "Id": idToUpdate,
    "Item": input.value,
    "Status": "Pendente"
  } */

  values[index].Item = input.value;

  /* values[index] = {
    ...value
  }; */

  saveList();

  input.value = '';

  showGroceryList();
}

showGroceryList();