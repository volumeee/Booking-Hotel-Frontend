export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface LandingPageData {
  popularHotels: Hotel[];
  availableRooms: RoomType[];
  recentReviews: Review[];
  hotelDetails: Hotel[];
}

export interface SearchResult {
  status: string;
  message: string;
  current_page: number;
  data: RoomType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface FeaturedDestination {
  city: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  star_rating: number;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  lowest_price: string;
  images: Image[];
  reviews: Review[];
  amenities: Amenity[];
  room_types: RoomType[];
}

export interface RoomType {
  id: number;
  hotel_id: number;
  name: string;
  description: string;
  capacity: number;
  price_per_night: string;
  created_at: string;
  updated_at: string;
  hotel: Hotel;
  images: Image[];
  rooms: Room[];
  amenities: Amenity[];
}

export interface Room {
  id: number;
  hotel_id: number;
  room_type_id: number;
  room_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  user_id: number;
  hotel_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
  hotel: Hotel;
}

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at: string;
  role_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  loyalty_points: number;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  hotel_id?: number;
  room_type_id?: number;
  image_url: string;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface Amenity {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    hotel_id: number;
    amenity_id: number;
  };
}
