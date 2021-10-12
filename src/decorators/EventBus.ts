import { injectable } from 'inversify';
import EventEmitter from 'events';

import { IEventBus } from '@/interfaces/IEventBus';

/**
 * This class was created for ability to subscribe some functions for events via decorators
 */
@injectable()
class EventBus extends EventEmitter implements IEventBus {
  public constructor() {
    super();
  }

  subscribe = (eventName: symbol): any => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    this.on(eventName, descriptor.value);

    return descriptor;
  };
}

export const eventBusInstance = new EventBus();
export const { subscribe } = eventBusInstance;
