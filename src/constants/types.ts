const TYPES = {
  routes: {
    AuthRoutes: Symbol('AuthRoutes'),
    AuctionRoutes: Symbol('AuctionRoutes'),
  },
  controllers: {
    AuthController: Symbol('AuthController'),
    AuctionController: Symbol('AuctionController'),
  },
  services: {
    MailService: Symbol('MailService'),
    JWTService: Symbol('JWTService'),
    TelegramService: Symbol('TelegramService'),
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
