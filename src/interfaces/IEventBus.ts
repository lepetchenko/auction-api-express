import EventEmitter from 'events';

export interface IEventBus extends EventEmitter {
  subscribe(eventName: symbol): (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => PropertyDescriptor;
}
