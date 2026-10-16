# Guion del video: Marlon, Erick, Jonathan y Fernando

Duración sugerida: 25 minutos. Cada estudiante debe identificarse, explicar sus decisiones y realizar una actividad técnica sustantiva. Muestren elaboración o modificación del código, integración y pruebas.

## Reparto de todos los archivos

Las rutas se indican desde la carpeta `outputs/`. Este es el reparto propuesto para el trabajo del equipo.

| Estudiante | Responsabilidad | Archivos que debe codificar o preparar |
| --- | --- | --- |
| **Marlon** | Estructura React, rutas, navegación, bienvenida y diseño adaptable. | `frontend/package.json`, `frontend/vite.config.js`, `frontend/index.html`, `frontend/src/main.jsx`, `frontend/src/App.jsx`, `frontend/src/components/Header.jsx`, `frontend/src/pages/Home.jsx` y `frontend/src/styles.css`. |
| **Erick** | Formulario controlado, validaciones del cliente y mensajes reutilizables. | `frontend/src/pages/Register.jsx` y `frontend/src/components/Message.jsx`. |
| **Jonathan** | API Express, validación del servidor y almacenamiento persistente. | `backend/package.json`, `backend/src/server.js` y la inicialización de `backend/data/registros.json` con `[]`. |
| **Fernando** | Conexión HTTP, consulta, tarjetas, estados de la lista y documentación. | `frontend/src/api.js`, `frontend/src/pages/Reviews.jsx`, `frontend/src/components/ReviewCard.jsx`, `frontend/.env.example`, `README.md` y `GUIA_VIDEO.md`. |

El reparto considera la complejidad: Erick desarrolla el formulario y sus validaciones; Jonathan concentra la lógica del servidor; Marlon arma la SPA y su diseño; Fernando conecta las partes y presenta los resultados.

Los dos `package-lock.json` son generados por npm: Marlon conserva el del frontend y Jonathan el del backend. `node_modules/` se genera al instalar dependencias y `frontend/dist/` al compilar. No se codifican manualmente ni necesitan explicación en el video. Después de inicializar `registros.json`, la API actualiza su contenido.

## Archivos importantes que explicarán

| Estudiante | Archivo principal | Qué debe explicar |
| --- | --- | --- |
| **Marlon** | `frontend/src/App.jsx` | Rutas `/`, `/registro` y `/lista`, sus páginas y encabezado compartido. Abrir brevemente `main.jsx` para señalar `BrowserRouter`. |
| **Erick** | `frontend/src/pages/Register.jsx` | `useState`, campos controlados, `update`, validaciones, `submit`, espera durante el envío y navegación después de guardar. |
| **Jonathan** | `backend/src/server.js` | Express, JSON, CORS, validación, GET, POST, UUID, lectura y escritura del archivo, cola de guardado y errores HTTP. |
| **Fernando** | `frontend/src/api.js` | Dirección de la API, `fetch`, GET, POST, conversión a JSON y errores de conexión o respuesta. |
| **Fernando** | `frontend/src/pages/Reviews.jsx` | Consulta con `useEffect`, estados de carga, vacío, error y confirmación; tarjetas con ID como clave. |

Los demás archivos se muestran en el árbol de carpetas y se mencionan por su función. El diseño, las tarjetas y los mensajes se enseñan funcionando en la aplicación, sin recorrer su código línea por línea.

## Secuencia del video

| Minutos | Participación |
| --- | --- |
| 0:00–2:00 | Presentación de los cuatro y distribución del trabajo. |
| 2:00–6:00 | Marlon: preparación, estructura React, rutas y navegación. |
| 6:00–10:00 | Erick: formulario, estado y validaciones. |
| 10:00–15:00 | Jonathan: API y persistencia JSON. |
| 15:00–19:00 | Fernando: integración HTTP y consulta. |
| 19:00–23:00 | Pruebas repartidas entre los cuatro. |
| 23:00–25:00 | Cierre y aportes de los cuatro. |

### 0:00–2:00 · Presentación

**Marlon:** “Somos Marlon, Erick, Jonathan y Fernando. Nuestro proyecto se llama Cine en palabras y permite publicar y consultar reseñas de películas. Cada registro incluye película, autor, email, descripción, fecha y género. Yo me encargo de la estructura, las rutas y el diseño.”

**Erick:** “Yo desarrollo el formulario, su estado en React y las validaciones para ayudar al usuario a corregir los datos antes del envío.”

**Jonathan:** “Yo desarrollo la API en Express, valido nuevamente los datos y los guardo en un archivo JSON para conservarlos al reiniciar el servidor.”

**Fernando:** “Yo conecto React con la API mediante peticiones HTTP y desarrollo la lista donde se consultan las reseñas.”

Marlon muestra el árbol de carpetas y el reparto del trabajo. Presenten también la confirmación de exclusividad del tema que les corresponda obtener en su curso.

### 2:00–6:00 · Marlon: preparación y SPA

**En pantalla:** los dos `package.json`, `main.jsx` y principalmente `App.jsx`.

1. Muestra las dependencias y explica `npm install` y `npm run dev` dentro de cada carpeta. Inicia frontend y backend en terminales distintas.
2. Señala `BrowserRouter` en `main.jsx`.
3. **Actividad técnica:** construye o modifica las tres rutas en `App.jsx` y conecta cada una con su página.
4. Navega entre inicio, formulario y lista usando el menú compartido.
5. Reduce el ancho de la ventana para enseñar la adaptación a pantallas pequeñas y menciona `styles.css`.

