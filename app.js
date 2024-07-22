class ItemManager {
  constructor(containerId, addButtonId) {
    this.container = document.getElementById(containerId);
    this.idCounter = 0;
    this.items = {};

    document.getElementById(addButtonId).onclick = () => this.addItem();
  }

  addItem() {
    const itemName = prompt("Enter item name");

    if (itemName === null || itemName.trim() === "") {
      alert("Item name cannot be empty");
      return;
    }

    this.idCounter++;

    const item = {
      id: this.idCounter,
      name: itemName,
    };

    this.items[this.idCounter] = item;

    const newItem = this.createItemElement(item.id, item.name);
    this.container.appendChild(newItem);
  }

  createItemElement(id, name) {
    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.dataset.id = id;
    newItem.dataset.name = name;

    const textNode = document.createTextNode(`${id} ${name}`);
    newItem.appendChild(textNode);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "-";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => {
      this.removeItem(newItem, id);
    };

    newItem.appendChild(deleteBtn);

    return newItem;
  }

  removeItem(item, itemId) {
    delete this.items[itemId];

    this.container.removeChild(item);

    this.updateItemIds();
  }

  updateItemIds() {
    const remainingItems = this.container.getElementsByClassName('item');
    let newId = 1;
    this.items = {};

    for (let remainingItem of remainingItems) {
      const itemName = remainingItem.dataset.name;

      remainingItem.firstChild.nodeValue = `${newId} ${itemName}`;

      remainingItem.dataset.id = newId;

      const deleteBtn = remainingItem.querySelector(".delete");
      deleteBtn.onclick = () => {
        this.removeItem(remainingItem, newId);
      };

      this.items[newId] = { id: newId, name: itemName };
      newId++;
    }

    this.idCounter = newId - 1;
  }
}

const itemManager = new ItemManager("container", "addItemButton");
