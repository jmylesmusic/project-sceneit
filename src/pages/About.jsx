import adultimage from "../images/adultmovie.png";
import jamesselfie from "../images/james-selfie.png";
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
          <p>
            Here's a biography about Daniel. It's a really cool biography that
            he's going to write.
          </p>
          <a href="https://github.com/johndaniell" target="_blank">
            <Button color={"#2b3137"} leftSection={<GithubIcon size={18} />}>
              Github
            </Button>
          </a>
        </div>
        <div className="aboutus-user">
          <h2>James Myles</h2>
          <img src={jamesselfie} className="profile" />
          <p>
            James is a freelance web developer with experience in HTML, CSS,
            Javascript, React, and Bootstrap.
          </p>
          <a href="https://github.com/jmylesmusic" target="_blank">
            <Button color={"#2b3137"} leftSection={<GithubIcon size={18} />}>
              Github
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
