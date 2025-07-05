import ListItem from "./ListItem";

interface Props {
  restaurants: string[];
}
export default function RestaurantList(props: Props) {
  const suggestions = props.restaurants;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center margin-y-16">
      {suggestions.map((suggestion, index) => (
        <ListItem text={suggestion} key={index} />
      ))}
    </div>
  );
}
