const TYPES = {
  services: {
    AuthService: Symbol('AuthService'),
    JWTService: Symbol('JWTService'),
  },
  models: {
    UserModel: Symbol('UserModel'),
    RefreshToken: Symbol('RefreshToken'),
  },
  decorators: {
    EventBus: Symbol('EventBus'),
  },
};

export default TYPES;
