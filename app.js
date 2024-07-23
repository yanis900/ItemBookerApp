class ItemManager {
  constructor(containerId, addButtonId) {
    this.container = document.getElementById(containerId);
    this.idCounter = 0;
    this.items = {};

    document.getElementById(addButtonId).onclick = () => this.addItem();
  }

  formatId(id) {
    return id.toString().padStart(3, "0");
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

    const itemProps = document.createElement("div");
    itemProps.classList.add("item-props");

    const itemImg = document.createElement("div");
    itemImg.classList.add("item-img");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const itemId = document.createElement("div");
    itemId.classList.add("item-id");
    itemId.textContent = this.formatId(id);

    const itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.textContent = name;

    const itemState = document.createElement("div");
    itemState.classList.add("item-state");
    itemState.textContent = "Status: Booked";

    const itemDate = document.createElement("div");
    itemDate.textContent = "From: 20/07/24 /n To: 25/07/24";

    const itemUpdate = document.createElement("div");
    itemUpdate.textContent = "Due in 3 days";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "-";
    deleteBtn.onclick = () => {
      let youSure = confirm("Are you sure you want to delete this item?");

      if (!youSure) {
        return;
      } else {
        this.removeItem(newItem, id);
      }
    };

    itemDetails.appendChild(itemId);
    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemState);
    itemDetails.appendChild(itemDate);
    itemDetails.appendChild(itemUpdate);
    itemProps.appendChild(itemImg);
    itemProps.appendChild(itemDetails);
    itemProps.appendChild(deleteBtn);
    newItem.appendChild(itemProps);

    return newItem;
  }

  removeItem(item, itemId) {
    delete this.items[itemId];
    this.container.removeChild(item);
    this.updateItemIds();
  }

  updateItemIds() {
    const remainingItems = this.container.getElementsByClassName("item");
    let newId = 1;
    this.items = {};

    for (let remainingItem of remainingItems) {
      const itemName = remainingItem.querySelector(".item-name").textContent;
      const formattedId = this.formatId(newId);

      remainingItem.querySelector(".item-id").textContent = `${formattedId}`;
      remainingItem.dataset.id = newId;

      const deleteBtn = remainingItem.querySelector(".delete");
      deleteBtn.onclick = () => {
        let youSure = confirm(
          "Are you sure you want to delete this item?"
        );

        if (youSure == "n") {
          return;
        } else if (youSure == "y") {
          this.removeItem(remainingItem, newId);
        }
      };

      this.items[newId] = { id: newId, name: itemName };
      newId++;
    }

    this.idCounter = newId - 1;
  }
}

const itemManager = new ItemManager("container", "addItemButton");
