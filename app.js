async function loadMenuData() {
    try {
      const res = await fetch("./menu.json");
      const data = await res.json();
        console.log(res);
        console.log(data);

      // Always show Exclusive Deals first
      renderSection("Exclusive Deals", data.exclusiveDeals);
  
      data.categories.forEach(cat => renderSection(cat.name, cat.items));
  
    } catch (err) {
      console.error("Failed to load menu:", err);
    }
  }

//   theme

// Add this near the top of app.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
  
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggleBtn.textContent = '☀︎';
    } else {
      themeToggleBtn.textContent = '🌙';
    }
  
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      if (isDark) {
        themeToggleBtn.textContent = '☀︎';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  });

  
  

  async function loadMenuData() {
    try {
      const res = await fetch('./menu.json');
      const data = await res.json();
  
      const categoriesForMenu = [];
  
      // Render Exclusive Deals first
      renderSection("Exclusive Deals", data.exclusiveDeals);
      categoriesForMenu.push("Exclusive Deals");
  
      // Render all categories including 'Products'
      data.categories.forEach(cat => {
        renderSection(cat.name, cat.items);
        categoriesForMenu.push(cat.name);
      });
  
      // Build Side Menu
      buildSideMenu(categoriesForMenu);
  
    } catch (err) {
      console.error("Failed to load menu:", err);
    }
  }
  
  
  function renderSection(title, items) {
    if (!items || !items.length) return;
    
    const root = document.getElementById('menu-root');
    
    const section = document.createElement('section');
    section.id = title.replace(/\s+/g, '-').toLowerCase(); // anchor id


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

          
          <button class="wishlist-btn" aria-label="Add to wishlist" title="Add to wishlist">
          <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.8 4.6c-1.4-1.3-3.4-1.4-4.7-.2L12 8.3 7.9 4.4c-1.3-1.2-3.3-1.2-4.7.2-1.4 1.3-1.4 3.6 0 4.9l8.7 8.8 8.7-8.8c1.3-1.3 1.3-3.6 0-4.9z"/>
          </svg>
          </button>
          
          <div class="menu-price">₹${item.price}</div>
        </div>
      `;
      grid.appendChild(card);
    });
    
    section.appendChild(grid);
    root.appendChild(section);

    // Add event listeners to wishlist buttons
  section.querySelectorAll('.wishlist-btn').forEach((btn, index) => {
    // Check localStorage if this item is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(`${title}-${index}`)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');

      // Update wishlist in localStorage
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const key = `${title}-${index}`;
      if (btn.classList.contains('active')) {
        if (!wishlist.includes(key)) wishlist.push(key);
      } else {
        wishlist = wishlist.filter(i => i !== key);
      }
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    });
  });

  }
  

  function buildSideMenu(categories) {
    const list = document.getElementById('category-list');
    list.innerHTML = '';
  
    categories.forEach(cat => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${cat.replace(/\s+/g, '-').toLowerCase()}`;
      a.textContent = cat;
      a.addEventListener('click', () => {
        document.getElementById('side-menu').classList.remove('open');
      });
      li.appendChild(a);
      list.appendChild(li);
    });
  }





  // Toggle Menu Events
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('side-menu').classList.add('open');
  });
  document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementById('side-menu').classList.remove('open');
  });



  //search logic

  // Filter menu items on input
document.getElementById('menu-search').addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!allMenuData) return;
  
    // If search box empty, show full menu
    if (!query) {
      renderMenu(allMenuData);
      return;
    }
  
    // Filter exclusive deals
    const filteredExclusive = allMenuData.exclusiveDeals.filter(item =>
      item.name.toLowerCase().includes(query)
    );
  
    // Filter categories and their items
    const filteredCategories = allMenuData.categories.map(cat => {
      const filteredItems = cat.items.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      return { name: cat.name, items: filteredItems };
    }).filter(cat => cat.items.length > 0);
  
    // Render filtered menu
    renderMenu({ exclusiveDeals: filteredExclusive, categories: filteredCategories });
  });

  loadMenuData();
  