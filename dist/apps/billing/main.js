/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/billing/src/billing.controller.ts":
/*!************************************************!*\
  !*** ./apps/billing/src/billing.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const billing_service_1 = __webpack_require__(/*! ./billing.service */ "./apps/billing/src/billing.service.ts");
let BillingController = class BillingController {
    constructor(billingService, rmqService) {
        this.billingService = billingService;
        this.rmqService = rmqService;
    }
    getHello() {
        return this.billingService.getHello();
    }
    async handleOrderCreated(data, context) {
        this.billingService.bill(data);
        this.rmqService.ack(context);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BillingController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.EventPattern)('order_created'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "handleOrderCreated", null);
BillingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof billing_service_1.BillingService !== "undefined" && billing_service_1.BillingService) === "function" ? _a : Object, typeof (_b = typeof common_2.RmqService !== "undefined" && common_2.RmqService) === "function" ? _b : Object])
], BillingController);
exports.BillingController = BillingController;


/***/ }),

/***/ "./apps/billing/src/billing.module.ts":
/*!********************************************!*\
  !*** ./apps/billing/src/billing.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const Joi = __webpack_require__(/*! joi */ "joi");
const billing_controller_1 = __webpack_require__(/*! ./billing.controller */ "./apps/billing/src/billing.controller.ts");
const billing_service_1 = __webpack_require__(/*! ./billing.service */ "./apps/billing/src/billing.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let BillingModule = class BillingModule {
};
BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    RABBIT_MQ_URI: Joi.string().required(),
                    RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
                }),
            }),
            common_2.RmqModule,
            common_2.AuthModule,
        ],
        controllers: [billing_controller_1.BillingController],
        providers: [billing_service_1.BillingService],
    })
], BillingModule);
exports.BillingModule = BillingModule;


/***/ }),

/***/ "./apps/billing/src/billing.service.ts":
/*!*********************************************!*\
  !*** ./apps/billing/src/billing.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BillingService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let BillingService = BillingService_1 = class BillingService {
    constructor() {
        this.logger = new common_1.Logger(BillingService_1.name);
    }
    getHello() {
        return 'Hello World!';
    }
    bill(data) {
        this.logger.log('Billing...', data);
    }
};
BillingService = BillingService_1 = __decorate([
    (0, common_1.Injectable)()
], BillingService);
exports.BillingService = BillingService;


/***/ }),

/***/ "./libs/common/src/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./libs/common/src/auth/auth.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const rmq_module_1 = __webpack_require__(/*! ../rmq/rmq.module */ "./libs/common/src/rmq/rmq.module.ts");
const services_1 = __webpack_require__(/*! ./services */ "./libs/common/src/auth/services.ts");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [rmq_module_1.RmqModule.register({ name: services_1.AUTH_SERVICE })],
        exports: [rmq_module_1.RmqModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/common/src/auth/jwt-auth.guard.ts":
/*!************************************************!*\
  !*** ./libs/common/src/auth/jwt-auth.guard.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const services_1 = __webpack_require__(/*! ./services */ "./libs/common/src/auth/services.ts");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(authClient) {
        this.authClient = authClient;
    }
    canActivate(context) {
        const authentication = this.getAuthentication(context);
        return this.authClient
            .send('validate_user', {
            Authentication: authentication,
        })
            .pipe((0, rxjs_1.tap)((res) => {
            this.addUser(res, context);
        }), (0, rxjs_1.catchError)(() => {
            throw new common_1.UnauthorizedException();
        }));
    }
    getAuthentication(context) {
        var _a;
        let authentication;
        if (context.getType() === 'rpc') {
            authentication = context.switchToRpc().getData().Authentication;
        }
        else if (context.getType() === 'http') {
            authentication = (_a = context.switchToHttp().getRequest()
                .cookies) === null || _a === void 0 ? void 0 : _a.Authentication;
        }
        if (!authentication) {
            throw new common_1.UnauthorizedException('No value was provided for Authentication');
        }
        return authentication;
    }
    addUser(user, context) {
        if (context.getType() === 'rpc') {
            context.switchToRpc().getData().user = user;
        }
        else if (context.getType() === 'http') {
            context.switchToHttp().getRequest().user = user;
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./libs/common/src/auth/services.ts":
/*!******************************************!*\
  !*** ./libs/common/src/auth/services.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_SERVICE = void 0;
exports.AUTH_SERVICE = 'AUTH';


/***/ }),

/***/ "./libs/common/src/database/abstract.repository.ts":
/*!*********************************************************!*\
  !*** ./libs/common/src/database/abstract.repository.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
class AbstractRepository {
    constructor(model, connection) {
        this.model = model;
        this.connection = connection;
    }
    async create(document, options) {
        const createdDocument = new this.model(Object.assign(Object.assign({}, document), { _id: new mongoose_1.Types.ObjectId() }));
        return (await createdDocument.save(options)).toJSON();
    }
    async findOne(filterQuery) {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async findOneAndUpdate(filterQuery, update) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true,
        });
        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async upsert(filterQuery, document) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true,
        });
    }
    async find(filterQuery) {
        return this.model.find(filterQuery, {}, { lean: true });
    }
    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
    async updateMany(filterQuery, update) {
        const result = await this.model.updateMany(filterQuery, update);
        if (result.modifiedCount === 0) {
            this.logger.warn(`No documents found to update with filterQuery:`, filterQuery);
            throw new common_1.NotFoundException('No documents found to update.');
        }
        return result;
    }
}
exports.AbstractRepository = AbstractRepository;


/***/ }),

/***/ "./libs/common/src/database/abstract.schema.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/database/abstract.schema.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractDocument = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let AbstractDocument = class AbstractDocument {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], AbstractDocument.prototype, "_id", void 0);
AbstractDocument = __decorate([
    (0, mongoose_1.Schema)()
], AbstractDocument);
exports.AbstractDocument = AbstractDocument;


/***/ }),

/***/ "./libs/common/src/database/database.module.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/database/database.module.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./database/database.module */ "./libs/common/src/database/database.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/abstract.repository */ "./libs/common/src/database/abstract.repository.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/abstract.schema */ "./libs/common/src/database/abstract.schema.ts"), exports);
__exportStar(__webpack_require__(/*! ./rmq/rmq.service */ "./libs/common/src/rmq/rmq.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./rmq/rmq.module */ "./libs/common/src/rmq/rmq.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/auth.module */ "./libs/common/src/auth/auth.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/jwt-auth.guard */ "./libs/common/src/auth/jwt-auth.guard.ts"), exports);


/***/ }),

/***/ "./libs/common/src/rmq/rmq.module.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/rmq/rmq.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rmq_service_1 = __webpack_require__(/*! ./rmq.service */ "./libs/common/src/rmq/rmq.service.ts");
let RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService) => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBIT_MQ_URI')],
                                queue: configService.get(`RABBIT_MQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);
exports.RmqModule = RmqModule;


/***/ }),

/***/ "./libs/common/src/rmq/rmq.service.ts":
/*!********************************************!*\
  !*** ./libs/common/src/rmq/rmq.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let RmqService = class RmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(queue, noAck = false) {
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBIT_MQ_URI')],
                queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
    }
    ack(context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
};
RmqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RmqService);
exports.RmqService = RmqService;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./apps/billing/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const billing_module_1 = __webpack_require__(/*! ./billing.module */ "./apps/billing/src/billing.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(billing_module_1.BillingModule);
    const rmqService = app.get(common_1.RmqService);
    app.connectMicroservice(rmqService.getOptions('BILLING'));
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;