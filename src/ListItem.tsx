interface Props {
  text: string;
}

export default function ListItem(props: Props) {
  return (
    <div
      className="d-flex flex-row p-3 margin-y-16 rounded-5 shadow list-item-container "
      style={{
       
      }}
    >
      <i className="bi bi-fork-knife orange-bg"></i>
      <div className="list-item mx-3">{props.text}</div>
    </div>
  );
}
