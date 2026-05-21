  // Nav scroll
  const nav = document.getElementById('main-nav');
  const scrollTopBtn = document.getElementById('scroll-top');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // Hero image zoom-out on load
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    if (heroImg.complete) heroImg.classList.add('loaded');
  }

  // Scroll reveal (Intersection Observer)
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Cookie logic ── */
  (function(){
    var KEY = 'cookie_consent';
    function setCk(v){ document.cookie = KEY+'='+v+';max-age=31536000;path=/;SameSite=Lax'; }
    function getCk(){ var m=document.cookie.match(new RegExp('(?:^|; )'+KEY+'=([^;]*)'));return m?m[1]:null; }
    function hideBanner(){ var b=document.getElementById('cookie-bar');b.classList.remove('visible');setTimeout(function(){b.style.display='none';},500); }
    window.openCookieModal  = function(){ document.getElementById('cookie-modal').classList.add('open'); };
    window.closeCookieModal = function(){ document.getElementById('cookie-modal').classList.remove('open'); };
    window.acceptAll  = function(){ setCk('all'); hideBanner(); closeCookieModal(); };
    window.rejectAll  = function(){ setCk('necessary'); hideBanner(); };
    window.saveCustom = function(){
      var a=document.getElementById('tgl-analytics').classList.contains('on')?1:0;
      var m=document.getElementById('tgl-marketing').classList.contains('on')?1:0;
      setCk('custom:a='+a+',m='+m); hideBanner(); closeCookieModal();
    };
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeCookieModal(); });
    if(!getCk()) setTimeout(function(){ document.getElementById('cookie-bar').classList.add('visible'); }, 900);
    /* Auto-open modal when returning from gdpr.html via "Zmeniť nastavenia" */
    try { if(sessionStorage.getItem('openCookieModal')==='1'){ sessionStorage.removeItem('openCookieModal'); setTimeout(openCookieModal,400); } } catch(e){}
  })();

  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Form submit
  const interestForm = document.getElementById('interest-form');
  if (interestForm) {
    interestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      interestForm.querySelectorAll('input[required]').forEach(field => {
        if (field.type === 'checkbox') {
          const ok = field.checked;
          field.closest('.form-consent').style.outline = ok ? '' : '1px solid rgba(197,135,107,0.7)';
          if (!ok) valid = false;
        } else {
          const ok = field.value.trim() !== '';
          field.style.borderColor = ok ? '' : 'rgba(197,135,107,0.7)';
          if (!ok) valid = false;
        }
      });
      if (!valid) return;
      interestForm.style.display = 'none';
      document.getElementById('success-msg').style.display = 'block';
    });
  }

  // ─── Lightbox ───────────────────────────────────────────────────
  const galleryImages = [
    { src: 'img/tt3.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova — terasy a fasáda' },
    { src: 'img/tt9.jpg',  alt: 'Strešná terasa mezonnet' },
    { src: 'img/tt11.jpg', alt: 'Parkovací dom Nová Hviezdoslavova — fasáda a nápis' },
    { src: 'img/tt4.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova — letecký pohľad' },
    { src: 'img/tt1.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt2.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt5.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt6.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt7.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt8.jpg',  alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt10.jpg', alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt12.jpg', alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt13.jpg', alt: 'Parkovací dom Nová Hviezdoslavova' },
    { src: 'img/tt14.jpg', alt: 'Parkovací dom Nová Hviezdoslavova' },
  ];

  function openLightbox(images, startIndex) {
    let idx = ((startIndex || 0) + images.length) % images.length;
    const multi = images.length > 1;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lb-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Zatvoriť');

    const imgWrap = document.createElement('div');
    imgWrap.className = 'lb-img-wrap';
    const img = document.createElement('img');
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', e => e.preventDefault());
    imgWrap.appendChild(img);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lb-nav lb-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Predošlý');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lb-nav lb-next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Nasledujúci');

    const counter = document.createElement('div');
    counter.className = 'lb-counter';

    overlay.appendChild(closeBtn);
    if (multi) { overlay.appendChild(prevBtn); overlay.appendChild(nextBtn); }
    overlay.appendChild(imgWrap);
    if (multi) overlay.appendChild(counter);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Preload all images for smooth transitions
    const preloaded = new Set();
    images.forEach(({ src }) => {
      const p = new Image(); p.onload = () => preloaded.add(src); p.src = src;
    });
    let showId = 0, firstShow = true;

    function show(i) {
      idx = ((i) + images.length) % images.length;
      const { src, alt = '' } = images[idx];
      const id = ++showId;
      if (multi) counter.textContent = (idx + 1) + '\u2009/\u2009' + images.length;

      const commit = () => {
        if (id !== showId) return;
        img.src = src; img.alt = alt; img.style.opacity = '1';
      };

      // First image: show immediately (lightbox overlay handles the entrance animation)
      if (firstShow) {
        firstShow = false;
        if (preloaded.has(src)) { commit(); }
        else {
          const p = new Image();
          p.onload = () => { preloaded.add(src); commit(); };
          p.onerror = commit; p.src = src;
        }
        return;
      }

      // Subsequent images: fade out, wait for load, fade in
      img.style.opacity = '0';
      if (preloaded.has(src)) {
        // Already cached — swap after fade-out completes (matches CSS transition 0.18s)
        setTimeout(commit, 190);
      } else {
        // Load in background, display when ready (opacity stays 0 until loaded)
        const p = new Image();
        p.onload = () => { preloaded.add(src); commit(); };
        p.onerror = commit; p.src = src;
      }
    }
    function dismiss() {
      overlay.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(ev) {
      if (ev.key === 'Escape') dismiss();
      if (multi && ev.key === 'ArrowLeft')  show(idx - 1);
      if (multi && ev.key === 'ArrowRight') show(idx + 1);
    }

    closeBtn.addEventListener('click', dismiss);
    prevBtn.addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
    overlay.addEventListener('click', e => { if (e.target === overlay || e.target === imgWrap) dismiss(); });
    document.addEventListener('keydown', onKey);

    // Touch swipe (mobile)
    let tx = 0, ty = 0, isSwiping = false;
    overlay.addEventListener('touchstart', e => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
      isSwiping = false;
    }, { passive: true });
    overlay.addEventListener('touchmove', e => {
      const dx = Math.abs(e.touches[0].clientX - tx);
      const dy = Math.abs(e.touches[0].clientY - ty);
      if (!isSwiping && dx > dy && dx > 8) isSwiping = true;
      if (isSwiping) e.preventDefault();
    }, { passive: false });
    overlay.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (multi && isSwiping && Math.abs(dx) > 40) show(dx < 0 ? idx + 1 : idx - 1);
      isSwiping = false;
    });

    show(startIndex || 0);
  }

  // Gallery thumbnails → open at matching index
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(galleryImages, parseInt(item.dataset.galleryIndex || 0, 10));
    });
  });

  // "Pozrite si viac" button
  const galleryMoreBtn = document.getElementById('gallery-more-btn');
  if (galleryMoreBtn) {
    galleryMoreBtn.addEventListener('click', () => openLightbox(galleryImages, 0));
  }

  // Parking render click → lightbox
  document.querySelectorAll('.parking-render-wrap[data-lb-src]').forEach(wrap => {
    wrap.addEventListener('click', () => {
      openLightbox([{ src: wrap.dataset.lbSrc, alt: wrap.dataset.lbAlt || '' }], 0);
    });
  });

  // Floor plan click → full plan lightbox
  document.querySelectorAll('.apt-fp-wrap[data-fp-src]').forEach(wrap => {
    wrap.addEventListener('click', () => {
      openLightbox([{ src: wrap.dataset.fpSrc, alt: wrap.dataset.fpAlt || 'Pôdorys' }], 0);
    });
  });

  // ─── Ochrana obsahu ────────────────────────────────────────────
  // Zablokovanie pravého kliknutia na obrázky
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // Zablokovanie drag & drop obrázkov
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // Nastavenie draggable=false na všetkých obrázkoch
  document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));

  // Zablokovanie DevTools klávesových skratiek (deterrent pre bežného používateľa)
  document.addEventListener('keydown', e => {
    // F12
    if (e.key === 'F12') { e.preventDefault(); return; }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault(); return;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && !e.shiftKey && e.key.toUpperCase() === 'U') {
      e.preventDefault(); return;
    }
  });