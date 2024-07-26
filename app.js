class ItemManager {
  constructor() {
    this.container = document.getElementById("container");
    this.idCounter = 0;
    this.items = {};

    document.getElementById("addItemButton").onclick = () => this.addItem();
    document.getElementById("searchButton").onclick = () => this.search();
    document.getElementById("showAllButton").onclick = () =>
      this.showAllItems();
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
      booked: false,
    };

    this.items[this.idCounter] = item;

    const newItem = this.createItemElement(item.id, item.name, item.booked);
    this.container.appendChild(newItem);
  }

  createItemElement(id, name, booked) {
    const newItem = document.createElement("div");
    newItem.classList.add("item");

    const itemProps = document.createElement("div");
    itemProps.classList.add("item-props");

    const itemImg = document.createElement("img");
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
    itemState.textContent = booked;

    const itemDate = document.createElement("div");
    itemDate.textContent = "undefined";

    const itemUpdate = document.createElement("div");
    itemUpdate.textContent = "undefined";

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
        let youSure = confirm("Are you sure you want to delete this item?");

        if (!youSure) {
          return;
        } else {
          this.removeItem(remainingItem, newId);
        }
      };

      this.items[newId] = { id: newId, name: itemName };
      newId++;
    }

    this.idCounter = newId - 1;
  }

  search() {
    const query = document.getElementById("searchInput").value.trim();
    const searchResults = [];

    if (query === "") {
      alert("Search query cannot be empty");
      return;
    }

    if (!isNaN(query)) {
      const id = parseInt(query, 10);
      if (this.items[id]) {
        searchResults.push(this.items[id]);
      }
    } else {
      for (const id in this.items) {
        if (this.items[id].name.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push(this.items[id]);
        }
      }
    }

    this.displaySearchResults(searchResults);
    document.getElementById("showAllButton").style.display = "inline";
  }

  showAllItems() {
    const allItems = Object.values(this.items);
    this.displaySearchResults(allItems);
    document.getElementById("showAllButton").style.display = "none";
  }

  displaySearchResults(results) {
    this.clearSearchResults();

    results.forEach((item) => {
      const newItem = this.createItemElement(item.id, item.name, item.booked);
      this.container.appendChild(newItem);
    });
  }

  clearSearchResults() {
    const items = this.container.querySelectorAll(".item");
    items.forEach((item) => {
      if (!item.contains(document.getElementById("addItemButton"))) {
        this.container.removeChild(item);
      }
    });
  }
}

const itemManager = new ItemManager();
