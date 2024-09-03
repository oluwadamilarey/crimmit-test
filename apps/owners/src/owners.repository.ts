import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Owner } from './schemas/owner.schema';

@Injectable()
export class OwnersRepository extends AbstractRepository<Owner> {
  protected readonly logger = new Logger(OwnersRepository.name);

  constructor(
    @InjectModel(Owner.name) ownerModel: Model<Owner>,
    @InjectConnection() connection: Connection,
  ) {
    super(ownerModel, connection);
  }
}