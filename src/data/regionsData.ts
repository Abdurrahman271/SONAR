import type { RegionData } from '../types';

export const INDONESIA_REGIONS: RegionData[] = [
  {
    id: 'reg-dki',
    name: 'DKI Jakarta & Bodetabek',
    code: 'JKT',
    volume: 84500,
    threatIndex: 88,
    botPercentage: 62.4,
    dominantSentiment: 'provokatif',
    topIssues: ['#RushMoney', '#LikuiditasBank', '#IsuFinansial'],
    // DKI Jakarta province centroid (prov-31: x:268.3, y:290.5)
    coordinates: { x: 268, y: 291 }
  },
  {
    id: 'reg-jbar',
    name: 'Jawa Barat & Banten',
    code: 'JBR',
    volume: 54200,
    threatIndex: 79,
    botPercentage: 54.8,
    dominantSentiment: 'negatif',
    topIssues: ['#HargaPangan', '#ViralAntrean', '#Sirekap'],
    // Jawa Barat centroid (prov-32: x:285.6, y:304.6)
    coordinates: { x: 299, y: 310 }
  },
  {
    id: 'reg-jatim',
    name: 'Jawa Timur',
    code: 'JTM',
    volume: 48900,
    threatIndex: 82,
    botPercentage: 58.2,
    dominantSentiment: 'provokatif',
    topIssues: ['#RushMoney', '#TarikTunaiATM', '#WaspadaBank'],
    // Jawa Timur centroid (prov-35: x:401.1, y:318.1)
    coordinates: { x: 401, y: 318 }
  },
  {
    id: 'reg-jateng',
    name: 'Jawa Tengah & DIY',
    code: 'JTG',
    volume: 38400,
    threatIndex: 44,
    botPercentage: 22.1,
    dominantSentiment: 'netral',
    topIssues: ['#SubsidiTepatSasaran', '#Pariwisata', '#Kondusif'],
    // Jawa Tengah centroid (prov-33: x:338.3, y:315.6)
    coordinates: { x: 338, y: 316 }
  },
  {
    id: 'reg-sumut',
    name: 'Sumatera Bagian Utara',
    code: 'SMU',
    volume: 31200,
    threatIndex: 71,
    botPercentage: 46.5,
    dominantSentiment: 'negatif',
    topIssues: ['#BBMSubsidi', '#MogokKerja', '#KawalDemokrasi'],
    // Sumatera Utara centroid (prov-12: x:101.2, y:120)
    coordinates: { x: 101, y: 120 }
  },
  {
    id: 'reg-sumsel',
    name: 'Sumatera Bagian Selatan',
    code: 'SMS',
    volume: 24500,
    threatIndex: 52,
    botPercentage: 31.0,
    dominantSentiment: 'netral',
    topIssues: ['#HargaKomoditas', '#SawitRakyat', '#Logistik'],
    // Sumatera Selatan centroid (prov-16: x:212.3, y:222)
    coordinates: { x: 212, y: 222 }
  },
  {
    id: 'reg-ikn',
    name: 'Kalimantan & IKN Nusantara',
    code: 'IKN',
    volume: 29800,
    threatIndex: 35,
    botPercentage: 18.4,
    dominantSentiment: 'positif',
    topIssues: ['#IKNNusantara', '#SmartCity', '#KetahananEnergi'],
    // Kalimantan Timur centroid (prov-64: x:469.6, y:147.9) — IKN Nusantara location
    coordinates: { x: 470, y: 148 }
  },
  {
    id: 'reg-sulsel',
    name: 'Sulawesi Selatan & Barat',
    code: 'SLS',
    volume: 21300,
    threatIndex: 48,
    botPercentage: 28.6,
    dominantSentiment: 'netral',
    topIssues: ['#LogistikLaut', '#StabilitasPangan', '#Maritim'],
    // Sulawesi Selatan centroid (prov-73: x:549.5, y:253.9)
    coordinates: { x: 549, y: 254 }
  },
  {
    id: 'reg-bali',
    name: 'Bali & Nusa Tenggara',
    code: 'BLI',
    volume: 18200,
    threatIndex: 28,
    botPercentage: 14.2,
    dominantSentiment: 'positif',
    topIssues: ['#PariwisataInternasional', '#EkonomiKreatif', '#BaliAman'],
    // Bali centroid (prov-51: x:441.4, y:341.9)
    coordinates: { x: 441, y: 342 }
  },
  {
    id: 'reg-papua',
    name: 'Papua & Maluku',
    code: 'PAP',
    volume: 14500,
    threatIndex: 64,
    botPercentage: 42.1,
    dominantSentiment: 'negatif',
    topIssues: ['#KonektivitasInternet', '#DistribusiPangan', '#Kesejahteraan'],
    // Papua Tengah centroid (prov-91: x:884.4, y:233.5) — central Papua
    coordinates: { x: 884, y: 234 }
  }
];
