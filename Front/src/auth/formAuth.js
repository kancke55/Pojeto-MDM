export const loginValidation =  (email, password) => {
    // if(!email || !password) {
       
    // }

    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

    if(!emailValidation) {
      window.alert('Digite um email válido.')
      return false;
    }
    if(password.length < 6) {
      window.alert('Digite uma senha com 6 ou mais caracteres.');
      return false; 
    } return true;
}

export const registerValidation =  (name, email, password) => {
    // if(!email || !password) {
       
    // }

    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    if(name.length < 3) {
        window.alert('Digite um nome com 3 ou mais caracteres.');
        return false;
    }
    if(!emailValidation) {
      window.alert('Digite um email válido.')
      return false;
    }
    if(password.length < 6) {
      window.alert('Digite uma senha com 6 ou mais caracteres.');
      return false; 
    } return true;
}