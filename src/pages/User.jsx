import { useParams } from "react-router-dom";
import MovieCardsCarousel from "../components/MovieCardsCarousel";
const User = () => {
  const { userId } = useParams();

  return (
    <div>
      <img src="" />
      <p>John Doe</p>
      <p>Favorite Movies:</p>
      <p>Carousel</p>
    </div>
  );
};

export default User;