**Explicación de apoyo:** “El enrutador muestra una página según la URL. El encabezado se reutiliza para navegar entre las secciones de la SPA.”

### 6:00–10:00 · Erick: formulario y validación

**En pantalla:** `frontend/src/pages/Register.jsx`.

1. Explica el objeto inicial con los seis campos y su almacenamiento con `useState`.
2. Señala la relación entre `value`, `onChange` y `update`.
3. **Actividad técnica:** escribe o modifica una validación de email o fecha y su mensaje.
4. Explica cómo `submit` evita la recarga, valida y llama a `createRegistro`.
5. Prueba email incorrecto y fecha futura: deben aparecer errores sin enviar los datos.
6. Señala el botón “Publicando…” y la navegación a `/lista` después de guardar.

**Explicación de apoyo:** “Los campos dependen del estado de React. La validación ayuda a corregir errores antes del envío; el servidor vuelve a validar los datos que recibe.”

### 10:00–15:00 · Jonathan: API y JSON

**En pantalla:** `backend/src/server.js`; abre brevemente `backend/data/registros.json`.

1. Explica `express.json()` y CORS para comunicar los dos orígenes.
2. Muestra `validateRecord`: obligatorios, email, longitud de reseña, fecha válida sin futuro y género permitido.
3. **Actividad técnica:** construye o modifica una ruta y su validación o respuesta HTTP.
4. Explica GET con 200, POST con 201 y datos inválidos con 400.
5. Muestra `readRecords`, la inicialización con una lista vacía y la lectura de registros anteriores antes de agregar uno nuevo.
6. Explica `randomUUID()`, guardado JSON, cola de guardado y manejo de errores de lectura y escritura.

**Explicación de apoyo:** “Cada reseña obtiene un ID y se agrega a la lista existente. El archivo conserva los registros y los errores se responden sin detener el servidor.”

### 15:00–19:00 · Fernando: HTTP y consulta

**En pantalla:** `frontend/src/api.js` y `frontend/src/pages/Reviews.jsx`.

1. Explica que `VITE_API_URL` configura el backend y que el valor predeterminado es `http://localhost:4000`.
2. **Actividad técnica:** escribe o modifica una llamada `fetch` de GET o POST y su manejo de respuesta y error.
3. Explica el envío de JSON y la recuperación de registros.
4. En `Reviews.jsx`, señala `useEffect` y los estados de carga, vacío, error y resultados.
5. Publica una reseña válida y muestra POST 201 y GET en la pestaña Red del navegador.
6. Comprueba la tarjeta nueva y el mensaje de confirmación; señala el ID como clave al recorrer los registros.

**Explicación de apoyo:** “Este es el recorrido completo: formulario React, petición HTTP, API Express, archivo JSON y consulta para mostrar los resultados en React.”

### 19:00–23:00 · Pruebas de los cuatro

| Responsable | Actividad | Resultado esperado |
| --- | --- | --- |
| **Marlon** | Muestra la lista vacía y vuelve al formulario. Graben este segmento antes de publicar la primera reseña y colóquenlo aquí en la edición. | Estado vacío y navegación funcional. |
| **Erick** | Intenta enviar datos incompletos, email inválido o fecha futura. | Mensajes claros; el cliente detiene el envío. |
| **Jonathan** | Envía datos inválidos directamente a la API, sin usar el formulario. | HTTP 400 y errores por campo; no se guarda el registro inválido. |
| **Fernando** | Con una reseña guardada, detiene el backend y vuelve a consultar. Luego reinicia el servidor y pulsa “Intentar de nuevo”. | Error mientras la API está detenida; después aparece la reseña guardada y se demuestra la persistencia. |

Jonathan puede probar datos inválidos en PowerShell:

```powershell
$datosInvalidos = @{
  pelicula = ''
  autor = 'Jonathan'
  email = 'mal'
  descripcion = 'corta'
  fecha = '2099-01-01'
  genero = 'inventado'
} | ConvertTo-Json

try {
  Invoke-RestMethod -Method Post -Uri 'http://localhost:4000/registros' -ContentType 'application/json' -Body $datosInvalidos
} catch {
  Write-Output "Estado HTTP: $([int]$_.Exception.Response.StatusCode)"
  Write-Output $_.ErrorDetails.Message
}
```

Para la reseña válida usen, por ejemplo: película `Arrival`, autor `Fernando`, email `fernando@example.com`, fecha de hoy, género `Ciencia ficción` y una descripción de al menos 12 caracteres. El email se guarda, pero no se muestra en las tarjetas.

### 23:00–25:00 · Cierre

Cada uno resume su aporte y explica una dificultad que haya tenido realmente y cómo la resolvió. Pueden apoyarse en estos temas:

- **Marlon:** organización de rutas, componentes compartidos y diseño adaptable.
- **Erick:** sincronización del formulario con el estado y mensajes de validación.
- **Jonathan:** validación del servidor y conservación de registros en JSON.
- **Fernando:** conexión entre frontend y backend y estados de consulta.

Fernando muestra el repositorio y `README.md` con los comandos de ejecución. Marlon cierra mostrando el recorrido completo y las funciones terminadas.

## Preparación de la grabación

- Graben la lista vacía antes de crear la reseña de demostración.
- Mantengan visibles el editor y la terminal durante las actividades técnicas; hagan zoom para que se lean código y respuestas.
- Cada estudiante debe explicar y editar su parte durante la grabación. Muestren los cambios reales que realizan.
- Pueden grabar por etapas y unirlas conservando la secuencia y los nombres de quienes intervienen.
- Revisen audio, duración y participación de los cuatro antes de entregar.
