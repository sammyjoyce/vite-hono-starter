# Vite & Hono Starter

This is a starter template for building fullstack applications using Vite (with React) and Hono.
It provides a foundation for quickly prototyping
and developing web applications without the need for frameworks like Next.js.

## Features

- Hono server for building scalable and performant backend APIs
ady build configuration for optimized deployments
- Integration of Vite to build the frontend application for Hono to serve
- TypeScript support for both the frontend and backend
- RPC support for building fullstack applications with a single server

## Getting Started

To get started, install the dependencies and start the development server:

```bash
pnpm install && pnpm run dev
```

This will start the Hono server and Vite development server at `http://localhost:4000`.

## Building for Production

To build the application for production, run:

```bash
pnpm run build
```

This will build the frontend application using Vite and the backend application using Hono. The built application will be available in the `dist` directory for the server and the `build` directory for the client.

## Routing

The Hono server handles all server-side routing. To add a new route, create a new file in the `api` directory. Update `api/index.ts` to include the new route.

Hono also serves the frontend application. This allows you to take advantage of [Hono RPC](https://hono.dev/guides/rpc), allowing you to build fullstack applications with a single server.

## Accesing API Routes

To access the API routes, you can use the `api` object from the `utils/frontend` module. For example:

```javascript
import { api } from "../utils/frontend"
const res = await api.todo.list.$get()
```

## Contributing

This starter template is open to contributions. If you have any ideas or improvements, feel free to open an issue or a pull request.