async function loadMenuData() {
    try {
      const res = await fetch("./menu.json");
      const data = await res.json();
        console.log(res);
        console.log(data);

      // Always show Exclusive Deals first
      renderSection("Exclusive Deals", data.exclusiveDeals);
  
      // Now loop through all categories (including "Products")
      data.categories.forEach(cat => renderSection(cat.name, cat.items));
  
    } catch (err) {
      console.error("Failed to load menu:", err);
    }
  }
  
  function renderSection(title, items) {
    if (!items || !items.length) return;
    
    const root = document.getElementById('menu-root');
    
    const section = document.createElement('section');
    
    const heading = document.createElement('h2');
    heading.className = 'section-title';
    heading.textContent = title;
    section.appendChild(heading);
    
    const grid = document.createElement('div');
    grid.className = 'grid-container';
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-info">
          <div class="menu-name">${item.name}</div>
          <div class="menu-price">₹${item.price}</div>
        </div>
      `;
      grid.appendChild(card);
    });
    
    section.appendChild(grid);
    root.appendChild(section);
  }
  
  loadMenuData();
  