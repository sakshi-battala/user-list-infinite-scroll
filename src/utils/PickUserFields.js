export function pickUserFields(users) {
  return users.map((user) => ({
    id: user?.id,
    image: user?.image,
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.age,
    gender: user?.gender,
    email: user?.email,
    phone: user?.phone,
    bloodGroup: user?.bloodGroup ?? "N/A",
  }));
}
