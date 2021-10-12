const TYPES = {
  services: {
    AuthService: Symbol('AuthService'),
    MailService: Symbol('MailService'),
  },
  models: {
    UserModel: Symbol('UserModel'),
  },
  decorators: {
    EventBus: Symbol('EventBus'),
  },
};

export default TYPES;
