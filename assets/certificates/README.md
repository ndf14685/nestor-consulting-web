Certificados
============

Colocá acá los logos de tus certificaciones en formato PNG, fondo transparente si es posible.

Convención de nombres
- kebab-case, corto y descriptivo
- ejemplo: aws-cloud-practitioner.png, devsecops-professional.png, cybersec-technician.png

Tamaño recomendado
- 256x256 px (el carrusel escala a ~140px alto)
- Optimizar PNG (TinyPNG o similar) para menor peso

Manifest de datos
- Editá `manifest.json` y agregá un objeto por certificación con esta estructura:

{
  "id": "aws-cloud-practitioner",
  "name": "AWS Certified Cloud Practitioner",
  "issuer": "Amazon Web Services",
  "date": "2023-05-10",
  "logo": "aws-cloud-practitioner.png",
  "url": "https://www.credly.com/badges/XXXXXXXX"  
}

Campos
- id: identificador único (kebab-case)
- name: nombre visible del certificado
- issuer: entidad emisora
- date: fecha de obtención (YYYY-MM-DD, opcional)
- logo: nombre del archivo PNG en esta carpeta
- url: enlace a la verificación (opcional). Si existe, el logo será clickeable

Cómo agregar uno nuevo
1) Copiá el PNG a esta carpeta con la convención indicada
2) Editá `manifest.json` y agregá el objeto
3) Guardá y recargá el sitio: el carrusel se actualizará solo

