function UserCard({ user }) {
  return (
    <div className="user-card">
      <img
        className="user-photo"
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Blood Group: {user.bloodGroup}</p>
    </div>
  );
}

export default UserCard;
