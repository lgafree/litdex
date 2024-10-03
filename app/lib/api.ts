import axios from "axios";
import { API_PARAMS } from "~/config";

const BASE_URL = "https://www.ksztagent.com/api/sns/v1/lit";;

export async function getFeed(userId: string, start_ts: string) {
  const params = {
    ...API_PARAMS,
    start_ts: start_ts
  }

  try {
    const response = await axios.get(`${BASE_URL}/feed/view/${userId}`, { params });
    return response.data.data || [];
  }
  catch (error) {
    console.error("Error fetching user feed data:", error);
    throw new Error("Failed to fetch user feed data");
  }
}

export async function getUser(userId: string) {
  const params = {
    ...API_PARAMS
  };

  try {
    const response = await axios.get(`${BASE_URL}/user/get_info/${userId}`, { params });
    return response.data.data || [];
  }
  catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getRoom(roomId: string) {
  const params = {
    ...API_PARAMS
  };

  try {
    const response = await axios.get(`${BASE_URL}/party/get_party_info/${roomId}`, { params });
    return response.data.data || [];
  }
  catch (error) {
    console.error("Error fetching room data:", error);
    throw new Error("Failed to fetch room data");
  }
}

export async function searchRooms(query: string) {
    const params = {
      ...API_PARAMS,
      name: query,
    };
  
    try {
      const response = await axios.get(`${BASE_URL}/party/search_party`, { params });
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching rooms data:", error);
      throw new Error("Failed to fetch room data");
    }
  }

export async function searchUsers(query: string) {
  const params = {
    ...API_PARAMS,
    nickname: query,
  };

  try {
    const response = await axios.get(`${BASE_URL}/user/search`, { params });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw new Error("Failed to fetch user data");
  }
}
