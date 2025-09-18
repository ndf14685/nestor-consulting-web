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

    // Primary interaction: open full-size logo in lightbox OR local file
    var aImg = document.createElement('a');
    aImg.className = 'image-link thumb d-inline-block';
    
    if(item.file) {
      // Local file (PDF or image)
      aImg.href = 'assets/certificates/' + item.file;
      aImg.target = '_blank';
      aImg.rel = 'noopener';
      aImg.setAttribute('aria-label', 'Ver certificado — ' + captionText);
      aImg.classList.add('local-certificate');
    } else {
      // Lightbox for images
      aImg.href = 'assets/certificates/' + item.logo;
      aImg.setAttribute('aria-label', 'Ver certificado — ' + captionText);
    }
    aImg.appendChild(img);

    var cap = document.createElement('div');
    cap.className = 'carousel-caption d-block';
    var h5 = document.createElement('h5');
    h5.textContent = item.name;
    var p = document.createElement('p');
    p.textContent = item.issuer || '';
    cap.appendChild(h5);
    if(item.issuer){ cap.appendChild(p); }

    // Action buttons
    if(item.file){
      // Local file certificate
      var viewCert = document.createElement('a');
      viewCert.href = 'assets/certificates/' + item.file;
      viewCert.target = '_blank';
      viewCert.rel = 'noopener';
      viewCert.className = 'btn btn-primary btn-sm view-cert';
      viewCert.innerHTML = '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> Ver Certificado';
      cap.appendChild(viewCert);
    }
    
    // Optional: external verification link
    if(item.url){
      var verify = document.createElement('a');
      verify.href = item.url;
      verify.target = '_blank';
      verify.rel = 'noopener';
      verify.className = 'btn btn-link btn-sm verify-cert';
      verify.innerHTML = '<i class="fa fa-external-link" aria-hidden="true"></i> Verificar';
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
      // Bind Magnific Popup only for image certificates (not local files)
      try {
        if (window.jQuery && jQuery.fn && jQuery.fn.magnificPopup) {
          jQuery('.image-link:not(.local-certificate)').magnificPopup({
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
