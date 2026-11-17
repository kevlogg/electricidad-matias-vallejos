import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MV Electricidad • Matías Vallejos',
    short_name: 'MV Electricidad',
    description:
      'Soluciones eléctricas profesionales, seguras y garantizadas por Matías Vallejos en Mar del Plata, Batán, Miramar, Santa Clara y Mar de Cobo. Urgencias 24hs, tableros e instalaciones.',
    start_url: '/admin',
    id: '/admin',
    display: 'standalone',
    background_color: '#0B0B0C',
    theme_color: '#FFE600',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Panel Admin',
        short_name: 'Admin',
        description: 'Gestión de clientes, presupuestos PDF y plan',
        url: '/admin',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Web Pública',
        short_name: 'Web',
        description: 'Sitio público de MV Electricidad',
        url: '/',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
  };
}
