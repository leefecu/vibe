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

export const getLocations = () => {
  return [
    {
      id: 1,
      parentId: 0,
      name: 'Screensave',
      selected: false,
      children: [],
    },
    {
      id: 2,
      parentId: 0,
      name: 'Webview',
      selected: false,
      children: [],
    },
    {
      id: 3,
      parentId: 0,
      name: 'Internal Screen (Laby Office)',
      selected: false,
      children: [
        {
          id: 30,
          parentId: 3,
          name: 'Lunchroom (Weekly Lunchroom Schedule',
          selected: false,
        },
        {
          id: 31,
          parentId: 3,
          name: 'Meeting Room',
          selected: true,
        },
        {
          id: 33,
          parentId: 3,
          name: 'Touchscreen (Landscape)',
          selected: true,
        },
        {
          id: 34,
          parentId: 3,
          name: 'Touchscreen (Portrait)',
          selected: true,
        },
        {
          id: 35,
          parentId: 3,
          name: 'WebOS2 (On Stand)',
          selected: true,
        },
      ],
    },
  ];
}