import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const User = () => {
  const BACKEND_URL = import.meta.env.VITE_URL_IRONSACK;
  const { userId } = useParams();
  const [userinfo, setUserinfo] = useState([]);
  useEffect(() => {
    fetch(`${BACKEND_URL}/users/${userId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserinfo(data);
      });
  }, []);
  return (
    <div>
      <img src="" />
      <p>s</p>
      <p>Favorite Movies:</p>
      <p>Carousel</p>
    </div>
  );
};

export default User;
