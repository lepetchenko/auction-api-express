import { injectable } from 'inversify';
import { notFound } from '@hapi/boom';
import { Model } from 'mongoose';
import { ICommonController } from '@/interfaces/ICommonController';

@injectable()
export default class CommonController implements ICommonController {
  // eslint-disable-next-line class-methods-use-this
  protected async checkEntityExistence<T>(model: Model<T>, id: string): Promise<T> {
    const entity = await model.findOne({ _id: id });

    if (!entity) {
      throw notFound(`Can not found ${model.collection.name.replace('s', '')} by given id`);
    }

    return entity;
  }
}
