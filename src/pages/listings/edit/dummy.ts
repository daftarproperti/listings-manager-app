import type {
  PropertyType,
  ListingType,
  VerifyStatus,
  ActiveStatus,
  ClosingType,
  ClosingStatus,
  CancellationStatus,
} from 'api/types'

const PROPERTY_TYPE_ENUM: { [key in PropertyType]: string } = {
  house: 'Rumah',
  apartment: 'Apartemen',
  warehouse: 'Gudang',
  shophouse: 'Ruko',
  land: 'Tanah',
  villa: 'Villa',
  unknown: 'Lainnya',
}
const LISTING_TYPE_ENUM: { [key in ListingType]: string } = {
  sale: 'Dijual',
  rent: 'Disewakan',
  unknown: 'Lainnya',
}
export const VERIFY_STATUS_ENUM: { [key in VerifyStatus]: string } = {
  on_review: 'Sedang ditinjau',
  approved: 'Disetujui',
  rejected: 'Ditolak',
  post_approval_change: 'Tinjauan Perubahan',
}
export const ACTIVE_STATUS_ENUM: { [key in ActiveStatus]: string } = {
  waitlisted: 'Dalam Antrian',
  active: 'Aktif',
  archived: 'Diarsipkan',
}
export const CLOSING_TYPE_ENUM: { [key in ClosingType]: string } = {
  sold: 'Jual',
  rented: 'Sewa',
}
export const CLOSING_STATUS_ENUM: { [key in ClosingStatus]: string } = {
  on_review: 'Sedang ditinjau',
  approved: 'Disetujui',
  rejected: 'Ditolak',
}
export const CANCELLATION_STATUS_ENUM: { [key in CancellationStatus]: string } =
  {
    on_review: 'Sedang ditinjau',
    approved: 'Disetujui',
    rejected: 'Ditolak',
  }

export const LISTING_OPTIONS = {
  cities: {
    options: [
      /*
      TODO: Support more cities
      {
        label: 'Jakarta Barat, DKI Jakarta',
        value: 'Jakarta Barat',
      },
      {
        label: 'Jakarta Pusat, DKI Jakarta',
        value: 'Jakarta Pusat',
      },
      {
        label: 'Jakarta Selatan, DKI Jakarta',
        value: 'Jakarta Selatan',
      },
      {
        label: 'Jakarta Timur, DKI Jakarta',
        value: 'Jakarta Timur',
      },
      {
        label: 'Jakarta Utara, DKI Jakarta',
        value: 'Jakarta Utara',
      },
     */
      {
        label: 'Surabaya, Jawa Timur',
        value: 'Surabaya',
      },
    ],
  },
  facing: {
    options: [
      {
        label: 'Tidak Diketahui',
        value: 'unknown',
      },
      {
        label: 'Utara',
        value: 'north',
      },
      {
        label: 'Timur',
        value: 'east',
      },
      {
        label: 'Selatan',
        value: 'south',
      },
      {
        label: 'Barat',
        value: 'west',
      },
      {
        label: 'Timur Laut',
        value: 'northeast',
      },
      {
        label: 'Tenggara',
        value: 'southeast',
      },
      {
        label: 'Barat Daya',
        value: 'southwest',
      },
      {
        label: 'Barat Laut',
        value: 'northwest',
      },
    ],
  },
  electric_power: {
    options: [
      {
        label: '250 V',
        value: '250',
      },
      {
        label: '450 V',
        value: '450',
      },
      {
        label: '900 V',
        value: '900',
      },
      {
        label: '1300 V',
        value: '1300',
      },
      {
        label: '2200 V',
        value: '2200',
      },
      {
        label: '3500 V',
        value: '3500',
      },
    ],
  },
  ownership: {
    options: [
      {
        label: 'SHM',
        value: 'shm',
      },
      {
        label: 'HGB',
        value: 'hgb',
      },
      {
        label: 'Strata',
        value: 'strata',
      },
      {
        label: 'Girik',
        value: 'girik',
      },
      {
        label: 'Lainnya',
        value: 'unknown',
      },
    ],
  },
  listingType: {
    options: Object.keys(LISTING_TYPE_ENUM).map((value) => ({
      label: LISTING_TYPE_ENUM[value as ListingType],
      value,
    })),
  },
  propertyType: {
    options: Object.keys(PROPERTY_TYPE_ENUM).map((value) => ({
      label: PROPERTY_TYPE_ENUM[value as PropertyType],
      value,
    })),
  },
  closingType: {
    options: Object.keys(CLOSING_TYPE_ENUM).map((value) => ({
      label: CLOSING_TYPE_ENUM[value as ClosingType],
      value,
    })),
  },
}
