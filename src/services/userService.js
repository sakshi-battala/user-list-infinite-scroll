


import { pickUserFields } from "../utils/PickUserFields";

const BASE_URL = "https://dummyjson.com";

export async function getUsers(limit = 12, skip = 0) {
  const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();

  return {
    users: pickUserFields(data?.users ?? []),
    total: data?.total ?? 0,
  };
}