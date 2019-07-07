const localStorageMiddleware = store => next => action => {
  if (['LOGIN_USER', 'NEW_USER'].includes(action.type)) {
    if (action.payload.token) {
      window.localStorage.setItem('jwt', action.payload.token);
    }
  } else if (action.type === 'LOGOUT_USER') {
    window.localStorage.removeItem('jwt');
  }

  next(action);
};

export { localStorageMiddleware };
