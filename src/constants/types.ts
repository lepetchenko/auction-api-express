const TYPES = {
  routes: {
    AuthRoutes: Symbol('AuthRoutes'),
    AuctionRoutes: Symbol('AuctionRoutes'),
  },
  services: {
    AuthService: Symbol('AuthService'),
    MailService: Symbol('MailService'),
    JWTService: Symbol('JWTService'),
    TelegramService: Symbol('TelegramService'),
    AuctionService: Symbol('AuctionService'),
  },
  models: {
    UserModel: Symbol('UserModel'),
    RefreshToken: Symbol('RefreshToken'),
    TelegramBotUserChat: Symbol('TelegramBotUserChat'),
    AuctionModel: Symbol('AuctionModel'),
  },
  decorators: {
    EventBus: Symbol('EventBus'),
  },
};

export default TYPES;
