const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    });
  } catch {
    throw new Error('No se pudo conectar con la API. Comprueba que el servidor esté iniciado.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Ocurrió un error. Inténtalo de nuevo.');
  return data;
}

export async function getRegistros() {
  const data = await request('/registros');
  return data.registros;
}

export async function createRegistro(record) {
  return request('/registros', { method: 'POST', body: JSON.stringify(record) });
}
