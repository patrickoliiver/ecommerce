export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://fakestoreapi.com",
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
  },
  external: {
    viaCepUrl: process.env.NEXT_PUBLIC_VIACEP_URL || "https://viacep.com.br/ws",
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "E-commerce",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },
} as const;
