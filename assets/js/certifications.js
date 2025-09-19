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

    // Primary interaction: preview on hover for secure certificates
    var aImg = document.createElement('a');
    aImg.className = 'image-link thumb d-inline-block';
    
    if(item.preview || item.file) {
      // Secure preview system
      aImg.href = '#';
      aImg.setAttribute('aria-label', 'Ver preview del certificado — ' + captionText);
      aImg.classList.add('secure-certificate');
      aImg.setAttribute('data-preview', 'assets/certificates/' + (item.preview || item.file));
      aImg.setAttribute('data-cert-name', item.name);
      
      // Prevent default click behavior
      aImg.addEventListener('click', function(e) {
        e.preventDefault();
        showContactModal(item.name);
      });
    } else {
      // Lightbox for images or external URLs
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
    if(item.preview || item.file){
      // Secure certificate with preview
      var previewBtn = document.createElement('a');
      previewBtn.href = '#';
      previewBtn.className = 'btn btn-primary btn-sm preview-cert';
      previewBtn.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i> Preview';
      previewBtn.setAttribute('data-preview', 'assets/certificates/' + (item.preview || item.file));
      previewBtn.setAttribute('data-cert-name', item.name);
      previewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPreviewModal(this.getAttribute('data-preview'), this.getAttribute('data-cert-name'));
      });
      cap.appendChild(previewBtn);
      
      // Contact button for full certificate
      var contactBtn = document.createElement('a');
      contactBtn.href = '#';
      contactBtn.className = 'btn btn-outline-primary btn-sm contact-cert';
      contactBtn.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i> Solicitar';
      contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showContactModal(item.name);
      });
      cap.appendChild(contactBtn);
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

  // Preview system functions
  function initializeHoverPreviews() {
    var secureElements = document.querySelectorAll('.secure-certificate');
    secureElements.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        showHoverPreview(this);
      });
      el.addEventListener('mouseleave', function() {
        hideHoverPreview();
      });
    });
  }

  function showHoverPreview(element) {
    var previewUrl = element.getAttribute('data-preview');
    var certName = element.getAttribute('data-cert-name');
    
    if (!previewUrl) return;
    
    // Remove existing preview
    hideHoverPreview();
    
    var preview = document.createElement('div');
    preview.id = 'certificate-hover-preview';
    preview.className = 'certificate-preview-overlay';
    preview.innerHTML = '<div class="preview-content">' +
      '<div class="preview-header">' +
        '<h5>' + certName + '</h5>' +
        '<small>Click para solicitar certificado completo</small>' +
      '</div>' +
      '<img src="' + previewUrl + '" alt="Preview de ' + certName + '" loading="lazy">' +
    '</div>';
    
    document.body.appendChild(preview);
    
    // Position preview
    var rect = element.getBoundingClientRect();
    var viewportWidth = window.innerWidth;
    var previewWidth = 320;
    var left = rect.right + 20;
    
    // Adjust if would go off screen
    if (left + previewWidth > viewportWidth) {
      left = rect.left - previewWidth - 20;
    }
    
    preview.style.left = Math.max(10, left) + 'px';
    preview.style.top = (rect.top + window.scrollY - 50) + 'px';
    
    // Animate in
    setTimeout(function() {
      preview.classList.add('visible');
    }, 10);
  }

  function hideHoverPreview() {
    var existing = document.getElementById('certificate-hover-preview');
    if (existing) {
      existing.remove();
    }
  }

  function showPreviewModal(previewUrl, certName) {
    // Create modal
    var modal = document.createElement('div');
    modal.className = 'certificate-modal-overlay';
    modal.innerHTML = '<div class="certificate-modal">' +
      '<div class="modal-header">' +
        '<h3>' + certName + '</h3>' +
        '<button class="modal-close" aria-label="Cerrar">&times;</button>' +
      '</div>' +
      '<div class="modal-body">' +
        '<img src="' + previewUrl + '" alt="Preview de ' + certName + '" loading="lazy">' +
        '<p class="text-center mt-3">' +
          '<small>Para obtener el certificado completo, ' +
          '<a href="#" onclick="showContactModal(\'' + certName + '\'); return false;">contáctame</a>.</small>' +
        '</p>' +
      '</div>' +
    '</div>';
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', function() {
      modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // ESC key
    function handleEsc(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEsc);
      }
    }
    document.addEventListener('keydown', handleEsc);
  }

  function showContactModal(certName) {
    var user = "david.fleitas";
    var domain = "gmail.com";
    var email = user + "@" + domain;
    var subject = encodeURIComponent('Solicitud de certificado: ' + certName);
    var body = encodeURIComponent('Hola Néstor,\n\nMe interesa obtener una copia del certificado "' + certName + '".\n\n¿Podrías compartirlo conmigo?\n\nGracias.');
    
    var emailLink = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    window.location.href = emailLink;
  }

  // Load certificates
  fetch('assets/certificates/manifest.json', { cache: 'no-cache' })
    .then(function(r){ if(!r.ok) throw new Error('manifest'); return r.json(); })
    .then(function(items){
      if(!Array.isArray(items) || !items.length) return;
      inner.innerHTML = '';
      items.forEach(function(it, idx){ inner.appendChild(slideItem(it, idx===0)); });
      if(listFallback){ listFallback.style.display = 'none'; }
      
      // Bind Magnific Popup only for image certificates (not secure certificates)
      try {
        if (window.jQuery && jQuery.fn && jQuery.fn.magnificPopup) {
          jQuery('.image-link:not(.secure-certificate)').magnificPopup({
            gallery: { enabled: true },
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            type: 'image'
          });
        }
      } catch(e) {}
      
      // Initialize hover previews for secure certificates
      initializeHoverPreviews();
      
      if(prefersReducedMotion()){
        var c = document.getElementById('cert-carousel');
        if(c){ c.removeAttribute('data-bs-ride'); c.removeAttribute('data-bs-interval'); }
      }
    })
    .catch(function(){ /* fallback textual visible */ });

  // Global functions for external access
  window.showPreviewModal = showPreviewModal;
  window.showContactModal = showContactModal;
})();
