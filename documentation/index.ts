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
    // "/api/v1/users/{id}": {
    //   delete: {
    //     tags: ["User"],
    //     description: "Delete a user",
    //     responses: {
    //       201: {
    //         description: "successfully",
    //       },
    //       400: {
    //         description: "Bad request",
    //       },
    //       409: {
    //         description: "email already exists",
    //       },
    //     },
    //   },
    // },
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
    },
  },
};
docrouter.use("/", serve, setup(options));
export default docrouter;