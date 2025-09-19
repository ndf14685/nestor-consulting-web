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

## 🔐 Sistema de Preview Seguro

**IMPORTANTE**: Por seguridad, ya no se muestran PDFs directamente. En su lugar, se usa un sistema de preview que protege los certificados originales.

### Comportamiento por Tipo de Certificado

#### 1. Certificados con URL Externa (Públicos)
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
- **Imagen**: Se abre en lightbox (zoom)
- **Botón**: "Verificar" (ícono enlace externo)
- **Acción**: Abre la URL en nueva ventana

#### 2. Certificados con Preview Seguro (Privados)
```json
{
  "id": "fundamental-hack",
  "name": "Fundamental of Hacking & Defense",
  "issuer": "Ekoparty hHackademy",
  "date": "2024-11-24",
  "logo": "Hackademy.png",
  "preview": "previews/fundamental-hack-preview.png"
}
```
- **Imagen**: Al pasar el mouse muestra preview flotante
- **Botones**: "Preview" (modal) + "Solicitar" (email)
- **Indicador visual**: Ícono 🔒 en la esquina superior derecha
- **Watermark**: "PREVIEW" sobre la imagen
- **Acción**: Genera email automático para solicitar certificado completo

#### 3. Certificados Mixtos (URL + Preview)
```json
{
  "id": "devsecops-professional",
  "name": "Certified DevSecOps Professional",
  "issuer": "Practical DevSecOps",
  "date": "2024-01-15",
  "logo": "devsecops.png",
  "url": "https://verify.example.com/TU-CERTIFICADO",
  "preview": "previews/devsecops-preview.png"
}
```
- **Funciones**: Combinación de ambos sistemas
- **Botones**: "Preview" + "Solicitar" + "Verificar"

## Campos Disponibles

- **id**: Identificador único del certificado
- **name**: Nombre del certificado
- **issuer**: Institución emisora
- **date**: Fecha de emisión (formato YYYY-MM-DD)
- **logo**: Archivo de imagen del logo (ubicado en `/certificates/`)
- **url**: (Opcional) URL externa para verificación
- **preview**: (Opcional) Ruta a imagen preview segura (relativa a `/certificates/`)

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

## Cómo Agregar un Certificado Seguro de Hackademy

### 1. **Convertir PDF a Preview**:
   - Ve a [PDF24.org](https://tools.pdf24.org/es/pdf-a-jpg)
   - Sube tu PDF del certificado
   - Convierte primera página a PNG (300 DPI)
   - Guarda como: `assets/certificates/previews/nombre-preview.png`

### 2. **Agregar entrada al manifest.json**:
   ```json
   {
     "id": "nuevo-certificado",
     "name": "Nombre del Certificado",
     "issuer": "Ekoparty hHackademy",
     "date": "2024-12-01",
     "logo": "Hackademy.png",
     "preview": "previews/nuevo-certificado-preview.png"
   }
   ```

### 3. **El carrusel se actualizará automáticamente**

⚠️ **IMPORTANTE**: Nunca subas PDFs originales a carpetas públicas. Usa solo previews con watermark.

Consulta [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) para instrucciones detalladas.

## Formatos Soportados

- **Previews**: PNG (recomendado para certificados privados)
- **Logos**: PNG, JPG para logos de instituciones
- **URLs**: Cualquier enlace externo válido para verificación

## Beneficios del Sistema de Preview

### 🔐 **Seguridad**
- PDFs originales no son públicos
- Control sobre quién accede a certificados completos
- Watermark de protección en previews

### 💼 **Profesionalismo**
- Sistema controlado de solicitudes
- Seguimiento de interesados vía email
- Imagen más seria y confiable

### 🎯 **UX Mejorado**
- Preview rápido al pasar el mouse
- Modal ampliado para mejor visualización
- Solicitud fácil con email pre-configurado

## Notas Técnicas

- Las imágenes preview se muestran con hover y modal
- Los certificados seguros no usan lightbox tradicional
- El sistema genera emails automáticos para solicitudes
- Watermark "PREVIEW" protege contra uso no autorizado
- Compatible con dispositivos móviles y accesible
- Mantiene compatibilidad con certificados URL existentes

