export default {
  type: "object",
  properties: {
    nombre: { type: 'string' },
    diametro: { type: 'string' },
    periodoRotacion: { type: 'string' },
    periodoOrbital: { type: 'string' },
    gravedad: { type: 'string' },
    poblacion: { type: 'string' },
    clima: { type: 'string' },
    terreno: { type: 'string' },
    aguaSuperficial: { type: 'string' },
    residentes: { type: 'array' },
    peliculas: { type: 'array' },
    url: { type: 'string' },
  },
  required: ['nombre', 'diametro', 'periodoRotacion', 'periodoOrbital', 'gravedad', 
  'poblacion', 'clima', 'terreno', 'aguaSuperficial', 'residentes', 'peliculas', 'url']
} as const;
