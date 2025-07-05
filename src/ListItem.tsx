interface Props {
  text: string;
}

export default function ListItem(props: Props) {
  return (
    <div
      className="d-flex flex-row p-3 margin-y-16 rounded-5 shadow list-item-container "
      style={{}}
    >
      <i className="bi bi-fork-knife orange-bg rounded-circle p-1"></i>
      <div className="list-item mx-3 d-flex align-items-center">
        {props.text}
      </div>
    </div>
  );
}
