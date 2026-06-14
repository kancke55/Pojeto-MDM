const URL = 'http://localhost:3001';
const headers = {
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

export async function login(email, password) {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers,
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao fazer login.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAccount(token) {
  try {
    const response = await fetch(`${URL}/user`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao buscar dados do usuário.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getComments(eventoId) {
  try {
    const response = await fetch(`${URL}/comments/${eventoId}`);

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao buscar comentários.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postComment(eventoId, texto, token) {
  try {
    const response = await fetch(`${URL}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `${token}`,
      },
      body: JSON.stringify({ eventoId, texto }),
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao enviar comentário.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createAccount(name, email, password) {
  try {
    const response = await fetch(`${URL}/user`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers,
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao criar conta.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editAccount(editedAccount, token) {
  try {
    const response = await fetch(`${URL}/user`, {
      method: 'PUT',
      body: JSON.stringify(editedAccount),
      headers: {
        ...headers,
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao atualizar conta.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteAccount(id, token) {
  try {
    const response = await fetch(`${URL}/user`, {
      method: 'DELETE',
      headers: {
        ...headers,
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao deletar conta.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function resendConfirmationEmail(email) {
  try {
    const response = await fetch(`${URL}/user/resend-confirmation`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers,
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao reenviar código de confirmação.');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createDonation(amount, email) {
  try {
    const response = await fetch(`${URL}/donate`, {
      method: 'POST',
      body: JSON.stringify({ amount, email }),
      headers,
    });

    if (response.ok) {
      return response.json();
    }

    const errorData = await parseResponse(response);
    throw new Error(errorData?.message || errorData || 'Erro ao criar doação.');
  } catch (error) {
    throw new Error(error.message);
  }
}