(function(){
  var lastH = -1, lastTop = -1;
  function setVisualViewportVars(){
    var vv = window.visualViewport;
    var h = Math.max(260, Math.floor(vv ? vv.height : window.innerHeight));
    var top = Math.floor(vv ? vv.offsetTop : 0);
    if (h === lastH && top === lastTop) return;
    lastH = h; lastTop = top;
    document.documentElement.style.setProperty('--vvh', h + 'px');
    document.documentElement.style.setProperty('--vvtop', top + 'px');
  }
  function modalOf(el){ return el && el.closest ? el.closest('.modal-wrap') : null; }
  function markKeyboardSafe(el){
    var modal = modalOf(el);
    if (!modal || modal.classList.contains('keyboard-safe')) return;
    document.querySelectorAll('.modal-wrap.keyboard-safe').forEach(function(m){ m.classList.remove('keyboard-safe'); });
    modal.classList.add('keyboard-safe');
    setVisualViewportVars();
  }
  function clearKeyboardSafeLater(){
    requestAnimationFrame(function(){
      if (!document.activeElement || !document.activeElement.closest || !document.activeElement.closest('.modal-wrap')) {
        document.querySelectorAll('.modal-wrap.keyboard-safe').forEach(function(m){ m.classList.remove('keyboard-safe'); });
      }
    });
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
})();
