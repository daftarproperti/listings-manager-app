export const FILTER_OPTIONS = {
  priceRange: {
    options: [
      {
        label: '< 200jt',
        minValue: 0,
        minStringValue: 'Rp 0',
        maxValue: 200000000,
        maxStringValue: 'Rp 200.000.000',
      },
      {
        label: '< 400jt',
        minValue: 0,
        minStringValue: 'Rp 0',
        maxValue: 400000000,
        maxStringValue: 'Rp 400.000.000',
      },
      {
        label: '< 600jt',
        minValue: 0,
        minStringValue: 'Rp 0',
        maxValue: 600000000,
        maxStringValue: 'Rp 600.000.000',
      },
      {
        label: '< 800jt',
        minValue: 0,
        minStringValue: 'Rp 0',
        maxValue: 800000000,
        maxStringValue: 'Rp 800.000.000',
      },
      {
        label: '> 1M',
        minValue: 1000000000,
        minStringValue: 'Rp 1.000.000.000',
        maxValue: 2000000000,
        maxStringValue: 'Rp 2.000.000.000',
      },
    ],
  },
  propertyType: {
    options: [
      {
        label: 'Rumah',
        value: 'house',
      },
      {
        label: 'Apartement',
        value: 'apartment',
      },
      {
        label: 'Tanah',
        value: 'land',
      },
      // {
      //   label: 'Ruko',
      //   value: 'shophouse',
      // },
    ],
  },
  bedroomCount: {
    options: [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
      {
        label: '> 5',
        value: '> 5',
      },
    ],
  },
  bathroomCount: {
    options: [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
      {
        label: '> 5',
        value: '> 5',
      },
    ],
  },
  certificate: {
    options: [
      {
        label: 'SHM',
        value: 'shm',
      },
      {
        label: 'HGB',
        value: 'hgb',
      },
      // {
      //   label: 'Strata',
      //   value: 'strata',
      // },
      {
        label: 'Girik',
        value: 'girik',
      },
      {
        label: 'Lainnya',
        value: 'lainnya',
      },
    ],
  },
  garageCarCapacity: {
    options: [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
      {
        label: '> 5',
        value: '> 5',
      },
    ],
  },
  electricity: {
    options: [
      {
        label: '250 V',
        value: '250v',
      },
      {
        label: '450 V',
        value: '450v',
      },
      {
        label: '900 V',
        value: '900v',
      },
      {
        label: '1300 V',
        value: '1300v',
      },
      {
        label: '2200 V',
        value: '2200v',
      },
      {
        label: '3500 V',
        value: '3500v',
      },
    ],
  },
}
