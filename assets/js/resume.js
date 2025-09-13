(function(){
  var panels = document.querySelectorAll('#resume .timeline-panel');
  if(!panels.length) return;

  function toggle(panel){
    var expanded = panel.classList.toggle('expanded');
    var heading = panel.querySelector('.timeline-heading h3');
    if(heading){ heading.setAttribute('aria-expanded', expanded ? 'true' : 'false'); }
  }

  panels.forEach(function(panel){
    var heading = panel.querySelector('.timeline-heading h3');
    if(heading){ heading.setAttribute('tabindex','0'); heading.setAttribute('role','button'); heading.setAttribute('aria-expanded','false'); heading.setAttribute('aria-label','Ver detalles de experiencia'); }
    panel.addEventListener('click', function(e){
      // avoid toggling when clicking on links/images inside body
      var tag = e.target.tagName.toLowerCase();
      if(tag === 'a' || tag === 'img' || e.target.closest('.verify-cert')) return;
      toggle(panel);
    });
    panel.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(panel); }
    });
  });
})();

