import adultimage from "../images/adultmovie.png";
import "../styles/aboutus.css";
import { GithubIcon } from "@mantinex/dev-icons";
import { Button } from "@mantine/core";

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <div className="aboutus-container">
        <div className="aboutus-user">
          <h2>Daniel-Iounut Rancea</h2>
          <img src={adultimage} className="profile" />
          <p>Here's a biography about Daniel.</p>
          <Button color={"#2b3137"} leftSection={<GithubIcon size={18} />}>
            Github
          </Button>
        </div>
        <div className="aboutus-user">
          <h2>James Myles</h2>
          <img src={adultimage} className="profile" />
          <p>Here's a biography about James.</p>
          <Button color={"#2b3137"} leftSection={<GithubIcon size={18} />}>
            Github
          </Button>
        </div>
        <div className="aboutus-user"></div>
      </div>
    </div>
  );
};

export default About;
