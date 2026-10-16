# Cine en palabras

Aplicación para publicar y consultar reseñas de películas. Incluye una SPA en React, una API REST en Express y persistencia local en un archivo JSON.

## Requisitos

- Node.js 20.19 o superior y npm.

## Iniciar el proyecto

Abra dos terminales en esta carpeta.

En la primera, instale e inicie la API:

```bash
cd backend
npm install
npm run dev
```

La API queda disponible en `http://localhost:4000`. Puede consultar `http://localhost:4000/health` para verificar que está activa. Los registros se guardan en `backend/data/registros.json`; si el archivo no existe, el servidor lo crea con una lista vacía.

En la segunda, instale e inicie React:

```bash
cd frontend
npm install
npm run dev
```

Abra la URL que indique Vite (normalmente `http://localhost:5173`). React consulta y envía datos a `VITE_API_URL`; su valor predeterminado es `http://localhost:4000`. Para usar otra dirección, cree `frontend/.env` a partir de `.env.example`.

## API

### `GET /registros`

Devuelve `{ "registros": [...] }` con HTTP 200.

### `POST /registros`

Recibe JSON con `pelicula`, `autor`, `email`, `descripcion`, `fecha` y `genero`. Devuelve el registro creado, incluido su `id`, con HTTP 201. Responde HTTP 400 con `{ "error": "...", "campos": { ... } }` cuando los datos no son válidos.

La API valida los mismos campos que el formulario, rechaza fechas futuras y asigna el ID con `crypto.randomUUID()`. CORS permite el origen del frontend indicado por `FRONTEND_ORIGIN` (predeterminado `http://localhost:5173`).

## Verificación manual de persistencia

1. Inicie la API y React con los comandos anteriores.
2. En `/registro`, envíe una reseña válida y confirme el mensaje de éxito.
3. Abra `/lista` y compruebe que aparece la reseña.
4. Envíe el formulario con un email incorrecto o una fecha futura; debe mostrarse el error sin guardar el registro.
5. Reinicie la API y vuelva a cargar `/lista`; la reseña debe seguir visible.
6. Para confirmar la lista vacía, use una copia limpia del proyecto o elimine `backend/data/registros.json` con el servidor detenido. Al reiniciar, se crea automáticamente vacío.

También puede consultar la API directamente:

```bash
curl http://localhost:4000/registros
curl -X POST http://localhost:4000/registros -H "Content-Type: application/json" -d '{"pelicula":"Arrival","autor":"Ana","email":"ana@example.com","descripcion":"Una historia de ciencia ficción emotiva.","fecha":"2026-10-15","genero":"Ciencia ficción"}'
```

## Estructura

```text
backend/
  data/registros.json
  src/server.js
frontend/
  src/components/
  src/pages/
  src/App.jsx
```

