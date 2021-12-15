const TYPES = {
  routes: {
    AuthRoutes: Symbol('AuthRoutes'),
  },
  services: {
    AuthService: Symbol('AuthService'),
    MailService: Symbol('MailService'),
    JWTService: Symbol('JWTService'),
    TelegramService: Symbol('TelegramService'),
  },
  models: {
    UserModel: Symbol('UserModel'),
    RefreshToken: Symbol('RefreshToken'),
    TelegramBotUserChat: Symbol('TelegramBotUserChat'),
  },
  decorators: {
    EventBus: Symbol('EventBus'),
  },
};

export default TYPES;
