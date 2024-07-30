class ItemManager {
  constructor() {
    this.container = document.getElementById("container");
    this.idCounter = 0;
    this.items = {};

    this.loadItemsFromLocalStorage(); // Load items from local storage
    this.initEventListeners();
  }

  initEventListeners() {
    document.getElementById("addItemButton").onclick = () => this.addItem();
    document.getElementById("searchButton").onclick = () => this.search();
    document.getElementById("showAllButton").onclick = () =>
      this.showAllItems();
  }

  formatId(id) {
    return id.toString().padStart(3, "0");
  }

  createItemElement(id, name, booked) {
    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.dataset.id = id; // Add a data attribute to store the id

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
    itemState.textContent = `Booked: ${booked}`;

    const itemDate = document.createElement("div");
    itemDate.textContent = "-";

    const itemUpdate = document.createElement("div");
    itemUpdate.textContent = "-";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "-";
    deleteBtn.onclick = () => {
      if (confirm("Are you sure you want to delete this item?")) {
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
    window.localStorage.setItem(`item ${item.id}`, JSON.stringify(item));

    const newItem = this.createItemElement(item.id, item.name, item.booked);
    this.container.appendChild(newItem);
    reload();
  }

  removeItem(itemElement, itemId) {
    delete this.items[itemId];
    this.container.removeChild(itemElement);
    window.localStorage.removeItem(`item ${itemId}`);
    this.updateItemIds();
  }

  updateItemIds() {
    const remainingItems = Array.from(this.container.querySelectorAll(".item"));
    this.items = {}; // Reset items object

    remainingItems.forEach((itemElement, index) => {
      const newId = index + 1; // New sequential ID starting from 1
      const oldId = parseInt(itemElement.dataset.id, 10); // Get old ID
      const itemName = itemElement.querySelector(".item-name").textContent;
      const itemBooked = itemElement
        .querySelector(".item-state")
        .textContent.includes("Booked: true");

      // Update item with new ID
      itemElement.dataset.id = newId;
      itemElement.querySelector(".item-id").textContent = this.formatId(newId);

      // Store the updated item in the items object
      this.items[newId] = {
        id: newId,
        name: itemName,
        booked: itemBooked,
      };

      // Update localStorage with new ID
      window.localStorage.removeItem(`item ${oldId}`);
      window.localStorage.setItem(
        `item ${newId}`,
        JSON.stringify(this.items[newId])
      );
    });

    // Update idCounter
    this.idCounter = remainingItems.length;
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

  loadItemsFromLocalStorage() {
    const storedItems = Object.keys(window.localStorage)
      .filter((key) => key.startsWith("item "))
      .map((key) => JSON.parse(window.localStorage.getItem(key)));

    storedItems.forEach((item) => {
      this.items[item.id] = item;
      const newItem = this.createItemElement(item.id, item.name, item.booked);
      this.container.appendChild(newItem);
      this.idCounter = Math.max(this.idCounter, item.id); // Update idCounter
    });
  }
}

const itemManager = new ItemManager();
