export const Locations = [
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