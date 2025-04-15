function removePaywall() {
    // Remove elementos de paywall
    const selectors = [
      '.fixed.z-9000',
      '.lg\\:hidden.fixed.z-20', 
      '.my-other-element',
      '[class*="paywall"]',
      '[class*="overlay"]',
      '[class*="locked"]'
    ];
  
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  
    // Remove efeitos de escurecimento
    document.querySelectorAll('body, #__next, div, main').forEach(el => {
      el.style.filter = 'none';
      el.style.backdropFilter = 'none';
      el.style.pointerEvents = 'auto';
      el.style.userSelect = 'auto';
    });
  
    // Libera scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  
    // Carrega conteúdo lazy
    document.querySelectorAll('[loading="lazy"], img[data-src], iframe[data-src]').forEach(el => {
      if (el.dataset.src) el.src = el.dataset.src;
      if (el.dataset.srcset) el.srcset = el.dataset.srcset;
    });
  
    // Observer para prevenir retorno do paywall
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        selectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(el => el.remove());
        });
        document.body.style.filter = 'none';
        document.body.style.backdropFilter = 'none';
      });
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
  
  // Executa imediatamente
  removePaywall();
  
  // Executa novamente após 3 segundos (para conteúdo dinâmico)
  setTimeout(removePaywall, 3000);