import jamesselfie from "../images/james-selfie.png";
import "../styles/aboutus.css";
import { GithubIcon } from "@mantinex/dev-icons";
import { Button } from "@mantine/core";
import FlyingText from "../components/FlyingText";

const danielText =`Daniel-Ionut Rancea is a seasoned Tech Artist transitioning to a Full-Stack Developer role. With extensive experience at Ubisoft and as a freelancer, he specializes in software development and 3D/VFX, including proficiency in object-oriented programming (OOP) which is foundational for his shift to full-stack development.
    Daniel-Ionut excels in Python, C++, and has developed tools for Blender, enhancing his deep understanding of both front-end and back-end development paradigms. His robust technical background is complemented by a bachelor’s degree in Foreign Languages and Literatures, equipping him with unique problem-solving and communication skills vital for his new career path.`
const jamesText = `James Myles is a saxophonist, composer, and educator who is now transitioning into Full-Stack Web Development. He has experience in HTML, CSS,
Javascript, React, and Bootstrap.`


const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <div className="aboutus-container">
        <div className="aboutus-user">
          <h2>Daniel-Iounut Rancea</h2>
          <img src="https://media.licdn.com/dms/image/D4E03AQGDzk2z765akA/profile-displayphoto-shrink_800_800/0/1710354118843?e=1718841600&v=beta&t=cEr2gZvWKt3flIRh7Y_XG6MjykQJOel_sdeeGqxBkJE" className="profile" />
          <FlyingText text={danielText} interval = {20} />  {/* You can adjust the interval as needed. The higher the slower */}
          <a href="https://github.com/johndaniell" target="_blank">
            <Button color={"#2b3137"} leftSection={<GithubIcon size={1} />}>
              Github
            </Button>
          </a>
        </div>
        <div className="aboutus-user">
          <h2>James Myles</h2>
          <img src={jamesselfie} className="profile" />
          <FlyingText text={jamesText} interval = {100} />  {/* You can adjust the interval as needed. The higher the slower */}
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
