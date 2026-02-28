import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Marketing Neo API',
      version: '1.1.0',
      description: 'API documentation for the Marketing Neo project',
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints',
      },
      {
        name: 'Projects',
        description: 'Project management endpoints',
      },
    ],
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: process.env.API_URL ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.{ts,js}', './src/controllers/*.{ts,js}'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
