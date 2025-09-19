# Guía de Conversión de PDFs a Preview

## 🔐 Sistema de Preview Seguro

Para proteger tus certificados originales, el sistema ahora usa imágenes preview en lugar de PDFs directos.

### ¿Por qué es más seguro?

1. **Sin acceso directo**: Los PDFs originales no están públicos
2. **Watermark de protección**: Las previews tienen marca de agua "PREVIEW"
3. **Control de acceso**: Solo muestras lo que quieres mostrar
4. **Solicitud por email**: Los interesados deben contactarte para el certificado completo

## 📝 Pasos para Convertir PDFs

### Opción 1: Online (Recomendado)
1. Ve a [PDF24.org](https://tools.pdf24.org/es/pdf-a-jpg)
2. Sube tu PDF del certificado
3. Selecciona **primera página** (donde está el certificado)
4. Calidad: **300 DPI** 
5. Formato: **PNG**
6. Descarga la imagen

### Opción 2: Con Adobe Acrobat
1. Abre el PDF en Adobe Acrobat
2. Ve a **Archivo > Exportar a > Imagen > PNG**
3. Calidad: **300 DPI**
4. Páginas: **Primera página únicamente**
5. Guarda como PNG

### Opción 3: Con Herramientas Gratuitas
1. **GIMP** (gratuito):
   - Importa el PDF
   - Selecciona solo la primera página
   - Exporta como PNG

2. **ImageMagick** (línea de comandos):
   ```bash
   magick convert "certificado.pdf[0]" -density 300 preview.png
   ```

## 📂 Ubicación de Archivos

### Estructura recomendada:
```
certificates/
├── pdfs/                          # PDFs originales (privados)
│   ├── NestorFleitas_FOHD.pdf
│   ├── NestorFleitas_osint.pdf
│   └── NestorFleitas-DSO-CS.pdf
├── previews/                      # Imágenes preview (públicas)
│   ├── fundamental-hack-preview.png
│   ├── osint-hack-preview.png
│   └── devsecops-preview.png
└── manifest.json
```

## 🎨 Especificaciones de Preview

### Tamaño y Calidad:
- **Ancho máximo**: 800px
- **Alto máximo**: 1000px
- **Formato**: PNG (mejor calidad)
- **Resolución**: 300 DPI mínimo
- **Tamaño archivo**: Máximo 2MB

### Optimización:
1. Usa [TinyPNG.com](https://tinypng.com/) para comprimir sin perder calidad
2. Asegúrate de que el texto sea legible
3. La imagen debe mostrar claramente:
   - Nombre del certificado
   - Tu nombre
   - Institución emisora
   - Fecha (si está visible)

## 🔧 Actualizar manifest.json

Reemplaza el campo `file` por `preview`:

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

## 🚀 Funcionalidades del Sistema

### Para Visitantes:
1. **Hover**: Ven preview al pasar el mouse
2. **Botón Preview**: Modal con imagen ampliada
3. **Botón Solicitar**: Email automático para pedir certificado completo

### Para Ti:
1. **Privacidad**: PDFs originales no públicos
2. **Control**: Decides a quién enviar certificados completos
3. **Profesional**: Sistema se ve más serio y controlado
4. **Analytics**: Puedes trackear quién solicita certificados

## 📧 Configuración de Email

El sistema genera automáticamente emails como:

**Asunto**: `Solicitud de certificado: Fundamental of Hacking & Defense`

**Cuerpo**:
```
Hola Néstor,

Me interesa obtener una copia del certificado "Fundamental of Hacking & Defense".

¿Podrías compartirlo conmigo?

Gracias.
```

## 🔒 Recomendaciones de Seguridad

1. **Nunca subas PDFs originales** a la carpeta pública
2. **Usa previews de baja resolución** para navegación web
3. **Watermark visible** en todas las previews
4. **Backups seguros** de los PDFs originales
5. **Considera agregar tu logo** a las previews

## 🆘 Solución de Problemas

### Preview no se muestra:
- Verifica la ruta en `manifest.json`
- Asegúrate de que el archivo existe en `/previews/`
- Revisa que sea formato PNG

### Calidad baja:
- Aumenta DPI a 300 o más
- Usa PNG en lugar de JPG
- Optimiza con TinyPNG

### Modal no funciona:
- Verifica que JavaScript está habilitado
- Revisa consola del navegador por errores
- Confirma que los archivos CSS y JS están cargados

## ✅ Checklist Final

- [ ] PDFs convertidos a PNG
- [ ] Archivos en carpeta `/previews/`
- [ ] Manifest.json actualizado con campo `preview`
- [ ] Previews optimizadas (< 2MB cada una)
- [ ] Watermark "PREVIEW" visible
- [ ] Probado en navegador
- [ ] Funciona en móvil
- [ ] Email de contacto funciona

¡Listo! Tu sistema de certificados ahora es seguro y profesional.