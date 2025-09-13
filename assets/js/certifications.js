(function(){
  var listFallback = document.getElementById('cert-fallback');
  var inner = document.getElementById('cert-carousel-inner');
  if(!inner){ return; }

  function prefersReducedMotion(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function slideItem(item, active){
    var wrap = document.createElement('div');
    wrap.className = 'carousel-item' + (active ? ' active' : '');

    var captionText = (item.issuer ? item.issuer + ' — ' : '') + item.name;

    var img = document.createElement('img');
    img.src = 'assets/certificates/' + item.logo;
    img.alt = captionText;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 256; img.height = 256;
    img.className = 'd-block mx-auto';

    // Primary interaction: open full-size logo in lightbox
    var aImg = document.createElement('a');
    aImg.href = 'assets/certificates/' + item.logo;
    aImg.className = 'image-link thumb d-inline-block';
    aImg.setAttribute('aria-label', 'Ver certificado — ' + captionText);
    aImg.appendChild(img);

    var cap = document.createElement('div');
    cap.className = 'carousel-caption d-block';
    var h5 = document.createElement('h5');
    h5.textContent = item.name;
    var p = document.createElement('p');
    p.textContent = item.issuer || '';
    cap.appendChild(h5);
    if(item.issuer){ cap.appendChild(p); }

    // Optional: external verification link
    if(item.url){
      var verify = document.createElement('a');
      verify.href = item.url;
      verify.target = '_blank';
      verify.rel = 'noopener';
      verify.className = 'btn btn-link btn-sm verify-cert';
      verify.textContent = 'Verificar';
      cap.appendChild(verify);
    }

    wrap.appendChild(aImg);
    wrap.appendChild(cap);
    return wrap;
  }

  fetch('assets/certificates/manifest.json', { cache: 'no-cache' })
    .then(function(r){ if(!r.ok) throw new Error('manifest'); return r.json(); })
    .then(function(items){
      if(!Array.isArray(items) || !items.length) return;
      inner.innerHTML = '';
      items.forEach(function(it, idx){ inner.appendChild(slideItem(it, idx===0)); });
      if(listFallback){ listFallback.style.display = 'none'; }
      // Bind Magnific Popup for newly added items (lightbox)
      try {
        if (window.jQuery && jQuery.fn && jQuery.fn.magnificPopup) {
          jQuery('.image-link').magnificPopup({
            gallery: { enabled: true },
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            type: 'image'
          });
        }
      } catch(e) {}
      if(prefersReducedMotion()){
        var c = document.getElementById('cert-carousel');
        if(c){ c.removeAttribute('data-bs-ride'); c.removeAttribute('data-bs-interval'); }
      }
    })
    .catch(function(){ /* fallback textual visible */ });
})();
