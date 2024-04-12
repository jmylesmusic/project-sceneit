import tmdbLogo from "../images/tmdblogo.svg";

const Footer = () => {
  return (
    <div className="footer">
      API provided by
      <a href="https://developer.themoviedb.org/" target="_blank">
        <img src={tmdbLogo} width="20%" />
      </a>
    </div>
  );
};

export default Footer;
