import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Para middleware com localStorage, vamos usar uma abordagem diferente
  // O middleware do Next.js roda no servidor, então não tem acesso ao localStorage
  // A proteção de rotas será feita pelo componente ProtectedRoute

  const { pathname } = request.nextUrl;

  // Permitir acesso livre à página de login
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Para outras rotas, deixar o ProtectedRoute handle a autenticação
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
