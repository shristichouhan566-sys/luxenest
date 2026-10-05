/**
 * LuxeNest — Luxury Interior Architecture & Design Platform
 * Core Application Engine & State Management
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // STORAGE KEYS & GLOBAL STATE
  // -------------------------------------------------------------------------
  const CART_KEY = 'luxenest_cart_v1';
  const WISHLIST_KEY = 'luxenest_wishlist_v1';
  const USER_KEY = 'luxenest_user_v1';

  // Helper to read localStorage safely
  function readStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read error:', e);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  }

  // -------------------------------------------------------------------------
  // CART STATE & METHODS
  // -------------------------------------------------------------------------
  window.LuxeNestCart = {
    getItems: function () {
      return readStorage(CART_KEY, []);
    },

    addItem: function (product, qty) {
      qty = parseInt(qty, 10) || 1;
      let cart = this.getItems();
      const existing = cart.find(item => item.id === product.id);

      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          dimensions: product.dimensions || '',
          qty: qty
        });
      }

      writeStorage(CART_KEY, cart);
      window.LuxeNestApp.updateNavBadges();
      window.LuxeNestApp.showToast(`✨ Added "${product.name}" to your shopping bag`);

      // Meta Pixel Event Tracking
      if (typeof fbq === 'function') {
        fbq('track', 'AddToCart', {
          content_name: product.name,
          content_category: product.category,
          content_ids: [product.id],
          content_type: 'product',
          value: product.price * qty,
          currency: 'INR'
        });
      }

      // Trigger re-render if on cart page
      if (document.getElementById('cartPageContainer')) {
        renderCartPage();
      }
    },

    updateQty: function (productId, delta) {
      let cart = this.getItems();
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
          cart = cart.filter(i => i.id !== productId);
        }
        writeStorage(CART_KEY, cart);
        window.LuxeNestApp.updateNavBadges();
        if (document.getElementById('cartPageContainer')) {
          renderCartPage();
        }
      }
    },

    removeItem: function (productId) {
      let cart = this.getItems();
      const item = cart.find(i => i.id === productId);
      cart = cart.filter(i => i.id !== productId);
      writeStorage(CART_KEY, cart);
      window.LuxeNestApp.updateNavBadges();
      if (item) {
        window.LuxeNestApp.showToast(`Removed "${item.name}" from shopping bag`);
      }
      if (document.getElementById('cartPageContainer')) {
        renderCartPage();
      }
    },

    clear: function () {
      writeStorage(CART_KEY, []);
      window.LuxeNestApp.updateNavBadges();
      if (document.getElementById('cartPageContainer')) {
        renderCartPage();
      }
    },

    getCount: function () {
      const cart = this.getItems();
      return cart.reduce((acc, item) => acc + item.qty, 0);
    },

    getSubtotal: function () {
      const cart = this.getItems();
      return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    }
  };

  // -------------------------------------------------------------------------
  // WISHLIST STATE & METHODS
  // -------------------------------------------------------------------------
  window.LuxeNestWishlist = {
    getItems: function () {
      return readStorage(WISHLIST_KEY, []);
    },

    toggle: function (product) {
      let wishlist = this.getItems();
      const exists = wishlist.some(item => item.id === product.id);

      if (exists) {
        wishlist = wishlist.filter(item => item.id !== product.id);
        writeStorage(WISHLIST_KEY, wishlist);
        window.LuxeNestApp.updateNavBadges();
        window.LuxeNestApp.showToast(`Removed "${product.name}" from your wishlist`);
      } else {
        wishlist.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          rating: product.rating
        });
        writeStorage(WISHLIST_KEY, wishlist);
        window.LuxeNestApp.updateNavBadges();
        window.LuxeNestApp.showToast(`❤️ Saved "${product.name}" to your wishlist`);

        // Meta Pixel Event Tracking
        if (typeof fbq === 'function') {
          fbq('track', 'AddToWishlist', {
            content_name: product.name,
            content_category: product.category,
            content_ids: [product.id],
            value: product.price,
            currency: 'INR'
          });
        }
      }

      // Re-render if on wishlist page
      if (document.getElementById('wishlistPageContainer')) {
        renderWishlistPage();
      }

      // Update active state on any visible heart buttons
      document.querySelectorAll(`[data-wishlist-id="${product.id}"]`).forEach(btn => {
        btn.classList.toggle('active', !exists);
      });
    },

    has: function (productId) {
      return this.getItems().some(item => item.id === productId);
    },

    getCount: function () {
      return this.getItems().length;
    },

    remove: function (productId) {
      let wishlist = this.getItems().filter(item => item.id !== productId);
      writeStorage(WISHLIST_KEY, wishlist);
      window.LuxeNestApp.updateNavBadges();
      if (document.getElementById('wishlistPageContainer')) {
        renderWishlistPage();
      }
    }
  };

  // -------------------------------------------------------------------------
  // GLOBAL CORE APPLICATION
  // -------------------------------------------------------------------------
  window.LuxeNestApp = {
    init: function () {
      this.initStickyHeader();
      this.initMobileNavigation();
      this.initGlobalSearch();
      this.initUserAccountModal();
      this.updateNavBadges();
      this.setActiveNavHighlight();

      // Page-specific initializers
      initHomePage();
      initServicesPage();
      initPortfolioPage();
      initStylesPage();
      initPackagesPage();
      initShopPage();
      initWishlistPage();
      initCartPage();
      initReviewsPage();
      initBlogPage();
      initContactPage();
      initConsultationPage();
    },

    initStickyHeader: function () {
      const header = document.getElementById('header');
      if (!header) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    },

    initMobileNavigation: function () {
      const menuBtn = document.getElementById('mobileMenuBtn');
      const drawer = document.getElementById('mobileDrawer');
      const drawerLinks = document.querySelectorAll('.drawer-link');

      if (!menuBtn || !drawer) return;

      menuBtn.addEventListener('click', () => {
        drawer.classList.toggle('open');
      });

      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
        });
      });
    },

    updateNavBadges: function () {
      const cartCount = window.LuxeNestCart.getCount();
      const wishlistCount = window.LuxeNestWishlist.getCount();

      document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'inline-flex' : 'none';
      });

      document.querySelectorAll('.wishlist-badge').forEach(badge => {
        badge.textContent = wishlistCount;
        badge.style.display = wishlistCount > 0 ? 'inline-flex' : 'none';
      });
    },

    setActiveNavHighlight: function () {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
          link.classList.add('active');
        }
      });
    },

    showToast: function (message) {
      let toast = document.getElementById('toastMsg');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastMsg';
        toast.className = 'toast-msg';
        toast.setAttribute('role', 'alert');
        document.body.appendChild(toast);
      }

      toast.innerHTML = message;
      toast.classList.add('show');

      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    },

    initGlobalSearch: function () {
      const searchBtns = document.querySelectorAll('.open-search-btn');
      const searchOverlay = document.getElementById('searchOverlay');
      const searchInput = document.getElementById('globalSearchInput');
      const searchClose = document.getElementById('searchCloseBtn');
      const searchResults = document.getElementById('searchResultsContainer');

      if (!searchOverlay || !searchInput) return;

      function openSearch() {
        searchOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
      }

      function closeSearch() {
        searchOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }

      searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
      if (searchClose) searchClose.addEventListener('click', closeSearch);

      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) closeSearch();
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('open')) {
          closeSearch();
        }
      });

      // Debounced search logic
      let debounceTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const query = searchInput.value.trim().toLowerCase();
          if (!query || !searchResults) {
            if (searchResults) searchResults.innerHTML = '';
            return;
          }

          const data = window.LuxeNestData;
          if (!data) return;

          let html = '<div class="search-results-list">';

          // Search pages
          const pages = [
            { name: 'Services', url: 'services.html', desc: '7 tailored interior design services' },
            { name: 'Portfolio', url: 'portfolio.html', desc: 'Curated residential architecture gallery' },
            { name: 'Design Styles', url: 'design-styles.html', desc: 'Explore 7 signature design philosophies' },
            { name: 'Packages & Pricing', url: 'packages.html', desc: 'Essential, Premium & Luxury transparent tiers' },
            { name: 'Shop Atelier', url: 'shop.html', desc: 'Luxury furniture, lighting, rugs & decor' },
            { name: 'Customer Reviews', url: 'reviews.html', desc: '180+ verified homeowner testimonials' },
            { name: 'Editorial Blog', url: 'blog.html', desc: 'Trends, design tips, and architectural insights' },
            { name: 'About LuxeNest', url: 'about.html', desc: 'Our story, design philosophy and team' },
            { name: 'Contact Ateliers', url: 'contact.html', desc: 'Jaipur, Mumbai, Delhi NCR & Bengaluru' },
            { name: 'Book a Consultation', url: 'consultation.html', desc: 'Reserve your personalized session' }
          ];

          const matchedPages = pages.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
          if (matchedPages.length > 0) {
            html += '<div class="search-section-title">Navigation & Pages</div>';
            matchedPages.forEach(p => {
              html += `
                <a href="${p.url}" class="search-result-item">
                  <div class="search-item-info">
                    <strong>${p.name}</strong>
                    <span>${p.desc}</span>
                  </div>
                  <span class="search-item-badge">Page</span>
                </a>
              `;
            });
          }

          // Search Products
          const matchedProducts = (data.products || []).filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
          ).slice(0, 4);

          if (matchedProducts.length > 0) {
            html += '<div class="search-section-title">Shop Collection</div>';
            matchedProducts.forEach(p => {
              html += `
                <a href="shop.html?search=${encodeURIComponent(p.name)}" class="search-result-item">
                  <img src="${p.image}" alt="${p.name}" class="search-item-thumb">
                  <div class="search-item-info">
                    <strong>${p.name}</strong>
                    <span>${p.category} • ₹${p.price.toLocaleString('en-IN')}</span>
                  </div>
                  <span class="search-item-badge">Shop</span>
                </a>
              `;
            });
          }

          // Search Portfolio
          const matchedProjects = (data.projects || []).filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.style.toLowerCase().includes(query) ||
            p.roomType.toLowerCase().includes(query)
          ).slice(0, 3);

          if (matchedProjects.length > 0) {
            html += '<div class="search-section-title">Portfolio Projects</div>';
            matchedProjects.forEach(p => {
              html += `
                <a href="portfolio.html?project=${p.id}" class="search-result-item">
                  <img src="${p.image}" alt="${p.title}" class="search-item-thumb">
                  <div class="search-item-info">
                    <strong>${p.title}</strong>
                    <span>${p.roomType} • ${p.style} (${p.location})</span>
                  </div>
                  <span class="search-item-badge">Portfolio</span>
                </a>
              `;
            });
          }

          if (matchedPages.length === 0 && matchedProducts.length === 0 && matchedProjects.length === 0) {
            html += '<div style="padding: 24px; text-align: center; color: var(--text-muted);">No matching designs or products found for "' + query + '".</div>';
          }

          html += '</div>';
          searchResults.innerHTML = html;
        }, 200);
      });
    },

    initUserAccountModal: function () {
      const userBtns = document.querySelectorAll('.open-user-btn');
      const userModal = document.getElementById('userAccountModal');
      const closeBtn = document.getElementById('userModalCloseBtn');

      if (!userModal) return;

      function openModal() {
        userModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        userModal.classList.remove('open');
        document.body.style.overflow = '';
      }

      userBtns.forEach(btn => btn.addEventListener('click', openModal));
      if (closeBtn) closeBtn.addEventListener('click', closeModal);

      userModal.addEventListener('click', (e) => {
        if (e.target === userModal) closeModal();
      });

      // Demo login toggle
      const loginForm = document.getElementById('userLoginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const emailInput = document.getElementById('userEmail');
          const email = emailInput ? emailInput.value : 'client@luxenest.com';
          writeStorage(USER_KEY, { email: email, name: email.split('@')[0], loggedIn: true });
          closeModal();
          window.LuxeNestApp.showToast(`✨ Welcome back, ${email.split('@')[0]}!`);
        });
      }
    }
  };

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: HOME PAGE (index.html)
  // -------------------------------------------------------------------------
  function initHomePage() {
    // Before / After Slider (Jaipur Heritage Home)
    const container = document.getElementById('comparisonSlider');
    const beforeImage = document.getElementById('beforeImage');
    const handle = document.getElementById('sliderHandle');

    if (container && beforeImage && handle) {
      let isDragging = false;
      function updateSliderPosition(clientX) {
        const rect = container.getBoundingClientRect();
        let offsetX = clientX - rect.left;
        let percentage = (offsetX / rect.width) * 100;
        percentage = Math.max(5, Math.min(95, percentage));
        beforeImage.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
      }

      container.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSliderPosition(e.clientX);
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSliderPosition(e.clientX);
      });
      window.addEventListener('mouseup', () => { isDragging = false; });

      container.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchend', () => { isDragging = false; });
    }

    // Cost Estimator
    initCostEstimator();

    // Style Quiz
    initStyleQuiz();
  }

  function initCostEstimator() {
    const configChips = document.querySelectorAll('#configChips .chip-btn');
    const areaSlider = document.getElementById('areaSlider');
    const areaValueDisplay = document.getElementById('areaValueDisplay');
    const styleChips = document.querySelectorAll('#styleChips .chip-btn');
    const tierChips = document.querySelectorAll('#tierChips .chip-btn');
    const priceDisplay = document.getElementById('estimatedPrice');
    const durationDisplay = document.getElementById('estimatedDuration');

    if (!areaSlider || !priceDisplay) return;

    let currentArea = 1200;
    let currentStyleMultiplier = 1.0;
    let currentTierMultiplier = 1.0;

    configChips.forEach(chip => {
      chip.addEventListener('click', () => {
        configChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const type = chip.getAttribute('data-type');
        if (type === '1bhk') areaSlider.value = 750;
        else if (type === '2bhk') areaSlider.value = 1200;
        else if (type === '3bhk') areaSlider.value = 1850;
        else if (type === '4bhk') areaSlider.value = 2800;
        currentArea = parseInt(areaSlider.value, 10);
        recalculateEstimate();
      });
    });

    areaSlider.addEventListener('input', (e) => {
      currentArea = parseInt(e.target.value, 10);
      recalculateEstimate();
    });

    styleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        styleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentStyleMultiplier = parseFloat(chip.getAttribute('data-multiplier'));
        recalculateEstimate();
      });
    });

    tierChips.forEach(chip => {
      chip.addEventListener('click', () => {
        tierChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentTierMultiplier = parseFloat(chip.getAttribute('data-tiermult'));
        recalculateEstimate();
      });
    });

    function recalculateEstimate() {
      if (areaValueDisplay) {
        areaValueDisplay.textContent = `${currentArea.toLocaleString('en-IN')} sq ft`;
      }
      const baseRatePerSqFt = 720;
      const totalBase = currentArea * baseRatePerSqFt * currentStyleMultiplier * currentTierMultiplier;
      const lowLakhs = (totalBase * 0.92 / 100000).toFixed(1);
      const highLakhs = (totalBase * 1.08 / 100000).toFixed(1);

      priceDisplay.innerHTML = `<span class="currency">₹</span>${lowLakhs} – ${highLakhs} <span style="font-size: 1.2rem; font-family: var(--font-sans); font-weight: 500;">Lakhs</span>`;

      let days = 60;
      if (currentArea < 1000) days = 60;
      else if (currentArea <= 1500) days = 80;
      else if (currentArea <= 2500) days = 110;
      else days = 140;

      const months = (days / 30).toFixed(0);
      if (durationDisplay) {
        durationDisplay.textContent = `Timeline: ~${days} Days (${months} Months Execution)`;
      }
    }

    recalculateEstimate();
  }

  function initStyleQuiz() {
    const card1 = document.getElementById('questionCard1');
    const card2 = document.getElementById('questionCard2');
    const card3 = document.getElementById('questionCard3');
    const resultCard = document.getElementById('quizResult');
    const retakeBtn = document.getElementById('retakeQuizBtn');

    if (!card1 || !resultCard) return;

    const scores = { minimalist: 0, luxury: 0, indian: 0, contemporary: 0, modern: 0, bohemian: 0 };

    function attachListeners(card, nextCard, pill, nextPill) {
      card.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const pt = opt.getAttribute('data-points');
          if (pt && scores[pt] !== undefined) scores[pt]++;
          card.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');

          setTimeout(() => {
            card.style.display = 'none';
            if (nextCard) {
              nextCard.style.display = 'block';
              if (nextPill) nextPill.classList.add('active');
            } else {
              resultCard.classList.add('active');
            }
          }, 250);
        });
      });
    }

    attachListeners(card1, card2, document.getElementById('quizStep1'), document.getElementById('quizStep2'));
    attachListeners(card2, card3, document.getElementById('quizStep2'), document.getElementById('quizStep3'));
    attachListeners(card3, null, document.getElementById('quizStep3'), null);

    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        for (let k in scores) scores[k] = 0;
        resultCard.classList.remove('active');
        if (card3) card3.style.display = 'none';
        if (card2) card2.style.display = 'none';
        card1.style.display = 'block';
        document.querySelectorAll('.quiz-step-pill').forEach((p, idx) => {
          p.classList.toggle('active', idx === 0);
        });
        document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      });
    }
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: SERVICES PAGE (services.html)
  // -------------------------------------------------------------------------
  function initServicesPage() {
    const container = document.getElementById('servicesListGrid');
    if (!container) return;

    const data = window.LuxeNestData.services;
    container.innerHTML = data.map(serv => `
      <article class="service-card">
        <div class="service-img-wrap">
          <img src="${serv.image}" alt="${serv.title}" loading="lazy">
        </div>
        <div class="service-body">
          <span class="service-tagline">${serv.tagline}</span>
          <h3>${serv.title}</h3>
          <p>${serv.description}</p>
          <ul class="service-deliverables">
            ${serv.deliverables.map(d => `<li><span class="check-mark">✓</span> ${d}</li>`).join('')}
          </ul>
          <div class="service-timeline-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${serv.timeline}</span>
          </div>
          <div class="service-actions">
            <button class="btn btn-outline btn-sm learn-more-serv-btn" data-id="${serv.id}">Learn More</button>
            <a href="consultation.html?service=${encodeURIComponent(serv.title)}" class="btn btn-gold btn-sm">Get Started</a>
          </div>
        </div>
      </article>
    `).join('');

    // Service Detail Modal
    const modal = document.getElementById('serviceDetailModal');
    const modalTitle = document.getElementById('servModalTitle');
    const modalContent = document.getElementById('servModalContent');
    const modalClose = document.getElementById('servModalClose');

    if (modal && modalTitle && modalContent) {
      document.querySelectorAll('.learn-more-serv-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const serv = data.find(s => s.id === id);
          if (!serv) return;

          modalTitle.textContent = serv.title;
          modalContent.innerHTML = `
            <img src="${serv.image}" alt="${serv.title}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:20px;">
            <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); margin-bottom:18px;">${serv.description}</p>
            <h5 style="margin-bottom:10px; font-family:var(--font-sans); font-weight:700;">Standard Deliverables:</h5>
            <ul style="list-style:none; padding:0; margin-bottom:24px;">
              ${serv.deliverables.map(d => `<li style="padding:6px 0; border-bottom:1px solid var(--border-subtle); display:flex; gap:10px;"><span style="color:var(--accent-gold-dark);">✔</span> ${d}</li>`).join('')}
            </ul>
            <div style="background:var(--bg-surface-elevated); padding:16px; border-radius:var(--radius-sm); margin-bottom:24px;">
              <strong>Typical Project Schedule:</strong> ${serv.timeline}
            </div>
            <a href="consultation.html?service=${encodeURIComponent(serv.title)}" class="btn btn-gold" style="width:100%;">Book Consultation for ${serv.title}</a>
          `;
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });

      if (modalClose) {
        modalClose.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: PORTFOLIO PAGE (portfolio.html)
  // -------------------------------------------------------------------------
  function initPortfolioPage() {
    const container = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('#portfolioFilters .filter-btn');
    if (!container) return;

    const data = window.LuxeNestData.projects;

    function renderProjects(filterCategory) {
      const filtered = (filterCategory === 'All' || !filterCategory)
        ? data
        : data.filter(p => p.category === filterCategory || p.roomType === filterCategory);

      container.innerHTML = filtered.map(proj => `
        <article class="portfolio-card" data-category="${proj.category}">
          <div class="portfolio-img-wrap">
            <img src="${proj.image}" alt="${proj.title}" loading="lazy">
            <span class="portfolio-badge">${proj.style}</span>
          </div>
          <div class="portfolio-body">
            <div class="portfolio-meta-row">
              <span class="portfolio-room">${proj.roomType}</span>
              <span class="portfolio-loc">📍 ${proj.location}</span>
            </div>
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="portfolio-footer">
              <button class="btn btn-outline btn-sm view-project-btn" data-id="${proj.id}">View Project</button>
              <span class="portfolio-area">${proj.area}</span>
            </div>
          </div>
        </article>
      `).join('');

      attachProjectModalListeners();
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.getAttribute('data-filter'));
      });
    });

    renderProjects('All');

    // Project Detail Modal
    function attachProjectModalListeners() {
      const modal = document.getElementById('projectDetailModal');
      const title = document.getElementById('projectModalTitle');
      const body = document.getElementById('projectModalBody');
      const close = document.getElementById('projectModalClose');

      if (!modal || !title || !body) return;

      document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const proj = data.find(p => p.id === id);
          if (!proj) return;

          title.textContent = proj.title;
          body.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
              <img src="${proj.image}" alt="${proj.title}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-sm);">
              <div>
                <div style="font-size:0.8rem; text-transform:uppercase; color:var(--accent-gold-dark); font-weight:700;">${proj.roomType} • ${proj.style}</div>
                <h4 style="font-size:1.4rem; margin:6px 0 14px 0;">${proj.location}</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--bg-main); padding:14px; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:14px;">
                  <div><strong>Area:</strong> ${proj.area}</div>
                  <div><strong>Duration:</strong> ${proj.duration}</div>
                  <div><strong>Investment:</strong> ${proj.budget}</div>
                  <div><strong>Warranty:</strong> 10-Year Active</div>
                </div>
                <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.6;">${proj.description}</p>
              </div>
            </div>
            <h5 style="margin-bottom:12px; font-family:var(--font-sans); font-weight:700;">Signature Architectural Highlights:</h5>
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px;">
              ${proj.highlights.map(h => `<span style="background:var(--accent-gold-subtle); color:var(--accent-gold-dark); font-size:0.8rem; padding:4px 12px; border-radius:var(--radius-full); font-weight:600;">${h}</span>`).join('')}
            </div>
            <div style="display:flex; gap:14px; justify-content:flex-end;">
              <a href="consultation.html?project=${encodeURIComponent(proj.title)}" class="btn btn-gold">Design a Space Like This</a>
            </div>
          `;
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });

      if (close) {
        close.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: DESIGN STYLES PAGE (design-styles.html)
  // -------------------------------------------------------------------------
  function initStylesPage() {
    const container = document.getElementById('stylesPageGrid');
    if (!container) return;

    const data = window.LuxeNestData.styles;
    container.innerHTML = data.map(style => `
      <article class="design-style-card">
        <div class="style-card-image">
          <img src="${style.image}" alt="${style.name} Interior Style" loading="lazy">
        </div>
        <div class="style-card-content">
          <h3>${style.name}</h3>
          <p>${style.description}</p>
          <div class="palette-swatches-wrap">
            <span class="palette-label">Signature Palette:</span>
            <div class="swatches-row">
              ${style.palette.map(c => `<span class="swatch-dot" style="background-color:${c}" title="${c}"></span>`).join('')}
            </div>
          </div>
          <div class="style-elements-pills">
            ${style.elements.map(el => `<span class="element-pill">${el}</span>`).join('')}
          </div>
          <a href="portfolio.html" class="btn btn-outline btn-sm" style="margin-top:16px;">Explore ${style.name} Projects</a>
        </div>
      </article>
    `).join('');
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: PACKAGES PAGE (packages.html)
  // -------------------------------------------------------------------------
  function initPackagesPage() {
    const container = document.getElementById('packagesCardsRow');
    if (!container) return;

    const data = window.LuxeNestData.packages;
    container.innerHTML = data.map(pkg => `
      <div class="package-tier-card ${pkg.featured ? 'featured-package' : ''}">
        ${pkg.featured ? '<span class="pkg-ribbon">Most Popular</span>' : ''}
        <div class="pkg-header">
          <span class="pkg-badge">${pkg.badge}</span>
          <h3>${pkg.name}</h3>
          <p class="pkg-tagline">${pkg.tagline}</p>
          <div class="pkg-price-row">
            <span class="price-from">Starting from</span>
            <div class="pkg-amount">${pkg.startingPrice}</div>
            <span class="pkg-demo-note">*Sample price based on 2BHK</span>
          </div>
        </div>
        <ul class="pkg-features-list">
          ${pkg.deliverables.map(d => `<li><span class="gold-check">✓</span> ${d}</li>`).join('')}
        </ul>
        <div class="pkg-action-wrap">
          <a href="consultation.html?package=${encodeURIComponent(pkg.name)}" class="btn ${pkg.featured ? 'btn-gold' : 'btn-outline'}" style="width:100%;">
            Choose ${pkg.name}
          </a>
        </div>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: SHOP PAGE (shop.html)
  // -------------------------------------------------------------------------
  function initShopPage() {
    const container = document.getElementById('shopProductsGrid');
    const categoryChips = document.querySelectorAll('#shopCategoryFilters .chip-btn');
    const searchInput = document.getElementById('shopSearchInput');
    const sortSelect = document.getElementById('shopSortSelect');
    const priceRange = document.getElementById('shopPriceRange');
    const priceDisplay = document.getElementById('shopPriceDisplay');
    const resultsCount = document.getElementById('shopResultsCount');

    if (!container) return;

    const products = window.LuxeNestData.products;
    let currentCategory = 'All';
    let searchQuery = '';
    let maxPrice = 160000;
    let currentSort = 'featured';

    function render() {
      let filtered = products.filter(p => {
        const matchesCat = (currentCategory === 'All' || p.category === currentCategory);
        const matchesSearch = (!searchQuery || p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
        const matchesPrice = p.price <= maxPrice;
        return matchesCat && matchesSearch && matchesPrice;
      });

      // Sorting
      if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      if (resultsCount) {
        resultsCount.textContent = `Showing ${filtered.length} curated designs`;
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px;">
            <h3>No products found</h3>
            <p style="color:var(--text-muted); margin:10px 0 20px 0;">Try adjusting your search terms or price filter.</p>
            <button class="btn btn-gold btn-sm" id="resetFiltersBtn">Reset Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('resetFiltersBtn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            currentCategory = 'All';
            searchQuery = '';
            maxPrice = 160000;
            if (searchInput) searchInput.value = '';
            if (priceRange) priceRange.value = 160000;
            if (priceDisplay) priceDisplay.textContent = '₹1,60,000';
            categoryChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-cat') === 'All'));
            render();
          });
        }
        return;
      }

      container.innerHTML = filtered.map(prod => {
        const inWishlist = window.LuxeNestWishlist.has(prod.id);
        return `
          <div class="product-card">
            <div class="product-img-wrap">
              <img src="${prod.image}" alt="${prod.name}" loading="lazy">
              <button class="wishlist-heart-btn ${inWishlist ? 'active' : ''}" data-wishlist-id="${prod.id}" aria-label="Toggle Wishlist">
                <svg viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button class="quick-view-trigger-btn" data-prod-id="${prod.id}">Quick View</button>
            </div>
            <div class="product-body">
              <span class="product-category-tag">${prod.category}</span>
              <h4 class="product-title">${prod.name}</h4>
              <div class="product-rating-row">
                <span class="product-stars">★★★★★</span>
                <span class="rating-num">(${prod.rating})</span>
              </div>
              <div class="product-price-row">
                <span class="product-price">₹${prod.price.toLocaleString('en-IN')}</span>
                ${prod.originalPrice ? `<span class="product-orig-price">₹${prod.originalPrice.toLocaleString('en-IN')}</span>` : ''}
              </div>
              <div class="product-actions-group">
                <button class="btn btn-gold btn-sm add-to-cart-btn" data-prod-id="${prod.id}" style="width:100%;">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      attachProductActionListeners(filtered);
    }

    function attachProductActionListeners(filtered) {
      // Add to Cart buttons
      container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-prod-id');
          const p = products.find(item => item.id === id);
          if (p) window.LuxeNestCart.addItem(p, 1);
        });
      });

      // Wishlist toggle buttons
      container.querySelectorAll('.wishlist-heart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-wishlist-id');
          const p = products.find(item => item.id === id);
          if (p) {
            window.LuxeNestWishlist.toggle(p);
            btn.classList.toggle('active', window.LuxeNestWishlist.has(p.id));
          }
        });
      });

      // Quick View Modal
      const modal = document.getElementById('productQuickViewModal');
      const body = document.getElementById('quickViewBody');
      const close = document.getElementById('quickViewClose');

      if (modal && body) {
        container.querySelectorAll('.quick-view-trigger-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-prod-id');
            const p = products.find(item => item.id === id);
            if (!p) return;

            const inWishlist = window.LuxeNestWishlist.has(p.id);

            body.innerHTML = `
              <div class="quick-view-grid">
                <div class="quick-view-img">
                  <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="quick-view-details">
                  <span class="product-category-tag">${p.category}</span>
                  <h3 style="font-size:1.6rem; margin:6px 0 10px 0;">${p.name}</h3>
                  <div class="product-rating-row" style="margin-bottom:14px;">
                    <span class="product-stars">★★★★★</span>
                    <span class="rating-num">${p.rating} (${p.reviewsCount} customer reviews)</span>
                  </div>
                  <div class="product-price-row" style="margin-bottom:18px;">
                    <span style="font-size:1.8rem; font-family:var(--font-serif); font-weight:700; color:var(--text-main);">₹${p.price.toLocaleString('en-IN')}</span>
                    ${p.originalPrice ? `<span class="product-orig-price" style="font-size:1.1rem;">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                  </div>
                  <p style="font-size:0.95rem; line-height:1.7; color:var(--text-muted); margin-bottom:20px;">${p.description}</p>
                  <div style="background:var(--bg-main); padding:14px; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:24px;">
                    <div style="margin-bottom:6px;"><strong>Dimensions:</strong> ${p.dimensions}</div>
                    <div><strong>Materials:</strong> ${p.material}</div>
                  </div>
                  <div style="display:flex; gap:12px; align-items:center;">
                    <input type="number" id="quickViewQty" value="1" min="1" max="10" style="width:70px; padding:10px; border:1px solid var(--border-medium); border-radius:var(--radius-sm); text-align:center;">
                    <button class="btn btn-gold" id="quickViewAddBtn" style="flex:1;">Add to Cart</button>
                    <button class="btn btn-outline" id="quickViewWishBtn" style="padding:12px;">${inWishlist ? '❤️ Saved' : '🤍 Wishlist'}</button>
                  </div>
                </div>
              </div>
            `;

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';

            document.getElementById('quickViewAddBtn').addEventListener('click', () => {
              const q = parseInt(document.getElementById('quickViewQty').value, 10) || 1;
              window.LuxeNestCart.addItem(p, q);
              modal.classList.remove('open');
              document.body.style.overflow = '';
            });

            document.getElementById('quickViewWishBtn').addEventListener('click', (e) => {
              window.LuxeNestWishlist.toggle(p);
              const nowIn = window.LuxeNestWishlist.has(p.id);
              e.target.textContent = nowIn ? '❤️ Saved' : '🤍 Wishlist';
              render();
            });
          });
        });

        if (close) {
          close.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          });
        }
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }
        });
      }
    }

    // Category Filter Chips
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.getAttribute('data-cat');
        render();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        render();
      });
    }

    // Price range
    if (priceRange) {
      priceRange.addEventListener('input', () => {
        maxPrice = parseInt(priceRange.value, 10);
        if (priceDisplay) priceDisplay.textContent = `₹${maxPrice.toLocaleString('en-IN')}`;
        render();
      });
    }

    // Sorting
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        render();
      });
    }

    render();
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: WISHLIST PAGE (wishlist.html)
  // -------------------------------------------------------------------------
  function initWishlistPage() {
    const container = document.getElementById('wishlistPageContainer');
    if (!container) return;
    renderWishlistPage();
  }

  function renderWishlistPage() {
    const container = document.getElementById('wishlistPageContainer');
    if (!container) return;

    const items = window.LuxeNestWishlist.getItems();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">🤍</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Explore our bespoke collection of handcrafted furniture, architectural lighting, and artisanal home decor.</p>
          <a href="shop.html" class="btn btn-gold" style="margin-top:20px;">Explore Collection</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="wishlist-header-bar">
        <span>You have saved <strong>${items.length}</strong> items in your private wishlist</span>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-outline btn-sm" id="moveAllToCartBtn">Move All to Cart</button>
          <button class="btn btn-outline btn-sm" id="clearWishlistBtn">Clear Wishlist</button>
        </div>
      </div>
      <div class="wishlist-grid">
        ${items.map(item => `
          <div class="wishlist-card">
            <img src="${item.image}" alt="${item.name}" class="wishlist-card-img">
            <div class="wishlist-card-body">
              <span class="product-category-tag">${item.category}</span>
              <h4>${item.name}</h4>
              <div class="wishlist-price">₹${item.price.toLocaleString('en-IN')}</div>
              <div class="wishlist-actions-row">
                <button class="btn btn-gold btn-sm move-item-to-cart" data-id="${item.id}">Add to Cart</button>
                <button class="btn btn-outline btn-sm remove-from-wishlist" data-id="${item.id}">Remove</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Action listeners
    container.querySelectorAll('.move-item-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = items.find(i => i.id === id);
        if (item) {
          window.LuxeNestCart.addItem(item, 1);
          window.LuxeNestWishlist.remove(id);
        }
      });
    });

    container.querySelectorAll('.remove-from-wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        window.LuxeNestWishlist.remove(id);
      });
    });

    const moveAllBtn = document.getElementById('moveAllToCartBtn');
    if (moveAllBtn) {
      moveAllBtn.addEventListener('click', () => {
        items.forEach(item => window.LuxeNestCart.addItem(item, 1));
        items.forEach(item => window.LuxeNestWishlist.remove(item.id));
        window.LuxeNestApp.showToast('All wishlist items moved to your shopping bag!');
      });
    }

    const clearBtn = document.getElementById('clearWishlistBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        items.forEach(item => window.LuxeNestWishlist.remove(item.id));
      });
    }
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: CART PAGE (cart.html)
  // -------------------------------------------------------------------------
  function initCartPage() {
    const container = document.getElementById('cartPageContainer');
    if (!container) return;
    renderCartPage();
  }

  function renderCartPage() {
    const container = document.getElementById('cartPageContainer');
    if (!container) return;

    const items = window.LuxeNestCart.getItems();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">🛍️</div>
          <h2>Your Shopping Bag is Empty</h2>
          <p>You have not added any pieces to your bag yet. Discover our curated collections for your residence.</p>
          <a href="shop.html" class="btn btn-gold" style="margin-top:20px;">Explore Collection</a>
        </div>
      `;
      return;
    }

    const subtotal = window.LuxeNestCart.getSubtotal();
    const isFreeShipping = subtotal >= 20000;
    const shippingCost = isFreeShipping ? 0 : 2500;
    const gstAmount = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + shippingCost + gstAmount;

    container.innerHTML = `
      <div class="cart-layout-grid">
        <!-- Cart Items List -->
        <div class="cart-items-panel">
          <div class="cart-table-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>
          <div class="cart-items-list">
            ${items.map(item => `
              <div class="cart-item-row">
                <div class="cart-item-product">
                  <img src="${item.image}" alt="${item.name}">
                  <div>
                    <span class="product-category-tag">${item.category}</span>
                    <h5>${item.name}</h5>
                    <span class="cart-unit-price">₹${item.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div class="cart-qty-controls">
                  <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
                  <span class="qty-val">${item.qty}</span>
                  <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-total">
                  ₹${(item.price * item.qty).toLocaleString('en-IN')}
                </div>
                <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove item">×</button>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center;">
            <a href="shop.html" class="btn btn-outline btn-sm">← Continue Shopping</a>
            <button class="btn btn-outline btn-sm" id="emptyCartBtn">Clear Bag</button>
          </div>
        </div>

        <!-- Order Summary Card -->
        <div class="order-summary-card">
          <h4>Order Summary</h4>
          <div class="summary-line">
            <span>Subtotal</span>
            <span>₹${subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div class="summary-line">
            <span>Estimated Shipping</span>
            <span>${isFreeShipping ? '<strong style="color:#059669;">Free Delivery</strong>' : '₹' + shippingCost.toLocaleString('en-IN')}</span>
          </div>
          <div class="summary-line">
            <span>GST (18% Included)</span>
            <span>₹${gstAmount.toLocaleString('en-IN')}</span>
          </div>
          ${isFreeShipping ? '<p style="font-size:0.75rem; color:#059669; margin-top:4px;">✨ You qualify for complimentary white-glove delivery!</p>' : ''}
          <hr style="border:none; border-top:1px solid var(--border-medium); margin:16px 0;">
          <div class="summary-total-line">
            <span>Grand Total</span>
            <span class="total-amount">₹${grandTotal.toLocaleString('en-IN')}</span>
          </div>

          <!-- Promo Code -->
          <div class="promo-box" style="margin:20px 0;">
            <div style="display:flex; gap:8px;">
              <input type="text" id="promoInput" placeholder="Try LUXE10" class="form-control" style="font-size:0.85rem;">
              <button class="btn btn-outline btn-sm" id="applyPromoBtn">Apply</button>
            </div>
            <span id="promoStatusMsg" style="font-size:0.75rem; display:block; margin-top:6px;"></span>
          </div>

          <button class="btn btn-gold" id="proceedCheckoutBtn" style="width:100%; padding:14px;">Proceed to Checkout</button>
          <p style="font-size:0.72rem; color:var(--text-muted); text-align:center; margin-top:14px;">
            🔒 256-Bit Encrypted Secure Checkout • 10-Year Warranty
          </p>
        </div>
      </div>
    `;

    // Quantity listeners
    container.querySelectorAll('.dec-qty').forEach(btn => {
      btn.addEventListener('click', () => window.LuxeNestCart.updateQty(btn.getAttribute('data-id'), -1));
    });

    container.querySelectorAll('.inc-qty').forEach(btn => {
      btn.addEventListener('click', () => window.LuxeNestCart.updateQty(btn.getAttribute('data-id'), 1));
    });

    container.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => window.LuxeNestCart.removeItem(btn.getAttribute('data-id')));
    });

    const emptyBtn = document.getElementById('emptyCartBtn');
    if (emptyBtn) {
      emptyBtn.addEventListener('click', () => window.LuxeNestCart.clear());
    }

    // Promo code handler
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoInput = document.getElementById('promoInput');
    const promoMsg = document.getElementById('promoStatusMsg');

    if (applyPromoBtn && promoInput && promoMsg) {
      applyPromoBtn.addEventListener('click', () => {
        if (promoInput.value.trim().toUpperCase() === 'LUXE10') {
          promoMsg.style.color = '#059669';
          promoMsg.textContent = '🎉 10% Haute Luxe discount applied successfully!';
        } else {
          promoMsg.style.color = '#dc2626';
          promoMsg.textContent = 'Invalid promo code. Please enter LUXE10.';
        }
      });
    }

    // Checkout Modal
    const checkoutBtn = document.getElementById('proceedCheckoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutClose = document.getElementById('checkoutModalClose');
    const checkoutForm = document.getElementById('checkoutForm');

    if (checkoutBtn && checkoutModal) {
      checkoutBtn.addEventListener('click', () => {
        checkoutModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });

      if (checkoutClose) {
        checkoutClose.addEventListener('click', () => {
          checkoutModal.classList.remove('open');
          document.body.style.overflow = '';
        });
      }

      if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const orderId = 'LN-' + Math.floor(100000 + Math.random() * 900000);
          checkoutModal.classList.remove('open');
          document.body.style.overflow = '';
          // Meta Pixel Event Tracking
          if (typeof fbq === 'function') {
            fbq('track', 'Purchase', {
              value: grandTotal,
              currency: 'INR',
              content_name: 'Luxury Interior Order',
              order_id: orderId
            });
          }

          window.LuxeNestCart.clear();

          // Show order confirmed modal
          const confirmModal = document.getElementById('orderConfirmedModal');
          const orderIdDisplay = document.getElementById('confirmedOrderId');
          if (confirmModal && orderIdDisplay) {
            orderIdDisplay.textContent = orderId;
            confirmModal.classList.add('open');
          } else {
            window.LuxeNestApp.showToast(`🎉 Order ${orderId} confirmed! White-glove concierge will contact you.`);
          }
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: REVIEWS PAGE (reviews.html)
  // -------------------------------------------------------------------------
  function initReviewsPage() {
    const container = document.getElementById('reviewsGridContainer');
    const writeBtn = document.getElementById('openWriteReviewBtn');
    const modal = document.getElementById('writeReviewModal');
    const close = document.getElementById('writeReviewClose');
    const form = document.getElementById('writeReviewForm');

    if (!container) return;

    const reviews = window.LuxeNestData.reviews;

    function renderReviews() {
      container.innerHTML = reviews.map(rev => `
        <article class="review-card-full">
          <div class="rev-card-header">
            <div class="rev-stars">${'★'.repeat(rev.rating)}</div>
            <span class="rev-date">${rev.date}</span>
          </div>
          <p class="rev-text">"${rev.text}"</p>
          <div class="rev-project-badge">📍 ${rev.project} (${rev.service})</div>
          <div class="rev-client-footer">
            <img src="${rev.avatar}" alt="${rev.name}" class="client-avatar">
            <div>
              <h5 style="margin:0; font-size:0.95rem;">${rev.name}</h5>
              <span style="font-size:0.75rem; color:var(--text-muted);">${rev.location}</span>
            </div>
          </div>
        </article>
      `).join('');
    }

    renderReviews();

    if (writeBtn && modal) {
      writeBtn.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });

      if (close) {
        close.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('revName').value;
          const location = document.getElementById('revLocation').value;
          const text = document.getElementById('revComment').value;
          const service = document.getElementById('revService').value;

          reviews.unshift({
            id: 'rev-' + Date.now(),
            name: name,
            location: location,
            project: 'Custom Residence',
            service: service,
            rating: 5,
            date: 'Just now',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            text: text
          });

          modal.classList.remove('open');
          document.body.style.overflow = '';
          form.reset();
          renderReviews();
          window.LuxeNestApp.showToast('✨ Thank you! Your review has been submitted.');
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: BLOG PAGE (blog.html)
  // -------------------------------------------------------------------------
  function initBlogPage() {
    const container = document.getElementById('blogArticlesGrid');
    const filterBtns = document.querySelectorAll('#blogCategoryFilters .chip-btn');
    const modal = document.getElementById('articleReaderModal');
    const readerTitle = document.getElementById('articleReaderTitle');
    const readerMeta = document.getElementById('articleReaderMeta');
    const readerBody = document.getElementById('articleReaderBody');
    const close = document.getElementById('articleReaderClose');

    if (!container) return;

    const articles = window.LuxeNestData.articles;

    function renderArticles(cat) {
      const filtered = (cat === 'All' || !cat) ? articles : articles.filter(a => a.category === cat);

      container.innerHTML = filtered.map(art => `
        <article class="blog-card">
          <div class="blog-img-wrap">
            <img src="${art.image}" alt="${art.title}" loading="lazy">
            <span class="blog-category-badge">${art.category}</span>
          </div>
          <div class="blog-body">
            <div class="blog-meta-line">
              <span>${art.date}</span> • <span>${art.readTime}</span>
            </div>
            <h3>${art.title}</h3>
            <p>${art.excerpt}</p>
            <button class="read-article-btn" data-id="${art.id}">Read Full Article →</button>
          </div>
        </article>
      `).join('');

      // Attach article reader modal
      container.querySelectorAll('.read-article-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const art = articles.find(a => a.id === id);
          if (!art || !modal) return;

          readerTitle.textContent = art.title;
          readerMeta.textContent = `By ${art.author} • ${art.date} • ${art.readTime}`;
          readerBody.innerHTML = `
            <img src="${art.image}" alt="${art.title}" style="width:100%; height:320px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:24px;">
            <div class="editorial-prose" style="line-height:1.8; font-size:1.05rem; color:var(--text-main);">
              ${art.content}
            </div>
            <div style="margin-top:36px; padding:24px; background:var(--bg-main); border-radius:var(--radius-sm); border:1px solid var(--border-gold);">
              <h5 style="margin-bottom:6px;">Inspired by this design philosophy?</h5>
              <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">Our architects can bring these exact lighting and spatial principles into your residence.</p>
              <a href="consultation.html" class="btn btn-gold btn-sm">Discuss with Principal Architect</a>
            </div>
          `;
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderArticles(btn.getAttribute('data-cat'));
      });
    });

    if (close && modal) {
      close.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    renderArticles('All');
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: CONTACT PAGE (contact.html)
  // -------------------------------------------------------------------------
  function initContactPage() {
    const form = document.getElementById('contactPageForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Meta Pixel Event Tracking
      if (typeof fbq === 'function') {
        fbq('track', 'Contact');
      }
      form.reset();
      window.LuxeNestApp.showToast('🎉 Thank you! Your inquiry has been sent. Our team will contact you within 4 business hours.');
    });
  }

  // -------------------------------------------------------------------------
  // PAGE INITIALIZER: CONSULTATION PAGE (consultation.html)
  // -------------------------------------------------------------------------
  function initConsultationPage() {
    const form = document.getElementById('consultationPageForm');
    const modal = document.getElementById('consultationSuccessModal');
    const modalRef = document.getElementById('consultationRefId');
    const modalClose = document.getElementById('consultationSuccessClose');

    if (!form) return;

    // URL parameter auto-fill
    const params = new URLSearchParams(window.location.search);
    const preService = params.get('service');
    const prePackage = params.get('package');
    const preProject = params.get('project');

    const notesField = document.getElementById('consultationNotes');
    if (notesField) {
      if (preService) notesField.value = `Inquiring regarding: ${preService}`;
      else if (prePackage) notesField.value = `Selected tier: ${prePackage} Package`;
      else if (preProject) notesField.value = `Inspired by project: ${preProject}`;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const refId = 'LN-CONS-' + Math.floor(10000 + Math.random() * 90000);

      // Meta Pixel Event Tracking
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'Consultation Reservation',
          currency: 'INR'
        });
      }

      if (modal && modalRef) {
        modalRef.textContent = refId;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        window.LuxeNestApp.showToast(`🎉 Consultation reserved! Reference #${refId}. Concierge will connect shortly.`);
      }
      form.reset();
    });

    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  // Execute once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.LuxeNestApp.init();
  });

})();
