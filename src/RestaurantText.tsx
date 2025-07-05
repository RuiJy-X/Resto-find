interface Props {
  text: string;
}

export default function RestaurantText(props: Props) {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center margin-y-32 p-5">
      <div className="restaurant-text">{props.text}</div>
    </div>
  );
}
