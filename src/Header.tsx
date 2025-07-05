interface Props {
  text: string;
}

export default function Header(props: Props) {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center p-3"
      style={{ marginTop: "64px", marginBottom: "8px" }}
    >
      <div className="header text-center ">{props.text}</div>
    </div>
  );
}
