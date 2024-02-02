// Footer component for footer section

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="m-2 w-auto text-center text-custom-light-beige bg-custom-darkest-blue p-5 rounded-lg shadow-lg">
      Created By ❤️
      &nbsp;
      <a href="https://www.linkedin.com/in/priyanshu-patel-770997201/" target="_blank" >
        Priyanshu Patel
      </a>
      &nbsp;
      
      ©️ {year}

    </div>
  );
};

export default Footer;