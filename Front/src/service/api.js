const URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

async function parseResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildHeaders(token) {
  return token ? { ...defaultHeaders, Authorization: token } : defaultHeaders;
}

async function handleFetch(response, fallbackMessage) {
  if (response.ok) return response.json();
  const errorData = await parseResponse(response);
  throw new Error(errorData?.message || errorData || fallbackMessage);
}

export async function login(email, password) {
  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  });

  return handleFetch(response, 'Erro ao fazer login.');
}

export async function getAccount(token) {
  const response = await fetch(`${URL}/user`, {
    headers: buildHeaders(token),
  });

  return handleFetch(response, 'Erro ao buscar dados do usuário.');
}

export async function getComments(eventoId) {
  const response = await fetch(`${URL}/comments/${eventoId}`);
  return handleFetch(response, 'Erro ao buscar comentários.');
}

export async function postComment(eventoId, texto, token) {
  const response = await fetch(`${URL}/comments`, {
    method: 'POST',
    headers: buildHeaders(token),
    body: JSON.stringify({ eventoId, texto }),
  });

  return handleFetch(response, 'Erro ao enviar comentário.');
}

export async function createAccount(name, email, password) {
  const response = await fetch(`${URL}/user`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ name, email, password }),
  });

  return handleFetch(response, 'Erro ao criar conta.');
}

export async function editAccount(editedAccount, token) {
  const response = await fetch(`${URL}/user`, {
    method: 'PUT',
    headers: buildHeaders(token),
    body: JSON.stringify(editedAccount),
  });

  return handleFetch(response, 'Erro ao atualizar conta.');
}

export async function deleteAccount(token) {
  const response = await fetch(`${URL}/user`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  });

  return handleFetch(response, 'Erro ao deletar conta.');
}

export async function resendConfirmationEmail(email) {
  const response = await fetch(`${URL}/user/resend-confirmation`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email }),
  });

  return handleFetch(response, 'Erro ao reenviar código de confirmação.');
}

export async function requestPasswordReset(email) {
  const response = await fetch(`${URL}/user/reset-password-request`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email }),
  });

  return handleFetch(response, 'Erro ao solicitar recuperação de senha.');
}

export async function resetPassword(token, newPassword, confirmPassword) {
  const response = await fetch(`${URL}/user/reset-password`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ token, newPassword, confirmPassword }),
  });

  return handleFetch(response, 'Erro ao redefinir senha.');
}
