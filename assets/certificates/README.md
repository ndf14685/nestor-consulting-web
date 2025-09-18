# Gestión de Certificados

Este directorio contiene la configuración y archivos para el carrusel de certificaciones del portfolio.

## Estructura de Archivos

```
certificates/
├── manifest.json          # Configuración de certificados
├── pdfs/                  # Archivos PDF de certificados locales
├── *.png                  # Logos de certificados
└── README.md             # Este archivo
```

## Configuración en manifest.json

Cada certificado puede tener dos tipos de configuración:

### 1. Certificado con URL Externa
```json
{
  "id": "aws-cloud-practitioner",
  "name": "AWS Certified Cloud Practitioner",
  "issuer": "Amazon Web Services",
  "date": "2023-05-10",
  "logo": "aws-cloud-practitioner.png",
  "url": "https://www.credly.com/badges/REEMPLAZAR-CON-TU-URL"
}
```

### 2. Certificado con Archivo Local (PDF)
```json
{
  "id": "fundamental-hack",
  "name": "Fundamental of Hacking & Defense",
  "issuer": "Ekoparty hHackademy",
  "date": "2024-11-24",
  "logo": "Hackademy.png",
  "file": "pdfs/fundamental-hacking-defense.pdf"
}
```

### 3. Certificado con Ambos (URL y Archivo)
```json
{
  "id": "devsecops-professional",
  "name": "Certified DevSecOps Professional",
  "issuer": "Practical DevSecOps",
  "date": "2024-01-15",
  "logo": "devsecops.png",
  "url": "https://verify.example.com/TU-CERTIFICADO",
  "file": "pdfs/devsecops-certificate.pdf"
}
```

## Campos Disponibles

- **id**: Identificador único del certificado
- **name**: Nombre del certificado
- **issuer**: Institución emisora
- **date**: Fecha de emisión (formato YYYY-MM-DD)
- **logo**: Archivo de imagen del logo (ubicado en `/certificates/`)
- **url**: (Opcional) URL externa para verificación
- **file**: (Opcional) Ruta al archivo PDF local (relativa a `/certificates/`)

## Comportamiento en el Carrusel

### Certificados con URL Externa
- **Imagen**: Se abre en lightbox (zoom)
- **Botón**: "Verificar" (ícono enlace externo)
- **Acción**: Abre la URL en nueva ventana

### Certificados con Archivo Local
- **Imagen**: Se abre el PDF en nueva ventana
- **Botón**: "Ver Certificado" (ícono PDF)
- **Acción**: Abre el PDF en nueva ventana
- **Indicador visual**: Ícono 📄 en la esquina superior derecha

### Certificados con Ambos
- **Imagen**: Se abre el PDF en nueva ventana
- **Botones**: "Ver Certificado" + "Verificar"
- **Indicador visual**: Ícono 📄 en la esquina superior derecha

## Cómo Agregar un Certificado PDF de Hackademy

1. **Guardar el archivo PDF**:
   ```
   assets/certificates/pdfs/nombre-del-certificado.pdf
   ```

2. **Agregar entrada al manifest.json**:
   ```json
   {
     "id": "nuevo-certificado",
     "name": "Nombre del Certificado",
     "issuer": "Ekoparty hHackademy",
     "date": "2024-12-01",
     "logo": "Hackademy.png",
     "file": "pdfs/nombre-del-certificado.pdf"
   }
   ```

3. **El carrusel se actualizará automáticamente**

## Formatos Soportados

- **PDFs**: Recomendado para certificados
- **Imágenes**: PNG, JPG para logos
- **URLs**: Cualquier enlace externo válido

## Notas Técnicas

- Los archivos PDF se abren en nueva ventana/pestaña
- Los certificados locales no usan lightbox
- El sistema es responsive y accesible
- Mantiene compatibilidad con certificados existentes

