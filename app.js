const items = document.getElementById("items");

const addItem = () => {
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.classList.add("item");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "-";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => {
    removeItem(newItem);
  };

  newItem.appendChild(deleteBtn);
  items.appendChild(newItem);
};

const removeItem = (item) => {
  items.removeChild(item);
};
