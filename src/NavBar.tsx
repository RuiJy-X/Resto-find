import image from "./assets/restofind-high-resolution-logo-transparent.png";

export default function NavBar() {
  return (
    <div className="d-flex flex-row align-items-center">
      <img
        src={image}
        alt=""
        className="img-fluid"
        style={{ width: "48px", height: "48px" }}
      />
      <div className="title margin-x-8">RestoFind</div>
    </div>
  );
}
