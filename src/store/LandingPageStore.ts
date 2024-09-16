import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Hotel,
  RoomType,
  ApiResponse,
  LandingPageData,
  SearchResult,
  Review,
} from "@/types/LandingPage";

type SetState = (
  partial: any,
  replace?: boolean | undefined,
  action?: string | undefined
) => void;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

interface BaseState {
  isLoading: boolean;
  error: string | null;
}

// interface setting
interface PopularHotelsState extends BaseState {
  popularHotels: Hotel[];
  fetchPopularHotels: () => Promise<void>;
}

interface AvailableRoomsState extends BaseState {
  availableRooms: RoomType[];
  fetchAvailableRooms: () => Promise<void>;
}

interface RecentReviewsState extends BaseState {
  recentReviews: Review[];
  fetchRecentReviews: () => Promise<void>;
}

interface HotelDetailState extends BaseState {
  hotelDetail: Hotel[];
  fetchHotelDetail: (id: number) => Promise<void>;
}

interface SearchState extends BaseState {
  searchResults: {};
  searchParams: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  setSearchParams: (params: Partial<SearchState["searchParams"]>) => void;
  performSearch: () => Promise<void>;
}

interface SearchFilterState extends BaseState {
  searchFilterResults: {};
  searchFilterParams: {
    price_min: number;
    price_max: number;
    star_rating: number;
    amenities: number[];
  };
  setSearchFilterBody: (
    params: Partial<SearchFilterState["searchFilterParams"]>
  ) => void;
  performSearchFilter: () => Promise<void>;
}

