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
        name: "HandyMan",
        description: "Handyman management endpoints",
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
      },
    },
  },
  apis: ["./src/dtos/**/*.ts", "./src/routes/*.ts", "./src/controllers/*.ts"], // archivos a escanear
};

export const swaggerSpec = swaggerJsdoc(options);
