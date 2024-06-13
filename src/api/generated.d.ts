/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/auth/send-otp": {
    /** Send OTP */
    post: operations["auth.send_otp"];
  };
  "/api/auth/verify-otp": {
    /** Verify OTP */
    post: operations["auth.verify_otp"];
  };
  "/api/auth/logout": {
    /** Logout */
    post: operations["auth.logout"];
  };
  "/api/auth/impersonate": {
    /** Impersonate */
    post: operations["auth.impersonate"];
  };
  "/api/tele-app/cities": {
    /**
     * Get cities
     * @description Returns city items
     */
    get: operations["cities.index"];
  };
  "/api/tele-app/cities/{id}": {
    /** Get city by id */
    get: operations["cities.getCityById"];
  };
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
  "/api/photo/{fileId}/{fileName}": {
    /** Show image */
    get: operations["image.show"];
  };
  "/api/tele-app/upload/image": {
    /** Upload Image */
    post: operations["image.upload"];
  };
  "/api/tele-app/properties": {
    /**
     * Get list of property
     * @description Returns list of property
     */
    get: operations["index"];
  };
  "/api/tele-app/properties/{id}": {
    /** Get property by id */
    get: operations["show"];
  };
  "/api/tele-app/saved-searches": {
    /**
     * Get saved search items
     * @description Returns saved search items
     */
    get: operations["saved_searches.index"];
    /** Create saved search */
    post: operations["saved_searches.create"];
  };
  "/api/tele-app/saved-searches/{id}": {
    /** Get saved search by id */
    get: operations["saved_searches.show"];
    /** Update saved searches */
    post: operations["saved_searches.update"];
    /** Delete saved searches */
    delete: operations["saved_searches.delete"];
  };
  "/api/tele-app/telegram-users/profile": {
    /**
     * Get profile
     * @description Returns user profile
     */
    get: operations["telegramProfile"];
    /** Update profile */
    post: operations["updateTelegramProfile"];
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
    ImageUploadRequest: {
      /** Format: binary */
      image?: string;
    };
    ListingRequest: {
      /** @example Rumah dijual di daerah pasteur */
      title?: string;
      /** @example Jl. Pendidikan No. 1 */
      address?: string;
      /** @example Rumah bagus */
      description?: string;
      /** @example 100000 */
      price?: number;
      /** @example 40000 */
      rentPrice?: number;
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
      /** @example 1 */
      cityId?: number;
      listingType?: components["schemas"]["ListingType"];
      propertyType?: components["schemas"]["PropertyType"];
      /** @example false */
      listingForRent?: boolean;
      /** @example false */
      listingForSale?: boolean;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      /** @example false */
      isPrivate?: boolean;
    };
    SavedSearchRequest: {
      /** @example Pak Eko */
      title?: string;
      filterSet?: components["schemas"]["FilterSet"];
    };
    TelegramUserProfileRequest: {
      /** @example Jono Doe */
      name?: string;
      /** @example 081111111111 */
      phoneNumber?: string;
      /** @example Surabaya */
      city?: string;
      /** @example 123 */
      cityId?: number;
      /** @example Surabaya */
      cityName?: string;
      /** @example Agen terpercaya */
      description?: string;
      /** @example Agen XXX */
      company?: string;
      /**
       * Format: binary
       * @example {
       *   "0": 0,
       *   "1": 0,
       *   "2": 0,
       *   "3": 4,
       *   "4": 0,
       *   "5": 0,
       *   "6": 0,
       *   "7": 4
       * }
       */
      picture?: string;
      /** @example true */
      isPublicProfile?: boolean;
    };
    /**
     * @description Account type
     * @example professional
     * @enum {string}
     */
    AccountType: "individual" | "professional";
    /**
     * @description Verification status
     * @example approved
     * @enum {string}
     */
    VerifyStatus: "on_review" | "approved" | "rejected";
    /**
     * @description Facing Direction
     * @example east
     * @enum {string}
     */
    FacingDirection: "unknown" | "north" | "east" | "south" | "west" | "northeast" | "southeast" | "southwest" | "northwest";
    /** @description Filter Min Max */
    FilterMinMax: {
      /** @description Minimum value */
      min?: number | null;
      /** @description Maximum value */
      max?: number | null;
    };
    /** @description Filter Set */
    FilterSet: {
      /** @description User ID */
      userId?: number | null;
      /** @description Query */
      q?: string | null;
      /** @description Collection */
      collection?: boolean | null;
      price?: components["schemas"]["FilterMinMax"];
      rentPrice?: components["schemas"]["FilterMinMax"];
      propertyType?: components["schemas"]["PropertyType"];
      listingType?: components["schemas"]["ListingType"];
      listingForSale?: boolean | null;
      listingForRent?: boolean | null;
      bedroomCount?: components["schemas"]["FilterMinMax"];
      bathroomCount?: components["schemas"]["FilterMinMax"];
      lotSize?: components["schemas"]["FilterMinMax"];
      buildingSize?: components["schemas"]["FilterMinMax"];
      facing?: components["schemas"]["FacingDirection"];
      ownership?: components["schemas"]["PropertyOwnership"];
      carCount?: components["schemas"]["FilterMinMax"];
      /** @description Floor Count */
      floorCount?: number | null;
      /** @description Electric Power */
      electricPower?: number | null;
      /** @description Sort */
      sort?: string | null;
      /** @description Order */
      order?: string | null;
      /** @description City */
      city?: string | null;
      /** @description City (OSM) ID */
      cityId?: number | null;
    };
    /**
     * @description Sort Listing By
     * @example price
     * @enum {string}
     */
    ListingSort: "price" | "bedroomCount" | "bathroomCount" | "lotSize" | "buildingSize";
    /**
     * @description Listing type
     * @example house
     * @enum {string}
     */
    ListingType: "unknown" | "sale" | "rent";
    /**
     * @description Property ownership/certificate
     * @example shm
     * @enum {string}
     */
    PropertyOwnership: "unknown" | "shm" | "hgb" | "strata" | "girik";
    /**
     * @description Property type
     * @example house
     * @enum {string}
     */
    PropertyType: "unknown" | "house" | "apartment" | "warehouse" | "shophouse" | "land" | "villa";
    City: {
      id?: number;
      name?: string;
      latitude?: number;
      longitude?: number;
    };
    Listing: {
      id?: string;
      sourceText?: string;
      title?: string;
      propertyType?: components["schemas"]["PropertyType"];
      listingType?: components["schemas"]["ListingType"];
      listingForSale?: boolean;
      listingForRent?: boolean;
      address?: string;
      description?: string;
      price?: number;
      rentPrice?: number;
      lotSize?: number;
      buildingSize?: number;
      carCount?: number;
      bedroomCount?: number;
      bathroomCount?: number;
      floorCount?: number;
      electricPower?: number;
      viewCount?: number;
      matchFilterCount?: number;
      facing?: components["schemas"]["FacingDirection"];
      ownership?: components["schemas"]["PropertyOwnership"];
      verifyStatus?: components["schemas"]["VerifyStatus"];
      cityName?: string;
      cityId?: number;
      city?: string;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      contact?: {
        name?: string;
        company?: string;
      };
      user?: {
        name?: string;
        profilePictureURL?: string;
        city?: string;
        cityId?: number;
        cityName?: string;
        company?: string;
        description?: string;
      };
      userCanEdit?: boolean;
      isPrivate?: boolean;
      /** Format: date-time */
      updatedAt?: string;
    };
    Property: {
      id?: string;
      sourceText?: string;
      title?: string;
      propertyType?: components["schemas"]["PropertyType"];
      listingType?: components["schemas"]["ListingType"];
      listingForSale?: boolean;
      listingForRent?: boolean;
      address?: string;
      description?: string;
      price?: number;
      rentPrice?: number;
      lotSize?: number;
      buildingSize?: number;
      carCount?: number;
      bedroomCount?: number;
      bathroomCount?: number;
      floorCount?: number;
      electricPower?: number;
      facing?: components["schemas"]["FacingDirection"];
      ownership?: components["schemas"]["PropertyOwnership"];
      verifyStatus?: components["schemas"]["VerifyStatus"];
      cityId?: number;
      cityName?: string;
      city?: string;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      /** Format: date-time */
      updatedAt?: string;
      listings?: components["schemas"]["Listing"][];
    };
    /** @description Representation of a Listing which is available publicly. */
    PublicListing: {
      listingId?: number;
      title?: string;
      propertyType?: components["schemas"]["PropertyType"];
      listingForSale?: boolean;
      listingForRent?: boolean;
      address?: string;
      description?: string;
      price?: number;
      rentPrice?: number;
      lotSize?: number;
      buildingSize?: number;
      carCount?: number;
      bedroomCount?: number;
      bathroomCount?: number;
      floorCount?: number;
      electricPower?: number;
      facing?: components["schemas"]["FacingDirection"];
      ownership?: components["schemas"]["PropertyOwnership"];
      isVerified?: boolean;
      cityName?: string;
      cityId?: number;
      pictureUrls?: string[];
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      /** Format: date-time */
      updatedAt?: string;
    };
    SavedSearch: {
      id?: string;
      userId?: number;
      title?: string;
      filterSet?: components["schemas"]["FilterSet"];
    };
    TelegramAllowlistGroup: {
      id?: string;
      chatId?: number;
      groupName?: string;
      sampleMessage?: string;
      allowed?: boolean;
      createdAt?: string;
    };
    TelegramUserProfile: {
      /** @example 123 */
      id?: number;
      /** @example id-123 */
      publicId?: string;
      /** @example John Doe */
      name?: string;
      /** @example 0811111 */
      phoneNumber?: string;
      /** @example New York */
      city?: string;
      /** @example 123 */
      cityId?: number;
      /** @example New York */
      cityName?: string;
      /** @example I am a programmer */
      description?: string;
      /** @example https://example.com/image.jpg */
      picture?: string;
      /** @example Google */
      company?: string;
      /** @example true */
      isPublicProfile?: boolean;
    };
    User: {
      id?: string;
      publicId?: string;
      username?: string;
      phoneNumber?: string;
      accountType?: components["schemas"]["AccountType"];
      email?: string;
      name?: string;
      city?: string;
      cityId?: number;
      cityName?: string;
      description?: string;
      picture?: string;
      company?: string;
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

  /** Send OTP */
  "auth.send_otp": {
    parameters: {
      path: {
        /** @description Phone Number */
        phoneNumber: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @description JWT Token used for authentication */
            token?: string;
            /**
             * Format: int64
             * @description Timestamp of when the OTP was created
             */
            timestamp?: number;
          };
        };
      };
    };
  };
  /** Verify OTP */
  "auth.verify_otp": {
    requestBody: {
      content: {
        "application/json": {
          /** @description User phone number */
          phoneNumber: string;
          /** @description Token to verify */
          token: string;
          /**
           * Format: int64
           * @description Timestamp of when the OTP was created
           */
          timestamp: number;
          /** @description User's OTP Code */
          otpCode: string;
        };
      };
    };
    responses: {
      /** @description Success response */
      200: {
        content: {
          "application/json": {
            /**
             * @description Verify status
             * @example true
             */
            success?: boolean;
            /**
             * @description Access token
             * @example Akoasdk131o3ipIaskdlz
             */
            accessToken?: string;
            user?: components["schemas"]["User"];
          };
        };
      };
    };
  };
  /** Logout */
  "auth.logout": {
    responses: {
      /** @description Success response */
      200: {
        content: {
          "application/json": {
            /**
             * @description Logout status
             * @example true
             */
            success?: boolean;
          };
        };
      };
      /** @description Token not found response */
      404: {
        content: {
          "application/json": {
            /**
             * @description Logout status
             * @example false
             */
            success?: boolean;
          };
        };
      };
    };
  };
  /** Impersonate */
  "auth.impersonate": {
    parameters: {
      path: {
        /** @description Phone Number */
        phoneNumber: string;
      };
    };
    responses: {
      /** @description Success response */
      200: {
        content: {
          "application/json": {
            /**
             * @description Verify status
             * @example true
             */
            success?: boolean;
            /**
             * @description Access token
             * @example Akoasdk131o3ipIaskdlz
             */
            accessToken?: string;
            user?: components["schemas"]["User"];
          };
        };
      };
    };
  };
  /**
   * Get cities
   * @description Returns city items
   */
  "cities.index": {
    parameters: {
      query?: {
        /** @description Search city by keyword */
        q?: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            cities?: components["schemas"]["City"][];
          };
        };
      };
    };
  };
  /** Get city by id */
  "cities.getCityById": {
    parameters: {
      path: {
        /** @description City Id */
        id: number;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["City"];
        };
      };
      /** @description City not found */
      404: {
        content: {
          "application/json": {
            /** @example City not found */
            error?: string;
          };
        };
      };
    };
  };
  /**
   * Get listing items
   * @description Returns listing items
   */
  "listings.index": {
    parameters: {
      query?: {
        /** @description Search listing by keyword */
        q?: string;
        /** @description If set to true, it will only return user's collection */
        collection?: boolean;
        /** @description Minimum price */
        "price[min]"?: number;
        /** @description Maximum price */
        "price[max]"?: number;
        /** @description Minimum rent price */
        "rentPrice[min]"?: number;
        /** @description Maximum rent price */
        "rentPrice[max]"?: number;
        /** @description Property type */
        propertyType?: components["schemas"]["PropertyType"];
        /** @description Listing for sale */
        listingForSale?: boolean;
        /** @description Listing for rent */
        listingForRent?: boolean;
        /** @description Bedroom count */
        bedroomCount?: number;
        /** @description Minimum Bedroom count */
        "bedroomCount[min]"?: number;
        /** @description Maximum Bedroom count */
        "bedroomCount[max]"?: number;
        /** @description Bathroom count */
        bathroomCount?: number;
        /** @description Minimum Bathroom count */
        "bathroomCount[min]"?: number;
        /** @description Maximum Bathroom count */
        "bathroomCount[max]"?: number;
        /** @description Minimum lot size */
        "lotSize[min]"?: number;
        /** @description Maximum lot size */
        "lotSize[max]"?: number;
        /** @description Minimum building size */
        "buildingSize[min]"?: number;
        /** @description Maximum building size */
        "buildingSize[max]"?: number;
        /** @description Ownership */
        ownership?: components["schemas"]["PropertyOwnership"];
        /** @description Car count */
        carCount?: number;
        /** @description Minimum Car count */
        "carCount[min]"?: number;
        /** @description Maximum Car count */
        "carCount[max]"?: number;
        /** @description Electric Power */
        electricPower?: number;
        /** @description City Id */
        cityId?: number;
        /** @description Sort By */
        sort?: components["schemas"]["ListingSort"];
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
        "multipart/form-data": components["schemas"]["ListingRequest"];
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
        "multipart/form-data": components["schemas"]["ListingRequest"];
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
  /** Show image */
  "image.show": {
    parameters: {
      path: {
        /** @description File Id */
        fileId: number;
        /** @description Filename */
        fileName: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "image/*": string;
        };
      };
    };
  };
  /** Upload Image */
  "image.upload": {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["ImageUploadRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @example 123 */
            fileId?: number;
            /** @example image.jpg */
            fileName?: string;
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
        /** @description Search property by keyword */
        q?: string;
        /** @description Minimum price */
        "price[min]"?: number;
        /** @description Maximum price */
        "price[max]"?: number;
        /** @description Minimum rent price */
        "rentPrice[min]"?: number;
        /** @description Maximum rent price */
        "rentPrice[max]"?: number;
        /** @description Property type */
        propertyType?: components["schemas"]["PropertyType"];
        /** @description Listing for sale */
        listingForSale?: boolean;
        /** @description Listing for rent */
        listingForRent?: boolean;
        /** @description Bedroom count */
        bedroomCount?: number;
        /** @description Minimum Bedroom count */
        "bedroomCount[min]"?: number;
        /** @description Maximum Bedroom count */
        "bedroomCount[max]"?: number;
        /** @description Bathroom count */
        bathroomCount?: number;
        /** @description Minimum Bathroom count */
        "bathroomCount[min]"?: number;
        /** @description Maximum Bathroom count */
        "bathroomCount[max]"?: number;
        /** @description Minimum lot size */
        "lotSize[min]"?: number;
        /** @description Maximum lot size */
        "lotSize[max]"?: number;
        /** @description Minimum building size */
        "buildingSize[min]"?: number;
        /** @description Maximum building size */
        "buildingSize[max]"?: number;
        /** @description Ownership */
        ownership?: components["schemas"]["PropertyOwnership"];
        /** @description Car count */
        carCount?: number;
        /** @description Minimum Car count */
        "carCount[min]"?: number;
        /** @description Maximum Car count */
        "carCount[max]"?: number;
        /** @description Electric Power */
        electricPower?: number;
        /** @description City Id */
        cityId?: number;
        /** @description Sort By */
        sort?: components["schemas"]["ListingSort"];
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
  /**
   * Get saved search items
   * @description Returns saved search items
   */
  "saved_searches.index": {
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            saved_searches?: components["schemas"]["SavedSearch"][];
          };
        };
      };
    };
  };
  /** Create saved search */
  "saved_searches.create": {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["SavedSearchRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @example Saved search created successfully */
            message?: string;
          };
        };
      };
    };
  };
  /** Get saved search by id */
  "saved_searches.show": {
    parameters: {
      path: {
        /** @description Saved Search Id */
        id: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": components["schemas"]["SavedSearch"];
        };
      };
      /** @description Saved search not found */
      404: {
        content: {
          "application/json": {
            /** @example Saved search not found */
            error?: string;
          };
        };
      };
    };
  };
  /** Update saved searches */
  "saved_searches.update": {
    parameters: {
      path: {
        /** @description Saved Searches Id */
        id: string;
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["SavedSearchRequest"];
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @example Saved search updated successfully */
            message?: string;
          };
        };
      };
      /** @description Saved search not found */
      404: {
        content: {
          "application/json": {
            /** @example Saved search not found */
            error?: string;
          };
        };
      };
    };
  };
  /** Delete saved searches */
  "saved_searches.delete": {
    parameters: {
      path: {
        /** @description Saved Searches Id */
        id: string;
      };
    };
    responses: {
      /** @description success */
      200: {
        content: {
          "application/json": {
            /** @example Saved search deleted successfully */
            message?: string;
          };
        };
      };
      /** @description Saved search not found */
      404: {
        content: {
          "application/json": {
            /** @example Saved search not found */
            error?: string;
          };
        };
      };
    };
  };
  /**
   * Get profile
   * @description Returns user profile
   */
  telegramProfile: {
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
  updateTelegramProfile: {
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
