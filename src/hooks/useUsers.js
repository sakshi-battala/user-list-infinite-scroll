import { useState, useEffect, useRef } from "react";
import { getUsers } from "../services/userService";

const PAGE_SIZE = 12;

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);

  const busy = useRef(false); // stops two requests running together

  // first page (also used by the retry button)
  const loadUsers = async () => {
    busy.current = true;
    setLoading(true);
    setError(false);

    try {
      const data = await getUsers(PAGE_SIZE, 0);
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      busy.current = false;
    }
  };

  // next pages
  const loadMore = async () => {
    if (busy.current) return;
    busy.current = true;
    setLoadingMore(true);
    setLoadMoreError(false);

    try {
      const data = await getUsers(PAGE_SIZE, users.length);
      setUsers((prev) => [...prev, ...data.users]);
      setTotal(data.total);
    } catch (err) {
      setLoadMoreError(true);
    } finally {
      setLoadingMore(false);
      busy.current = false;
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const hasMore = users.length < total;

  return {
    users,
    loading,
    loadingMore,
    error,
    loadMoreError,
    hasMore,
    loadUsers,
    loadMore,
  };
}
