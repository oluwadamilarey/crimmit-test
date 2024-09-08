import { Logger, NotFoundException } from "@nestjs/common";
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  UpdateWriteOpResult,
} from "mongoose";
import { AbstractDocument } from "./abstract.schema";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection
  ) {}

  async create(
    document: Omit<TDocument, "_id">,
    options?: SaveOptions
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn("Document not found with filterQuery", filterQuery);
      throw new NotFoundException("Document not found.");
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException("Document not found.");
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ): Promise<UpdateWriteOpResult> {
    const result = await this.model.updateMany(filterQuery, update);

    if (result.modifiedCount === 0) {
      this.logger.warn(
        `No documents found to update with filterQuery:`,
        filterQuery
      );
      throw new NotFoundException("No documents found to update.");
    }

    return result;
  }

  async save(document: TDocument, options?: SaveOptions): Promise<TDocument> {
    let savedDocument: TDocument;

    if (document._id) {
      // If the document has an _id, it already exists in the database
      savedDocument = await this.model.findByIdAndUpdate(
        document._id,
        document,
        { new: true, ...options }
      );
      if (!savedDocument) {
        this.logger.warn(`Document not found with id:`, document._id);
        throw new NotFoundException("Document not found.");
      }
    } else {
      // If the document doesn't have an _id, create a new one
      savedDocument = await this.create(document, options);
    }

    return savedDocument;
  }
}
