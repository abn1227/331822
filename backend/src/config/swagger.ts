import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
    ],
    info: {
      title: "Handy Service API",
      version: "1.0.0",
      description: "API documentation for Handy Service Marketplace",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "API Support",
        url: "http://www.example.com/support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            code: {
              type: "string",
            },
          },
        },
        User: {
          type: "object",
          required: ["email", "name"],
          properties: {
            id: {
              type: "string",
              description: "User ID",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            name: {
              type: "string",
              description: "User name",
            },
            role: {
              type: "string",
              enum: ["admin", "user"],
              description: "User role",
            },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: {
              type: "string",
              description: "User name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            password: {
              type: "string",
              format: "password",
              description: "User password",
            },
            role: {
              type: "string",
              enum: ["admin", "user"],
              description: "User role",
            },
          },
        },
        CreateUserResponse: {
          type: "object",
          allOf: [
            {
              $ref: "#/components/schemas/CreateUserRequest",
            },
            {
              properties: {
                _id: {
                  type: "string",
                  description: "User ID",
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                },
              },
            },
          ],
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            user: {
              $ref: "#/components/schemas/User",
            },
            token: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // archivos a escanear
};

export const swaggerSpec = swaggerJsdoc(options);
