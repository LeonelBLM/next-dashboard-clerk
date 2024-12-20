import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token');

  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/signin', '/signup'];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Verificar si el usuario está autenticado
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Aquí podrías verificar los permisos basados en el rol
  // Por ejemplo, obteniendo el usuario de la base de datos y verificando su rol

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};