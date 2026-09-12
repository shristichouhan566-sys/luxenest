/**
 * LuxeNest — Luxury Interior Architecture & Design System
 * Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initComparisonSlider();
  initStyleFilters();
  initCostEstimator();
  initStyleQuiz();
  initConsultationModal();
});

/* ==========================================================================
   1. Sticky Header & Mobile Drawer
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileNavigation() {
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
}

/* ==========================================================================
   2. Before & After Renovation Slider (Jaipur Heritage Home)
   ========================================================================== */
function initComparisonSlider() {
  const container = document.getElementById('comparisonSlider');
  const beforeImage = document.getElementById('beforeImage');
  const handle = document.getElementById('sliderHandle');

  if (!container || !beforeImage || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Constrain between 5% and 95%
    percentage = Math.max(5, Math.min(95, percentage));

    beforeImage.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events for Mobile / Tablet
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   3. Style Gallery Category Filter
   ========================================================================== */
function initStyleFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.style-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive Interior Cost Estimator
   ========================================================================== */
function initCostEstimator() {
  const configChips = document.querySelectorAll('#configChips .chip-btn');
  const areaSlider = document.getElementById('areaSlider');
  const areaValueDisplay = document.getElementById('areaValueDisplay');
  const styleChips = document.querySelectorAll('#styleChips .chip-btn');
  const tierChips = document.querySelectorAll('#tierChips .chip-btn');

  const priceDisplay = document.getElementById('estimatedPrice');
  const durationDisplay = document.getElementById('estimatedDuration');
  const breakdownCarpentry = document.getElementById('breakdownCarpentry');
  const breakdownCivil = document.getElementById('breakdownCivil');
  const breakdownElectrical = document.getElementById('breakdownElectrical');
  const breakdownFurnishing = document.getElementById('breakdownFurnishing');

  let currentArea = 1200;
  let currentStyleMultiplier = 1.0;
  let currentTierMultiplier = 1.0;

  // Configuration chip selection
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

  // Slider change
  if (areaSlider) {
    areaSlider.addEventListener('input', (e) => {
      currentArea = parseInt(e.target.value, 10);
      recalculateEstimate();
    });
  }

  // Style chips selection
  styleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      styleChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentStyleMultiplier = parseFloat(chip.getAttribute('data-multiplier'));
      recalculateEstimate();
    });
  });

  // Tier chips selection
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

    // Base cost per sq ft in INR (₹650 base for luxury turnkey interior works)
    const baseRatePerSqFt = 720;
    const totalBase = currentArea * baseRatePerSqFt * currentStyleMultiplier * currentTierMultiplier;

    const lowLakhs = (totalBase * 0.92 / 100000).toFixed(1);
    const highLakhs = (totalBase * 1.08 / 100000).toFixed(1);
    const medianLakhs = (totalBase / 100000);

    if (priceDisplay) {
      priceDisplay.innerHTML = `<span class="currency">₹</span>${lowLakhs} – ${highLakhs} <span style="font-size: 1.2rem; font-family: var(--font-sans); font-weight: 500;">Lakhs</span>`;
    }

    // Duration calculation
    let days = 60;
    if (currentArea < 1000) days = 60;
    else if (currentArea <= 1500) days = 80;
    else if (currentArea <= 2500) days = 110;
    else days = 140;

    const months = (days / 30).toFixed(0);
    if (durationDisplay) {
      durationDisplay.textContent = `Timeline: ~${days} Days (${months} Months Execution)`;
    }

    // Breakdown
    const carpVal = (medianLakhs * 0.40).toFixed(1);
    const civilVal = (medianLakhs * 0.25).toFixed(1);
    const elecVal = (medianLakhs * 0.15).toFixed(1);
    const furnVal = (medianLakhs * 0.20).toFixed(1);

    if (breakdownCarpentry) breakdownCarpentry.textContent = `40% (~₹${carpVal}L)`;
    if (breakdownCivil) breakdownCivil.textContent = `25% (~₹${civilVal}L)`;
    if (breakdownElectrical) breakdownElectrical.textContent = `15% (~₹${elecVal}L)`;
    if (breakdownFurnishing) breakdownFurnishing.textContent = `20% (~₹${furnVal}L)`;
  }

  // Initial calculation
  recalculateEstimate();
}