// slices setting
const createPopularHotelsSlice = (set: SetState): PopularHotelsState => ({
  popularHotels: [],
  isLoading: false,
  error: null,
  fetchPopularHotels: async () => {
    set({ isLoading: true }, false, "startFetchPopularHotels");
    try {
      const data: ApiResponse<LandingPageData> = await fetchData(
        `${API_URL}/home`
      );
      if (data.status === "Success") {
        set(
          {
            popularHotels: data.data.popularHotels,
            isLoading: false,
            error: null,
          },
          false,
          "successFetchPopularHotels"
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set(
        {
          error: (error as Error).message || "Failed to fetch popular hotels",
          isLoading: false,
        },
        false,
        "errorFetchPopularHotels"
      );
    }
  },
});

const createAvailableRoomsSlice = (set: SetState): AvailableRoomsState => ({
  availableRooms: [],
  isLoading: false,
  error: null,
  fetchAvailableRooms: async () => {
    set({ isLoading: true }, false, "startFetchAvailableRooms");
    try {
      const data: ApiResponse<LandingPageData> = await fetchData(
        `${API_URL}/home`
      );
      if (data.status === "Success") {
        set(
          {
            availableRooms: data.data.availableRooms,
            isLoading: false,
            error: null,
          },
          false,
          "successFetchAvailableRooms"
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set(
        {
          error: (error as Error).message || "Failed to fetch available rooms",
          isLoading: false,
        },
        false,
        "errorFetchAvailableRooms"
      );
    }
  },
});

const createHotelDetailSlice = (set: SetState): HotelDetailState => ({
  hotelDetail: [],
  isLoading: false,
  error: null,
  fetchHotelDetail: async (id: number) => {
    set({ isLoading: true }, false, "startFetchHotelDetail");
    try {
      const data: ApiResponse<Hotel> = await fetchData(
        `${API_URL}/hotel/${id}`
      );
      if (data.status === "Success") {
        set(
          {
            hotelDetail: [data.data], // Wrap the single hotel in an array
            isLoading: false,
            error: null,
          },
          false,
          "successFetchHotelDetail"
        );
        console.log(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set(
        {
          error: (error as Error).message || "Failed to fetch hotel detail",
          isLoading: false,
        },
        false,
        "errorFetchHotelDetail"
      );
    }
  },
});

// const createHotelDetailSlice = (set: SetState): HotelDetailState => ({
//   hotelDetail: null,
//   isLoading: false,
//   error: null,
//   fetchHotelDetail: async (id: string) => {
//     set({ isLoading: true }, false, "startFetchHotelDetail");
//     try {
//       const data: ApiResponse<Hotel> = await fetchData(
//         `${API_URL}/hotels/${id}`
//       );
//       if (data.status === "Success") {
//         set(
//           {
//             hotelDetail: data.data,
//             isLoading: false,
//             error: null,
//           },
//           false,
//           "successFetchHotelDetail"
//         );
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       set(
//         {
//           error: (error as Error).message || "Failed to fetch hotel detail",
//           isLoading: false,
//         },
//         false,
//         "errorFetchHotelDetail"
//       );
//     }
//   },
// });

const createRecentReviewsSlice = (set: SetState): RecentReviewsState => ({
  recentReviews: [],
  isLoading: false,
  error: null,
  fetchRecentReviews: async () => {
    set({ isLoading: true }, false, "startFetchRecentReviews");
    try {
      const data: ApiResponse<LandingPageData> = await fetchData(
        `${API_URL}/home`
      );
      if (data.status === "Success") {
        set(
          {
            recentReviews: data.data.recentReviews,
            isLoading: false,
            error: null,
          },
          false,
          "successFetchRecentReviews"
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set(
        {
          error: (error as Error).message || "Failed to fetch recent reviews",
          isLoading: false,
        },
        false,
        "errorFetchRecentReviews"
      );
    }
  },
});

const createSearchSlice = (set: any, get: any): SearchState => ({
  searchResults: [
    {
      data: [],
    },
  ],
  searchParams: {
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  },
  isLoading: false,
  error: null,
  setSearchParams: (params) => {
    set(
      (state: SearchState) => ({
        searchParams: { ...state.searchParams, ...params },
      }),
      false,
      "setSearchParams"
    );
  },
  performSearch: async () => {
    set({ isLoading: true }, false, "startSearch");
    try {
      const { location, checkIn, checkOut, guests } = get().searchParams;
      const url = `${API_URL}/search?location=${encodeURIComponent(
        location
      )}&check_in=${checkIn}&check_out=${checkOut}&guests=${guests}`;
      const data: ApiResponse<SearchResult> = await fetchData(url);

      if (data.status === "Success") {
        set(
          {
            searchResults: data.data.data,
            isLoading: false,
            error: null,
          },
          false,
          "successSearch"
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set(
        {
          error: (error as Error).message || "Failed to perform search",
          isLoading: false,
        },
        false,
        "errorSearch"
      );
    }
  },
});

const createSearchFilterSlice = (set: any, get: any): SearchFilterState => ({
  searchFilterResults: [
    {
      data: [],
    },
  ],
  searchFilterParams: {
    price_min: 0,
    price_max: 10000000,
    star_rating: 0,
    amenities: [],
  },
  isLoading: false,
  error: null,
  setSearchFilterBody: (params) => {
    set(
      (state: SearchFilterState) => ({
        searchFilterParams: { ...state.searchFilterParams, ...params },
      }),
      false,
      "setSearchFilterParams"
    );
  },
  performSearchFilter: async () => {
    set({ isLoading: true }, false, "startSearchFilter");
    try {
      const { price_min, price_max, star_rating, amenities } =
        get().searchFilterParams;

      const amenitiesString = amenities.join(",");

      const url = `${API_URL}/filter?price_min=${price_min}&price_max=${price_max}&star_rating=${star_rating}&amenities=${amenitiesString}`;

      const data: ApiResponse<SearchResult> = await fetchData(url);

      if (data.status === "Success") {
        set(
          {
            searchFilterResults: data.data.data,
            isLoading: false,
            error: null,
          },
          false,
          "successSearchFilter"
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set(
        {
          error: (error as Error).message || "Failed to perform search filter",
          isLoading: false,
        },
        false,
        "errorSearchFilter"
      );
    }
  },
});

// export slice setup
export const usePopularHotelsStore = create<PopularHotelsState>()(
  devtools(createPopularHotelsSlice, { name: "PopularHotelsStore" })
);

export const useAvailableRoomsStore = create<AvailableRoomsState>()(
  devtools(createAvailableRoomsSlice, { name: "AvailableRoomsStore" })
);

export const useRecentReviewsStore = create<RecentReviewsState>()(
  devtools(createRecentReviewsSlice, { name: "RecentReviewsStore" })
);

export const useSearchStore = create<SearchState>()(
  devtools(createSearchSlice, { name: "SearchStore" })
);

export const useSearchFilterStore = create<SearchFilterState>()(
  devtools(createSearchFilterSlice, { name: "SearchFilterStore" })
);

export const useHotelDetailStore = create<HotelDetailState>()(
  devtools(createHotelDetailSlice, { name: "HotelDetailStore" })
);

// hilangkan log devtools jika sudah tidak dipakai
// export const usePopularHotelsStore = create<PopularHotelsState>(createPopularHotelsSlice);
// export const useAvailableRoomsStore = create<AvailableRoomsState>(createAvailableRoomsSlice);
