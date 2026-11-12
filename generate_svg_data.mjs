import fs from 'fs';

const geo = JSON.parse(fs.readFileSync('d:/SONAR/src/data/indonesia-38-provinces.geojson', 'utf-8'));

const W = 1000;
const H = 420;
const lonMin = 94.8;
const lonMax = 141.2;
const latMin = -11.2;
const latMax = 6.2;
const PAD_X = 20;
const PAD_Y = 20;
const innerW = W - PAD_X * 2;
const innerH = H - PAD_Y * 2;

function project(lon, lat) {
  const x = PAD_X + ((lon - lonMin) / (lonMax - lonMin)) * innerW;
  const y = PAD_Y + ((latMax - lat) / (latMax - latMin)) * innerH;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function getIslandGroup(name) {
  if (/Aceh|Sumatera|Riau|Jambi|Bengkulu|Lampung|Bangka/i.test(name)) return 'Sumatera';
  if (/Jakarta|Banten|Jawa|Yogyakarta/i.test(name)) return 'Jawa';
  if (/Bali|Nusa Tenggara/i.test(name)) return 'Bali-Nusa';
  if (/Kalimantan/i.test(name)) return 'Kalimantan';
  if (/Sulawesi|Gorontalo/i.test(name)) return 'Sulawesi';
  if (/Maluku/i.test(name)) return 'Maluku';
  if (/Papua/i.test(name)) return 'Papua';
  return 'Lainnya';
}

const colorPalette = {
  Sumatera: ['#fef08a', '#bbf7d0', '#fed7aa', '#fbcfe8', '#a7f3d0', '#fde68a', '#e9d5ff', '#fed7aa'],
  Jawa: ['#fbcfe8', '#fde68a', '#bbf7d0', '#fed7aa', '#fef08a'],
  'Bali-Nusa': ['#fbcfe8', '#a7f3d0', '#fed7aa', '#fde68a'],
  Kalimantan: ['#bbf7d0', '#fde68a', '#fed7aa', '#fbcfe8', '#a7f3d0'],
  Sulawesi: ['#fde68a', '#fbcfe8', '#a7f3d0', '#bbf7d0', '#fed7aa', '#e9d5ff'],
  Maluku: ['#fde68a', '#fed7aa', '#bbf7d0'],
  Papua: ['#a7f3d0', '#fed7aa', '#fde68a', '#fbcfe8', '#bbf7d0', '#fed7aa']
};

const colIdx = { Sumatera: 0, Jawa: 0, 'Bali-Nusa': 0, Kalimantan: 0, Sulawesi: 0, Maluku: 0, Papua: 0 };

const provinces = geo.features.map(f => {
  let path = '';
  let sumX = 0, sumY = 0, count = 0;

  function handleRing(ring) {
    ring.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      path += (i === 0 ? 'M ' : ' L ') + x + ' ' + y;
      sumX += x;
      sumY += y;
      count++;
    });
    path += ' Z ';
  }

  const geom = f.geometry;
  if (geom.type === 'Polygon') geom.coordinates.forEach(handleRing);
  else if (geom.type === 'MultiPolygon') geom.coordinates.forEach(poly => poly.forEach(handleRing));

  const group = getIslandGroup(f.properties.PROVINSI);
  const pal = colorPalette[group] || ['#e2e8f0'];
  const color = pal[colIdx[group] % pal.length];
  colIdx[group] = (colIdx[group] || 0) + 1;

  const center = count > 0 ? {
    x: Math.round((sumX / count) * 10) / 10,
    y: Math.round((sumY / count) * 10) / 10
  } : { x: 500, y: 220 };

  return {
    id: 'prov-' + f.properties.KODE_PROV,
    code: f.properties.KODE_PROV,
    name: f.properties.PROVINSI,
    islandGroup: group,
    color: color,
    center: center,
    path: path.trim()
  };
});

const order = ['Sumatera', 'Jawa', 'Bali-Nusa', 'Kalimantan', 'Sulawesi', 'Maluku', 'Papua'];
provinces.sort((a, b) => order.indexOf(a.islandGroup) - order.indexOf(b.islandGroup));

const codeContent = `// Real 38-Province GeoJSON converted to High-Precision SVG Paths
// Projection: WGS84 EPSG:4326 to 1000x420 viewBox canvas

export interface ProvinceSvgData {
  id: string;
  code: string;
  name: string;
  islandGroup: 'Sumatera' | 'Jawa' | 'Bali-Nusa' | 'Kalimantan' | 'Sulawesi' | 'Maluku' | 'Papua' | string;
  color: string;
  center: { x: number; y: number };
  path: string;
}

export const INDONESIA_38_PROVINCES: ProvinceSvgData[] = ${JSON.stringify(provinces, null, 2)};
`;

fs.writeFileSync('d:/SONAR/src/data/indonesiaProvinceSvgData.ts', codeContent);
console.log('Successfully written d:/SONAR/src/data/indonesiaProvinceSvgData.ts (', (codeContent.length / 1024).toFixed(1), 'KB)');

