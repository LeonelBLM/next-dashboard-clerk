import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    const user = await prisma.usuario.findFirst({
      where: { pin },
      include: { rol: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Crear sesión
    const sessionToken = crypto.randomUUID();
    
    // Guardar token en cookies
    cookies().set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    return NextResponse.json({ 
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        rol: user.rol.rol
      }
    });
  } catch (error) {
    console.error('Error en signin:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}