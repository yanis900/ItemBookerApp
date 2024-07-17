const container = document.getElementById("container");
let itemIdCounter = 0;

const addItem = () => {
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.classList.add("item");
  newItem.innerHTML = itemIdCounter;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "-";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => {
    removeItem(newItem);
  };

  newItem.appendChild(deleteBtn);
  container.appendChild(newItem);
  itemIdCounter++;
};

const removeItem = (item) => {
  container.removeChild(item);
};
