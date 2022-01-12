const EVENTS = {
  auth: {
    signUp: Symbol('signUp'),
    signIn: Symbol('signIn'),
  },
  auction: {
    start: Symbol('start'),
    update: Symbol('update'),
  },
};

export default EVENTS;
