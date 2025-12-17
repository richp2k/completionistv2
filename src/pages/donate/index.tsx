import Navbar from "../../components/Navbar";

const DonatePage = () => {
  return (
    <div className="container-fluid bg-dark App" style={{ color: "white" }}>
      <Navbar />
      <p style={{ padding: 20 }}>
        The site and everything connected to it will always remain free to use.
        <br />
        <br />
        Donation is mostly a token of appreciation for the work I've put into
        this site and are completely optional.
        <br />
        Site will continue to funtion even with no donations whatsoever
        <br />
        <br />
        If you want to support me,{" "}
        <a target="_blank" href="https://www.paypal.com/paypalme/bowashe">
          click here
        </a>
        .
      </p>
    </div>
  );
};

export default DonatePage;
