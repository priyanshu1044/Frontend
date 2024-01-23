// Footer component for footer section

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By ❤️
      &nbsp;
      <a href="https://www.linkedin.com/in/priyanshu-patel-770997201/" target="_blank">
        Priyanshu Patel
      </a>
      &nbsp;
      
      ©️ {year}

    </div>
  );
};

export default Footer;
