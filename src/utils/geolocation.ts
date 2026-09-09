/**
 * Geolocation & Province Detection Utility for Metfone Solar Cambodia
 * Maps GPS coordinates to one of the 25 Cambodian provinces using haversine distance
 * and reverse geocoding with zero friction.
 */

export interface ProvinceGeoInfo {
  id: string;
  nameEn: string;
  nameKh: string;
  nameVi: string;
  lat: number;
  lng: number;
  solarIrradiancePeakHours: number; // Peak sun hours/day in this region
}

export const CAMBODIA_PROVINCE_COORDINATES: ProvinceGeoInfo[] = [
  { id: 'phnom_penh', nameEn: 'Phnom Penh', nameKh: 'រាជធានីភ្នំពេញ', nameVi: 'Phnôm Pênh', lat: 11.5564, lng: 104.9282, solarIrradiancePeakHours: 4.6 },
  { id: 'kandal', nameEn: 'Kandal', nameKh: 'កណ្ដាល', nameVi: 'Kandal', lat: 11.4500, lng: 105.0000, solarIrradiancePeakHours: 4.6 },
  { id: 'siem_reap', nameEn: 'Siem Reap', nameKh: 'សៀមរាប', nameVi: 'Siem Reap', lat: 13.3671, lng: 103.8448, solarIrradiancePeakHours: 4.8 },
  { id: 'battambang', nameEn: 'Battambang', nameKh: 'បាត់ដំបង', nameVi: 'Battambang', lat: 13.0957, lng: 103.2022, solarIrradiancePeakHours: 4.7 },
  { id: 'preah_sihanouk', nameEn: 'Sihanoukville (Preah Sihanouk)', nameKh: 'ព្រះសីហនុ', nameVi: 'Sihanoukville', lat: 10.6275, lng: 103.5222, solarIrradiancePeakHours: 4.4 },
  { id: 'kampong_cham', nameEn: 'Kampong Cham', nameKh: 'កំពង់ចាម', nameVi: 'Kampong Cham', lat: 11.9924, lng: 105.4645, solarIrradiancePeakHours: 4.6 },
  { id: 'kampong_speu', nameEn: 'Kampong Speu', nameKh: 'កំពង់ស្ពឺ', nameVi: 'Kampong Speu', lat: 11.4533, lng: 104.5209, solarIrradiancePeakHours: 4.6 },
  { id: 'kampong_chhnang', nameEn: 'Kampong Chhnang', nameKh: 'កំពង់ឆ្នាំង', nameVi: 'Kampong Chhnang', lat: 12.2500, lng: 104.6667, solarIrradiancePeakHours: 4.5 },
  { id: 'kampong_thom', nameEn: 'Kampong Thom', nameKh: 'កំពង់ធំ', nameVi: 'Kampong Thom', lat: 12.7111, lng: 104.8887, solarIrradiancePeakHours: 4.6 },
  { id: 'banteay_meanchey', nameEn: 'Banteay Meanchey', nameKh: 'បន្ទាយមានជ័យ', nameVi: 'Banteay Meanchey', lat: 13.5859, lng: 102.9737, solarIrradiancePeakHours: 4.7 },
  { id: 'kampot', nameEn: 'Kampot', nameKh: 'កំពត', nameVi: 'Kampot', lat: 10.6104, lng: 104.1815, solarIrradiancePeakHours: 4.4 },
  { id: 'kep', nameEn: 'Kep', nameKh: 'កែប', nameVi: 'Kep', lat: 10.4828, lng: 104.3168, solarIrradiancePeakHours: 4.4 },
  { id: 'koh_kong', nameEn: 'Koh Kong', nameKh: 'កោះកុង', nameVi: 'Koh Kong', lat: 11.6153, lng: 102.9838, solarIrradiancePeakHours: 4.3 },
  { id: 'kratie', nameEn: 'Kratie', nameKh: 'ក្រចេះ', nameVi: 'Kratie', lat: 12.4881, lng: 106.0188, solarIrradiancePeakHours: 4.6 },
  { id: 'mondulkiri', nameEn: 'Mondulkiri', nameKh: 'មណ្ឌលគិរី', nameVi: 'Mondulkiri', lat: 12.4558, lng: 107.1881, solarIrradiancePeakHours: 4.5 },
  { id: 'odor_meanchey', nameEn: 'Odor Meanchey', nameKh: 'ឧត្តរមានជ័យ', nameVi: 'Odor Meanchey', lat: 14.1818, lng: 103.5186, solarIrradiancePeakHours: 4.7 },
  { id: 'pailin', nameEn: 'Pailin', nameKh: 'ប៉ៃលិន', nameVi: 'Pailin', lat: 12.8489, lng: 102.6093, solarIrradiancePeakHours: 4.6 },
  { id: 'preah_vihear', nameEn: 'Preah Vihear', nameKh: 'ព្រះវិហារ', nameVi: 'Preah Vihear', lat: 13.8073, lng: 104.9805, solarIrradiancePeakHours: 4.7 },
  { id: 'prey_veng', nameEn: 'Prey Veng', nameKh: 'ព្រៃវែង', nameVi: 'Prey Veng', lat: 11.4868, lng: 105.3253, solarIrradiancePeakHours: 4.5 },
  { id: 'pursat', nameEn: 'Pursat', nameKh: 'ពោធិ៍សាត់', nameVi: 'Pursat', lat: 12.5388, lng: 103.9192, solarIrradiancePeakHours: 4.5 },
  { id: 'ratanakiri', nameEn: 'Ratanakiri', nameKh: 'រតនគិរី', nameVi: 'Ratanakiri', lat: 13.7394, lng: 107.0015, solarIrradiancePeakHours: 4.5 },
  { id: 'stung_treng', nameEn: 'Stung Treng', nameKh: 'ស្ទឹងត្រែង', nameVi: 'Stung Treng', lat: 13.5259, lng: 105.9683, solarIrradiancePeakHours: 4.6 },
  { id: 'svay_rieng', nameEn: 'Svay Rieng', nameKh: 'ស្វាយរៀង', nameVi: 'Svay Rieng', lat: 11.0879, lng: 105.7994, solarIrradiancePeakHours: 4.5 },
  { id: 'takeo', nameEn: 'Takeo', nameKh: 'តាកែវ', nameVi: 'Takeo', lat: 10.9908, lng: 104.7850, solarIrradiancePeakHours: 4.5 },
  { id: 'tboung_khmum', nameEn: 'Tboung Khmum', nameKh: 'ត្បូងឃ្មុំ', nameVi: 'Tboung Khmum', lat: 11.9333, lng: 105.6500, solarIrradiancePeakHours: 4.6 }
];