/* ==========================================================================
   5. Interactive Style Matcher Quiz
   ========================================================================== */
function initStyleQuiz() {
  const card1 = document.getElementById('questionCard1');
  const card2 = document.getElementById('questionCard2');
  const card3 = document.getElementById('questionCard3');
  const resultCard = document.getElementById('quizResult');

  const step1 = document.getElementById('quizStep1');
  const step2 = document.getElementById('quizStep2');
  const step3 = document.getElementById('quizStep3');

  const resultTitle = document.getElementById('resultStyleTitle');
  const resultDesc = document.getElementById('resultStyleDesc');
  const retakeBtn = document.getElementById('retakeQuizBtn');

  if (!card1 || !resultCard) return;

  const scores = {
    minimalist: 0,
    luxury: 0,
    indian: 0,
    contemporary: 0,
    modern: 0,
    bohemian: 0
  };

  function attachOptionListeners(card, nextCard, activePill, nextPill) {
    const options = card.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const point = opt.getAttribute('data-points');
        if (point && scores[point] !== undefined) {
          scores[point] += 1;
        }

        // Highlight selection
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        setTimeout(() => {
          card.style.display = 'none';
          if (nextCard) {
            nextCard.style.display = 'block';
            if (nextPill) nextPill.classList.add('active');
          } else {
            showQuizResult();
          }
        }, 300);
      });
    });
  }

  attachOptionListeners(card1, card2, step1, step2);
  attachOptionListeners(card2, card3, step2, step3);
  attachOptionListeners(card3, null, step3, null);

  function showQuizResult() {
    resultCard.classList.add('active');

    // Find highest scoring style
    let maxStyle = 'indian';
    let maxScore = -1;
    for (const [style, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxStyle = style;
      }
    }

    const descriptions = {
      indian: {
        title: 'Modern Rajasthani & Heritage Fusion',
        desc: 'You cherish timeless artisanal Indian narratives fused with modern spatial airiness. Your home will thrive with restored stone arches, Kota stone inlays, Araish lime plaster, and warm handcrafted brass illumination.'
      },
      minimalist: {
        title: 'Wabi-Sabi Warm Minimalist',
        desc: 'You crave tranquil breathing space, uncluttered sightlines, and calming tactile micro-cement. Your home will feature concealed flush joinery, organic curves, and mindful negative space.'
      },
      luxury: {
        title: 'Haute Architectural Luxury',
        desc: 'You resonate with high-contrast opulence, bespoke craftsmanship, and sculptural materials. Think book-matched Italian Statuario marble slabs, fluted smoked oak, and brushed champagne brass joinery.'
      },
      contemporary: {
        title: 'Curated Contemporary Chic',
        desc: 'You love dynamic present-day luxury featuring curved bouclé seating, mixed warm metals, statement sculptural chandeliers, and gallery-worthy art curation.'
      },
      modern: {
        title: 'Sharp Geometric Modernist',
        desc: 'You love geometric precision, recessed magnetic channel lighting, handleless Italian kitchen systems, and seamless indoor-outdoor spatial transitions.'
      },
      bohemian: {
        title: 'Artisanal Bohemian Sanctuary',
        desc: 'You are drawn to organic warmth, woven rattan cane webbing, antique Persian kilims, terracotta vessels, and sunlit biophilic foliage.'
      }
    };

    const match = descriptions[maxStyle] || descriptions.indian;
    if (resultTitle) resultTitle.textContent = match.title;
    if (resultDesc) resultDesc.textContent = match.desc;
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      // Reset scores
      for (const k in scores) scores[k] = 0;

      // Reset UI
      resultCard.classList.remove('active');
      card3.style.display = 'none';
      card2.style.display = 'none';
      card1.style.display = 'block';

      step2.classList.remove('active');
      step3.classList.remove('active');

      document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    });
  }
}

/* ==========================================================================
   6. Consultation Booking Modal & Toast
   ========================================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.open-consultation-btn');
  const form = document.getElementById('consultationForm');
  const toast = document.getElementById('toastMsg');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      form.reset();

      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4500);
      }
    });
  }
}
