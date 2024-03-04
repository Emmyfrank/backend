"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = require("swagger-ui-express");
const dotenv_1 = __importDefault(require("dotenv"));
const docrouter = (0, express_1.Router)();
dotenv_1.default.config();
const host = `http://localhost:${process.env.PORT}`;
const options = {
    openapi: "3.0.1",
    info: {
        title: "BACKEND",
        version: "1.0.0",
        description: "My backend api documentation",
    },
    servers: [
        {
            url: "https://backend-ctov.onrender.com/",
        },
        {
            url: host,
        },
    ],
    basePath: "/",
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags: [],
    paths: {
        "/": {
            get: {
                tags: ["homepage"],
                description: "Welcome message",
                parameters: [],
                responses: {
                    200: {
                        description: "successfully",
                    },
                },
            },
        },
        "/api/v1/users": {
            get: {
                tags: ["User"],
                description: "Get all users",
                parameters: [],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/api/v1/users/{id}": {
            get: {
                tags: ["User"],
                description: "Get single user",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
            delete: {
                tags: ["User"],
                description: "Delete a user",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    201: {
                        description: "successfully",
                    },
                    400: {
                        description: "Bad request",
                    },
                    409: {
                        description: "email already exists",
                    },
                },
            },
        },
        "/api/v1/users/login": {
            post: {
                tags: ["User"],
                description: "User login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "successfully",
                    },
                    400: {
                        description: "Bad request",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/api/v1/users/register": {
            post: {
                tags: ["User"],
                description: "User login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Register",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "successfully",
                    },
                    400: {
                        description: "Bad request",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/users/assign-role": {
            patch: {
                tags: ["User"],
                description: "Assign role to user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AssignRole",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "successfully",
                    },
                    400: {
                        description: "Bad request",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Forbidden",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/comments": {
            get: {
                tags: ["Comments"],
                description: "get comments",
                responses: {
                    200: {
                        description: "successfully",
                    },
                    404: {
                        description: "No comments found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            post: {
                tags: ["Comments"],
                description: "Create a comment",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Comment",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "successfully",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/comments/{id}": {
            get: {
                tags: ["Comments"],
                description: "get single comment",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    404: {
                        description: "Comment not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            delete: {
                tags: ["Comments"],
                description: "Delete a comment",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    404: {
                        description: "Not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/messages": {
            get: {
                tags: ["Messages"],
                description: "get messages",
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    404: {
                        description: "No comments found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            post: {
                tags: ["Messages"],
                description: "Create a message",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Message",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "successfully",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/messages/{id}": {
            get: {
                tags: ["Messages"],
                description: "get single message",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Un authorized",
                    },
                    404: {
                        description: "Message not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            delete: {
                tags: ["Messages"],
                description: "Delete a message",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    404: {
                        description: "Not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/articles": {
            get: {
                tags: ["Articles"],
                description: "get all articles",
                responses: {
                    200: {
                        description: "successfully",
                    },
                    404: {
                        description: "No article found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            post: {
                tags: ["Articles"],
                description: "Create an article",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Article",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "successfully",
                    },
                    400: {
                        description: "incorrect data submitted",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/articles/{id}": {
            get: {
                tags: ["Articles"],
                description: "get a single article",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    404: {
                        description: "Article not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            delete: {
                tags: ["Articles"],
                description: "Delete an article",
                parameters: [{ in: "path", name: "id", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Not admin",
                    },
                    404: {
                        description: "Not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            patch: {
                tags: ["Articles"],
                description: "Update/Edit an article",
                parameters: [{ in: "path", name: "id", required: true }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateArticle",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Not admin",
                    },
                    404: {
                        description: "Not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/v1/articles/{articleId}": {
            post: {
                tags: ["Likes"],
                description: "Like/dislike an article",
                parameters: [{ in: "path", name: "articleId", required: true }],
                responses: {
                    200: {
                        description: "successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Not admin",
                    },
                    404: {
                        description: "Not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
    },
    //   securityDefinitions: {
    //   },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            Register: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        required: true,
                        description: "Name of user",
                    },
                    email: {
                        type: "string",
                        required: true,
                        description: "Email of user",
                    },
                    password: {
                        type: "string",
                        required: true,
                        description: "Password of user",
                    },
                    username: {
                        type: "string",
                        required: true,
                        description: "A user name",
                    },
                },
                example: {
                    name: "Jane Doe",
                    email: "janedoe@gmail.com",
                    password: "janedoel250",
                    username: "janedoel250",
                },
            },
            Login: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        required: true,
                        description: "email of user",
                    },
                    password: {
                        type: "string",
                        description: "password of user",
                    },
                },
                example: {
                    email: "janedoe@gmail.com",
                    password: "janedoel250",
                },
            },
            Comment: {
                type: "object",
                properties: {
                    articleId: {
                        type: "string",
                        required: true,
                        description: "Id of the article",
                    },
                    comment: {
                        type: "string",
                        required: true,
                        description: "Comment content",
                    },
                },
                example: {
                    articleId: "65e4de4844eda5bed01446bc",
                    comment: "I like it",
                },
            },
            Message: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        required: true,
                        description: "Name of user",
                    },
                    email: {
                        type: "string",
                        required: true,
                        description: "Email of user",
                    },
                    message: {
                        type: "string",
                        required: true,
                        description: "Message content",
                    },
                },
                example: {
                    name: "Jane Doe",
                    email: "janedoe@gmail.com",
                    message: "You are on fire",
                },
            },
            Article: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        required: true,
                        description: "Title of of the article",
                    },
                    description: {
                        type: "string",
                        required: true,
                        description: "Description of the article",
                    },
                    image: {
                        type: "string",
                        required: true,
                        description: "Hosted image url",
                    },
                },
                example: {
                    name: "Jane Doe",
                    description: "article description",
                    image: "https://buffer.com/cdn-cgi",
                },
            },
            UpdateArticle: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        required: false,
                        description: "Title of of the article",
                    },
                    description: {
                        type: "string",
                        required: false,
                        description: "Description of the article",
                    },
                    image: {
                        type: "string",
                        required: false,
                        description: "Hosted image url",
                    },
                },
                example: {
                    title: "Jane Doe",
                    description: "article description",
                    image: "https://buffer.com/cdn-cgi",
                },
            },
            AssignRole: {
                type: "object",
                properties: {
                    userId: {
                        type: "string",
                        required: true,
                        description: "User id",
                    },
                    role: {
                        type: "string",
                        required: true,
                        description: "The role to assign to the user",
                    },
                },
                // example: {
                //   description: "article description",
                //   image: "https://buffer.com/cdn-cgi",
                // },
            },
        },
    },
};
docrouter.use("/", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(options));
exports.default = docrouter;
//# sourceMappingURL=index.js.map