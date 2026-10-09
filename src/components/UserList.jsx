import { useState } from "react";
import UserCard from "./UserCard";
import { sortUsers } from "../utils/sortUsers";
import {
  genderOptions,
  bloodGroupOptions,
  sortOptions,
} from "../constants/options";
import Dropdown from "./Dropdown";
import { useUsers } from "../hooks/useUsers";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

function UserList() {
  const {
    users,
    loading,
    loadingMore,
    error,
    loadMoreError,
    hasMore,
    loadUsers,
    loadMore,
  } = useUsers();

  const [gender, setGender] = useState("all");
  const [bloodGroup, setBloodGroup] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  const canLoadMore = hasMore && !loadingMore && !loadMoreError;

  const bottomRef = useInfiniteScroll(loadMore, canLoadMore);

  if (loading) return <p className="loader">Loading...</p>;

  if (error)
    return (
      <div className="error-container">
        <p>Error loading users</p>
        <button onClick={loadUsers}>Retry</button>
      </div>
    );

  if (users.length === 0) return <p>No users found</p>;

  const filteredUsers = users.filter(
    (user) =>
      (gender === "all" || user.gender === gender) &&
      (bloodGroup === "all" || user.bloodGroup === bloodGroup),
  );

  const visibleUsers = sortUsers(filteredUsers, sortBy);

  return (
    <div>
      <div className="filters">
        <Dropdown value={gender} onChange={setGender} options={genderOptions} />

        <Dropdown
          value={bloodGroup}
          onChange={setBloodGroup}
          options={bloodGroupOptions}
        />

        <Dropdown value={sortBy} onChange={setSortBy} options={sortOptions} />

        <button
          disabled={
            gender === "all" && bloodGroup === "all" && sortBy === "none"
          }
          onClick={() => {
            setGender("all");
            setBloodGroup("all");
            setSortBy("none");
          }}
        >
          Clear Filters
        </button>
      </div>

      {visibleUsers.length === 0 ? (
        <p style={{ textAlign: "center" }}>No users found</p>
      ) : (
        <div className="user-grid">
          {visibleUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      <div ref={bottomRef} className="list-bottom">
        {loadingMore && <p>Loading more...</p>}
        {loadMoreError && (
          <div>
            <p>Could not load more users</p>
            <button onClick={loadMore}>Try again</button>
          </div>
        )}
        {!hasMore && <p>No more users</p>}
      </div>
    </div>
  );
}

export default UserList;
