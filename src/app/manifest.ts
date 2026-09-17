import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'M5 Digital Growth — Digital Marketing & Growth Studio',
    short_name: 'M5 Growth',
    description: 'Independent digital growth studio engineering compounding growth for brands that refuse to plateau.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBFDFB',
    theme_color: '#00C16A',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192 512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
