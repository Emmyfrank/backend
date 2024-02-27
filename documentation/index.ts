import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import dotenv from "dotenv";

const docrouter = Router();
dotenv.config();
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
      url: "https://backend-mu-mauve.vercel.app/",
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
          name: {
            type: "string",
            required: true,
            description: "Name of user",
          },
          comment: {
            type: "string",
            required: true,
            description: "Comment content",
          }, 
        },
        example: {
          name: "Jane Doe",
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
    },
  },
};
docrouter.use("/", serve, setup(options));
export default docrouter;