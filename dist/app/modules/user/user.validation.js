"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "name is required",
    }),
    email: zod_1.z.string({
        required_error: "name is required",
    }),
    password: zod_1.z.string({
        required_error: "password is required",
    }),
    bio: zod_1.z.string({
        required_error: "bio is required",
    }),
    profession: zod_1.z.string({
        required_error: "profession is required",
    }),
    address: zod_1.z.string({
        required_error: "profession is required",
    }),
});
exports.userValidations = {
    createUser
};
