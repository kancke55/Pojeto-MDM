const URL = 'http://localhost:3001';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function login(email, password) {
  console.log(email, password);
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers,
    });

    if (response.ok) {
      return response.json();
    }
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function getAccount(token) {
  try {
    const response = await fetch(`${URL}/accounts/`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createAccount(name, email, password) {
  try {
    const response = await fetch(`${URL}/user`, {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers,
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editAccount(editedAccount, token) {
  try {
    const response = await fetch(`${URL}/accounts/`, {
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
  } catch (error) { error } {
    try {
      const response = await fetch(`${URL}/transactions`, {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
    throw new Error(error.message);
  }


export async function deleteAccount(id, token) {
  try {
    const response = await fetch(`${URL}/accounts/`, {
      method: 'DELETE',
      headers: {
        ...headers,
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}