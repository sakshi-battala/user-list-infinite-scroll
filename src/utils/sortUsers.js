export function sortUsers(users, sortBy) {
  const sorted = [...users]; 

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) =>
        (a.firstName ?? "").localeCompare(b.firstName ?? ""),
      );
    case "name-desc":
      return sorted.sort((a, b) =>
        (b.firstName ?? "").localeCompare(a.firstName ?? ""),
      );
    case "age-asc":
      return sorted.sort((a, b) => a.age - b.age);
    case "age-desc":
      return sorted.sort((a, b) => b.age - a.age);
    default:
      return users;
  }
}
