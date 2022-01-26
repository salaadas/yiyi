"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("@generated/type-graphql");
const isAuth_1 = require("../middleware/isAuth");
let MessageInput = class MessageInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], MessageInput.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], MessageInput.prototype, "important", void 0);
MessageInput = __decorate([
    (0, type_graphql_1.InputType)()
], MessageInput);
const NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE';
let MessageResolver = class MessageResolver {
    async messages({ prisma }) {
        return await prisma.message.findMany();
    }
    async message({ prisma }, id) {
        return await prisma.message.findUnique({
            where: {
                id,
            },
        });
    }
    async createMessage(pubSub, input, { prisma, req }) {
        const message = await prisma.message.create({
            data: Object.assign(Object.assign({}, input), { userId: req.session.userId }),
        });
        await pubSub.publish(NEW_CHAT_MESSAGE, message);
        return message;
    }
    async updateMessage(input, id, { prisma, req }) {
        try {
            const updatedMessage = await prisma.message.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, input), { userId: req.session.userId }),
            });
            return updatedMessage;
        }
        catch (_a) {
            return null;
        }
    }
    async deleteMessage(id, { prisma }) {
        try {
            await prisma.message.delete({
                where: {
                    id,
                },
            });
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    messageSent(message) {
        return message;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [type_graphql_2.Message]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messages", null);
__decorate([
    (0, type_graphql_1.Query)(() => type_graphql_2.Message, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "message", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => type_graphql_2.Message),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.PubSub)()),
    __param(1, (0, type_graphql_1.Arg)('input')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_graphql_1.PubSubEngine,
        MessageInput, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => type_graphql_2.Message, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Arg)('id')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageInput, Number, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
__decorate([
    (0, type_graphql_1.Subscription)({ topics: NEW_CHAT_MESSAGE }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_graphql_2.Message]),
    __metadata("design:returntype", type_graphql_2.Message)
], MessageResolver.prototype, "messageSent", null);
MessageResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.js.map