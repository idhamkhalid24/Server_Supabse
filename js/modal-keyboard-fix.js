(function(){
  function setVisualViewportVars(){
    var vv = window.visualViewport;
    var h = vv ? vv.height : window.innerHeight;
    var top = vv ? vv.offsetTop : 0;
    document.documentElement.style.setProperty('--vvh', Math.max(260, Math.floor(h)) + 'px');
    document.documentElement.style.setProperty('--vvtop', Math.floor(top || 0) + 'px');
  }
  function syncTransactionActionGrid(){
    var actions = document.getElementById('transaction-modal-actions');
    var printBtn = document.getElementById('transaction-modal-print-btn');
    if (!actions || !printBtn) return;
    var visible = window.getComputedStyle(printBtn).display !== 'none';
    actions.style.setProperty('grid-template-columns', visible ? '1fr 1fr 1fr' : '1fr 1fr', 'important');
  }
  function modalOf(el){ return el && el.closest ? el.closest('.modal-wrap') : null; }
  function markKeyboardSafe(el){
    document.querySelectorAll('.modal-wrap.keyboard-safe').forEach(function(m){ m.classList.remove('keyboard-safe'); });
    var modal = modalOf(el);
    if (!modal) return;
    modal.classList.add('keyboard-safe');
    setVisualViewportVars();
    setTimeout(function(){
      try { el.scrollIntoView({ block:'center', inline:'nearest', behavior:'smooth' }); } catch(_) { try { el.scrollIntoView(false); } catch(__) {} }
      var sheet = el.closest('.modal-sheet');
      if (sheet && sheet.scrollHeight > sheet.clientHeight) sheet.scrollTop = Math.max(0, sheet.scrollTop - 6);
    }, 120);
  }
  function clearKeyboardSafeLater(){
    setTimeout(function(){
      if (!document.activeElement || !document.activeElement.closest || !document.activeElement.closest('.modal-wrap')) {
        document.querySelectorAll('.modal-wrap.keyboard-safe').forEach(function(m){ m.classList.remove('keyboard-safe'); });
      }
    }, 160);
  }
  setVisualViewportVars();
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVisualViewportVars);
    window.visualViewport.addEventListener('scroll', setVisualViewportVars);
  }
  window.addEventListener('resize', setVisualViewportVars);
  document.addEventListener('focusin', function(e){
    if (e.target && e.target.matches && e.target.matches('.modal-wrap input,.modal-wrap textarea,.modal-wrap select')) markKeyboardSafe(e.target);
  }, true);
  document.addEventListener('focusout', clearKeyboardSafeLater, true);
  document.addEventListener('click', function(){ setTimeout(syncTransactionActionGrid, 60); }, true);
  window.addEventListener('load', function(){
    setVisualViewportVars();
    syncTransactionActionGrid();
    var printBtn = document.getElementById('transaction-modal-print-btn');
    if (printBtn && window.MutationObserver) new MutationObserver(syncTransactionActionGrid).observe(printBtn, { attributes:true, attributeFilter:['style','class'] });
  });
})();
