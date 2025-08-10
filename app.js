const menuItems = [
    {
      name: "Pizza Margherita",
      price: 350,
      image: "images/pizza.jpg"
    },
    {
      name: "Spaghetti Carbonara",
      price: 300,
      image: "images/spaghetti.jpg"
    },
    // Add more items as needed
  ];
  
  function loadMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    menuItems.forEach(item => {
      container.innerHTML += `
        <div class="menu-card">
          <img src="${item.image}" class="menu-image" alt="${item.name}">
          <div class="menu-details">
            <div class="menu-title">${item.name}</div>
            <div class="menu-price">₹${item.price}</div>
          </div>
        </div>
      `;
    });
  }
  
  loadMenu();
  