/**
 * Haversine formula to compute great-circle distance between two GPS coordinates in km
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface DetectedLocationResult {
  success: boolean;
  province: string;
  provinceDetails?: ProvinceGeoInfo;
  accuracyMeters?: number;
  latitude?: number;
  longitude?: number;
  distanceToCentroidKm?: number;
  isInCambodia: boolean;
  message?: string;
}

/**
 * Determine the closest Cambodian province from latitude and longitude
 */
export function findNearestCambodianProvince(lat: number, lng: number): {
  province: ProvinceGeoInfo;
  distanceKm: number;
  isInCambodia: boolean;
} {
  let minDistance = Infinity;
  let closest = CAMBODIA_PROVINCE_COORDINATES[0];

  for (const prov of CAMBODIA_PROVINCE_COORDINATES) {
    const dist = calculateDistanceKm(lat, lng, prov.lat, prov.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = prov;
    }
  }

  // Cambodia bounding box approximate: Lat 10.0° - 14.7° N, Lng 102.2° - 107.7° E
  const inCambodiaBbox = lat >= 10.0 && lat <= 14.8 && lng >= 102.0 && lng <= 107.8;
  const isInCambodia = inCambodiaBbox && minDistance < 180;

  return {
    province: closest,
    distanceKm: Math.round(minDistance * 10) / 10,
    isInCambodia
  };
}

/**
 * Uses the browser's Geolocation API to auto-detect user's province in Cambodia
 */
export async function detectUserCambodianProvince(): Promise<DetectedLocationResult> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return {
      success: false,
      province: 'Phnom Penh',
      isInCambodia: false,
      message: 'Geolocation is not supported by this browser.'
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const nearest = findNearestCambodianProvince(latitude, longitude);

        // Try reverse geocoding via OpenStreetMap Nominatim with a short timeout
        let verifiedProvinceName = nearest.province.nameEn;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const address = data?.address || {};
            const osmState = address.state || address.province || address.city;

            if (osmState) {
              const matched = CAMBODIA_PROVINCE_COORDINATES.find(
                (p) =>
                  osmState.toLowerCase().includes(p.nameEn.toLowerCase()) ||
                  p.nameEn.toLowerCase().includes(osmState.toLowerCase())
              );
              if (matched) {
                verifiedProvinceName = matched.nameEn;
              }
            }
          }
        } catch {
          // Fallback seamlessly to mathematical centroid distance
        }

        resolve({
          success: true,
          province: verifiedProvinceName,
          provinceDetails: nearest.province,
          accuracyMeters: Math.round(accuracy),
          latitude,
          longitude,
          distanceToCentroidKm: nearest.distanceKm,
          isInCambodia: nearest.isInCambodia,
          message: nearest.isInCambodia
            ? `Detected in ${verifiedProvinceName} (~${Math.round(accuracy)}m accuracy)`
            : `Detected nearest: ${verifiedProvinceName}`
        });
      },
      (error) => {
        let msg = 'Unable to retrieve location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was declined.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        resolve({
          success: false,
          province: 'Phnom Penh',
          isInCambodia: false,
          message: msg
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 120000 // Cache for 2 minutes
      }
    );
  });
}
