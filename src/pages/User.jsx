import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();

  return (
    <div>
      {" "}
      <p>{userId}</p>
      DA USER PAGEEE :D
    </div>
  );
};

export default User;
