import { type components } from 'api/generated'

export type ListingType = components['schemas']['ListingType']

export type PropertyType = components['schemas']['PropertyType']

export type PropertyOwnership = components['schemas']['PropertyOwnership']

export type FacingDirection = components['schemas']['FacingDirection']

export const LISTING_TYPE_ENUM: { [key in ListingType]: string } = {
  sale: 'Dijual',
  rent: 'Disewakan',
  unknown: 'Lainnya',
}

export const PROPERTY_TYPE_ENUM: { [key in PropertyType]: string } = {
  house: 'Rumah',
  apartment: 'Apartemen',
  warehouse: 'Gudang',
  shophouse: 'Ruko',
  land: 'Tanah',
  villa: 'Villa',
  unknown: 'Lainnya',
}

export const PROPERTY_OWNERSHIP_ENUM: { [key in PropertyOwnership]: string } = {
  shm: 'SHM',
  hgb: 'HGB',
  girik: 'Girik',
  strata: 'Strata',
  unknown: 'Lainnya',
}

export const FACING_DIRECTION_ENUM: { [key in FacingDirection]: string } = {
  east: 'Timur',
  north: 'Utara',
  northeast: 'Timur Laut',
  northwest: 'Barat Laut',
  south: 'Selatan',
  southeast: 'Tenggara',
  southwest: 'Barat Daya',
  west: 'Barat',
  unknown: 'Tidak Diketahui',
}

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
        maxValue: '',
        maxStringValue: '',
      },
    ],
  },
  propertyType: {
    options: Object.keys(PROPERTY_TYPE_ENUM).map((value) => ({
      label: PROPERTY_TYPE_ENUM[value as PropertyType],
      value,
    })),
  },
  bedroomCount: {
    options: [
      {
        label: '1+',
        value: '1+',
      },
      {
        label: '2+',
        value: '2+',
      },
      {
        label: '3+',
        value: '3+',
      },
      {
        label: '4+',
        value: '4+',
      },
      {
        label: '5+',
        value: '5+',
      },
    ],
  },
  bathroomCount: {
    options: [
      {
        label: '1+',
        value: '1+',
      },
      {
        label: '2+',
        value: '2+',
      },
      {
        label: '3+',
        value: '3+',
      },
      {
        label: '4+',
        value: '4+',
      },
      {
        label: '5+',
        value: '5+',
      },
    ],
  },
  certificate: {
    options: Object.keys(PROPERTY_OWNERSHIP_ENUM).map((value) => ({
      label: PROPERTY_OWNERSHIP_ENUM[value as PropertyOwnership],
      value,
    })),
  },
  carCount: {
    options: [
      {
        label: '1+',
        value: '1+',
      },
      {
        label: '2+',
        value: '2+',
      },
      {
        label: '3+',
        value: '3+',
      },
      {
        label: '4+',
        value: '4+',
      },
      {
        label: '5+',
        value: '5+',
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
  city: {
    options: [
      {
        label: 'Bandar Lampung',
        value: 'Bandar Lampung',
      },
      {
        label: 'Bandung',
        value: 'Bandung',
      },
      {
        label: 'Banjarmasin',
        value: 'Banjarmasin',
      },
      {
        label: 'Batam',
        value: 'Batam',
      },
      {
        label: 'Bekasi',
        value: 'Bekasi',
      },
      {
        label: 'Denpasar',
        value: 'Denpasar',
      },
      {
        label: 'Depok',
        value: 'Depok',
      },
      {
        label: 'Jakarta Barat',
        value: 'Jakarta Barat',
      },
      {
        label: 'Jakarta Pusat',
        value: 'Jakarta Pusat',
      },
      {
        label: 'Jakarta Selatan',
        value: 'Jakarta Selatan',
      },
      {
        label: 'Jakarta Timur',
        value: 'Jakarta Timur',
      },
      {
        label: 'Jakarta Utara',
        value: 'Jakarta Utara',
      },
      {
        label: 'Makasar',
        value: 'Makasar',
      },
      {
        label: 'Malang',
        value: 'Malang',
      },
      {
        label: 'Manado',
        value: 'Manado',
      },
      {
        label: 'Medan',
        value: 'Medan',
      },
      {
        label: 'Padang',
        value: 'Padang',
      },
      {
        label: 'Palembang',
        value: 'Palembang',
      },
      {
        label: 'Pekanbaru',
        value: 'Pekanbaru',
      },
      {
        label: 'Pontianak',
        value: 'Pontianak',
      },
      {
        label: 'Samarinda',
        value: 'Samarinda',
      },
      {
        label: 'Semarang',
        value: 'Semarang',
      },
      {
        label: 'Serang',
        value: 'Serang',
      },
      {
        label: 'Surabaya',
        value: 'Surabaya',
      },
      {
        label: 'Surakarta',
        value: 'Surakarta',
      },
      {
        label: 'Tangerang',
        value: 'Tangerang',
      },
      {
        label: 'Tasikmalaya',
        value: 'Tasikmalaya',
      },
      {
        label: 'Yogyakarta',
        value: 'Yogyakarta',
      },
    ],
  },
}
