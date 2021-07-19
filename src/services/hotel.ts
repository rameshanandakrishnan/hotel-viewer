const API_PATH = 'https://obmng.dbm.guestline.net/api';

type Hotel = {
  id: string;
  name: string;
  description: string;
  address1: string;
  address2: string;
  postcode: string;
  town: string;
  country: string;
  starRating: string;
  telephone: string;
  email: string;
  images: Record<'url', string>[];
};

type Occupancy = {
  maxAdults: number;
  maxChildren: number;
  maxOverall: number;
};

export type Room = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  occupancy: Occupancy;
  images: Record<'url', string>[];
};

type RoomRates = {
  rooms: Room[];
  ratePlans: unknown[];
};

export type HotelWithRooms = Hotel & { rooms: Room[] };

const getHotels = async (collectionId: string): Promise<Hotel[]> => {
  const response = await fetch(`${API_PATH}/hotels?collection-id=${collectionId}`);
  const hotels = await response.json();

  return hotels as Hotel[];
};

const getRoomRates = async (collectionId: string, hotelId: string): Promise<RoomRates> => {
  const response = await fetch(`${API_PATH}/roomRates/${collectionId}/${hotelId}`);
  const roomRates = await response.json();

  return roomRates as RoomRates;
};

const getHotelsWithRooms = async (collectionId: string): Promise<HotelWithRooms[]> => {
  const hotels = await getHotels(collectionId);

  const hotelsWithRooms = await Promise.all(
    hotels.map(async (hotel) => {
      const { rooms } = await getRoomRates(collectionId, hotel.id);
      const hotelWithRooms = hotel as HotelWithRooms;
      hotelWithRooms.rooms = rooms;

      return hotelWithRooms;
    })
  );

  return hotelsWithRooms;
};

export { getHotelsWithRooms };
