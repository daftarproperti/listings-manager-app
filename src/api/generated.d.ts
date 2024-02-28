/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/tele-app/listings": {
    /**
     * Get listing items
     * @description Returns listing items
     */
    get: operations["listings.index"];
    /** Create listing */
    post: operations["listings.create"];
  };
  "/api/tele-app/listings/{id}": {
    /** Get listing by id */
    get: operations["listings.show"];
    /** Update listing */
    post: operations["listings.update"];
    /** Delete listing */
    delete: operations["listings.delete"];
  };
  "/api/tele-app/properties": {
    /**
     * Get list of property
     * @description Returns list of property
     */
    get: operations["index"];
    /** Create property */
    post: operations["create"];
  };
  "/api/tele-app/properties/{id}": {
    /** Get property by id */
    get: operations["show"];
    /** Update property */
    post: operations["update"];
    /** Delete property */
    delete: operations["delete"];
  };
  "/api/tele-app/users/profile": {
    /**
     * Get profile
     * @description Returns user profile
     */
    get: operations["profile"];
    /** Update profile */
    post: operations["updateProfile"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ListingRequest: {
      /** @example Rumah dijual di daerah pasteur */
      title?: string;
      /** @example Jl. Pendidikan No. 1 */
      address?: string;
      /** @example Rumah bagus */
      description?: string;
      /** @example 100000 */
      price?: number;
      /** @example 1000 */
      lotSize?: number;
      /** @example 2000 */
      buildingSize?: number;
      /** @example 4 */
      carCount?: number;
      /** @example 3 */
      bedroomCount?: number;
      /** @example 2 */
      bathroomCount?: number;
      /** @example 2 */
      floorCount?: number;
      /** @example 2200 */
      electricPower?: number;
      /** @example Utara */
      facing?: string;
      /** @example SHM */
      ownership?: string;
      /** @example Bandung */
      city?: string;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      contacts?: {
        name?: string;
        profilePictureURL?: string;
        phoneNumber?: string;
        sourceURL?: string;
        provider?: string;
      };
      /** @example false */
      isPrivate?: boolean;
    };
    PropertyRequest: {
      /** @example Rumah dijual di daerah pasteur */
      title?: string;
      /** @example Jl. Pendidikan No. 1 */
      address?: string;
      /** @example Rumah bagus */
      description?: string;
      /** @example 100000 */
      price?: number;
      /** @example 1000 */
      lotSize?: number;
      /** @example 2000 */
      buildingSize?: number;
      /** @example 4 */
      carCount?: number;
      /** @example 3 */
      bedroomCount?: number;
      /** @example 2 */
      bathroomCount?: number;
      /** @example 2 */
      floorCount?: number;
      /** @example 2200 */
      electricPower?: number;
      /** @example Utara */
      facing?: string;
      /** @example SHM */
      ownership?: string;
      /** @example Bandung */
      city?: string;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      contacts?: {
        name?: string;
        profilePictureURL?: string;
        phoneNumber?: string;
        sourceURL?: string;
        provider?: string;
      };
      /** @example false */
      isPrivate?: boolean;
    };
    TelegramUserProfileRequest: {
      /** @example Jono Doe */
      name?: string;
      /** @example 081111111111 */
      phoneNumber?: string;
      /** @example Surabaya */
      city?: string;
      /** @example Agen terpercaya */
      description?: string;
      /** @example Agen XXX */
      company?: string;
      /**
       * Format: binary
       * @example \x00\x00\x00\x04\x00\x00\x00\x04
       */
      picture?: string;
      /** @example true */
      isPublicProfile?: boolean;
    };
    Listing: {
      id?: string;
      title?: string;
      address?: string;
      description?: string;
      price?: number;
      lotSize?: number;
      buildingSize?: number;
      carCount?: number;
      bedroomCount?: number;
      bathroomCount?: number;
      floorCount?: number;
      electricPower?: number;
      facing?: string;
      ownership?: string;
      city?: string;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      contacts?: {
        name?: string;
        profilePictureURL?: string;
        phoneNumber?: string;
        sourceURL?: string;
        provider?: string;
      };
      user?: {
        name?: string;
        profilePictureURL?: string;
        phoneNumber?: string;
      };
      userCanEdit?: boolean;
      isPrivate?: boolean;
    };
    Property: {
      id?: string;
      title?: string;
      address?: string;
      description?: string;
      price?: number;
      lotSize?: number;
      buildingSize?: number;
      carCount?: number;
      bedroomCount?: number;
      bathroomCount?: number;
      floorCount?: number;
      electricPower?: number;
      facing?: string;
      ownership?: string;
      city?: string;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      contacts?: {
        name?: string;
        profilePictureURL?: string;
        phoneNumber?: string;
        sourceURL?: string;
        provider?: string;
      };
      user?: {
        name?: string;
        profilePictureURL?: string;
        phoneNumber?: string;
      };
      userCanEdit?: boolean;
      isPrivate?: boolean;
    };
    TelegramUserProfile: {
      /** @example 123 */
      id?: number;
      /** @example John Doe */
      name?: string;
      /** @example 0811111 */
      phoneNumber?: string;
      /** @example New York */
      city?: string;
      /** @example I am a programmer */
      description?: string;
      /** @example https://example.com/image.jpg */
      pricture?: string;
      /** @example Google */
      company?: string;
      /** @example true */
      isPublicProfile?: boolean;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * Get listing items
   * @description Returns listing items
   */
  "listings.index": {
    parameters: {
      query?: {
        /** @description If set to true, it will only return user's collection */
        collection?: boolean;
        /** @description Minimum price */
        "price[min]"?: number;
        /** @description Maximum price */
        "price[max]"?: number;
        /** @description Property type */
        type?: "house" | "apartment" | "land";
        /** @description Bedroom count */
        bedroomCount?: number;
        /** @description Bathroom count */
        bathroomCount?: number;
        /** @description Minimum lot size */
        "lotSize[min]"?: number;
        /** @description Maximum lot size */
        "lotSize[max]"?: number;
        /** @description Minimum building size */
        "buildingSize[min]"?: number;
        /** @description Maximum building size */
        "buildingSize[max]"?: number;
        /** @description Ownership */
        ownership?: "shm" | "hgb" | "girik" | "lainnya";
        /** @description Car count */
        carCount?: number;
        /** @description Electric Power */
        electricPower?: number;
        /** @description Sort By */
        sort?: "price" | "bedroomCount" | "lotSize";
        /** @description Order By */
        order?: "asc" | "desc";
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            listings?: components["schemas"]["Listing"][];
          };
        };
      };
    };
  };
  /** Create listing */
  "listings.create": {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["PropertyRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["Listing"];
        };
      };
    };
  };
  /** Get listing by id */
  "listings.show": {
    parameters: {
      path: {
        /** @description Listing Id */
        id: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["Listing"];
        };
      };
      /** @description Listing not found */
      404: {
        content: {
          "application/json": {
            /** @example Listing not found */
            error?: string;
          };
        };
      };
    };
  };
  /** Update listing */
  "listings.update": {
    parameters: {
      path: {
        /** @description Listing Id */
        id: string;
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["PropertyRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["Listing"];
        };
      };
      /** @description Listing not found */
      404: {
        content: {
          "application/json": {
            /** @example Listing not found */
            error?: string;
          };
        };
      };
    };
  };
  /** Delete listing */
  "listings.delete": {
    parameters: {
      path: {
        /** @description Listing Id */
        id: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @example Listing deleted successfully */
            message?: string;
          };
        };
      };
    };
  };
  /**
   * Get list of property
   * @description Returns list of property
   */
  index: {
    parameters: {
      query?: {
        /** @description If set to true, it will only return user's collection */
        collection?: boolean;
        /** @description Minimum price */
        "price[min]"?: number;
        /** @description Maximum price */
        "price[max]"?: number;
        /** @description Property type */
        type?: "house" | "apartment" | "land";
        /** @description Bedroom count */
        bedroomCount?: number;
        /** @description Bathroom count */
        bathroomCount?: number;
        /** @description Minimum lot size */
        "lotSize[min]"?: number;
        /** @description Maximum lot size */
        "lotSize[max]"?: number;
        /** @description Minimum building size */
        "buildingSize[min]"?: number;
        /** @description Maximum building size */
        "buildingSize[max]"?: number;
        /** @description Ownership */
        ownership?: "shm" | "hgb" | "girik" | "lainnya";
        /** @description Car count */
        carCount?: number;
        /** @description Electric Power */
        electricPower?: number;
        /** @description Sort By */
        sort?: "price" | "bedroomCount" | "lotSize";
        /** @description Order By */
        order?: "asc" | "desc";
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            properties?: components["schemas"]["Property"][];
          };
        };
      };
    };
  };
  /** Create property */
  create: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["PropertyRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["Property"];
        };
      };
    };
  };
  /** Get property by id */
  show: {
    parameters: {
      path: {
        /** @description Property Id */
        id: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["Property"];
        };
      };
      /** @description Property not found */
      404: {
        content: {
          "application/json": {
            /** @example Property not found */
            error?: string;
          };
        };
      };
    };
  };
  /** Update property */
  update: {
    parameters: {
      path: {
        /** @description Property Id */
        id: string;
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["PropertyRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["Property"];
        };
      };
      /** @description Property not found */
      404: {
        content: {
          "application/json": {
            /** @example Property not found */
            error?: string;
          };
        };
      };
    };
  };
  /** Delete property */
  delete: {
    parameters: {
      path: {
        /** @description Property Id */
        id: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @example Property deleted successfully */
            message?: string;
          };
        };
      };
    };
  };
  /**
   * Get profile
   * @description Returns user profile
   */
  profile: {
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["TelegramUserProfile"];
        };
      };
    };
  };
  /** Update profile */
  updateProfile: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["TelegramUserProfileRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["TelegramUserProfile"];
        };
      };
    };
  };
}
