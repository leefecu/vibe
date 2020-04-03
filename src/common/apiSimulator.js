import { Locations } from '../__fixtures__/data'

export function fetchPlaylists() {
  
  if (getRandomTrue80()) {
    return JSON.stringify([
        {
          id: 1,
          name: 'Studio Screens In the Office'
        },
        {
          id: 2,
          name: 'Screensaver'
        }
      ]);
  }
  return '{"error": "Test sample DB error"}'
}

function getRandomTrue50() {
  return Math.floor((Math.random() * 10) + 1) % 2 === 0;
}
function getRandomTrue80() {
  return Math.floor((Math.random() * 10) + 1) <= 8;
}

export const fetchLocations = () => JSON.stringify({
  "UseLatLng": true,
  "Lat": -36.745393,
  "Lng": 174.697275,
  "Locations": Locations
});