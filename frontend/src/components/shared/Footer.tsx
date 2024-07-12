const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="container border-t py-10 text-center">
      Copyright {year}. All rights reserved by{" "}
      <a
        href="https://www.linkedin.com/in/saiful-islam-0471b924b"
        target="_blank"
        className="link"
      >
        Saiful Islam
      </a>
    </footer>
  );
};

export default Footer;
