import { useState } from "react";
import ListItem from "./ListItem";
export default function RestaurantList() {
  const [suggestions] = useState<string[]>([
    "Apple",
    "Banana",
    "Cherry",
    "Grape",
    "Mango",
    "Orange",
    "Peach",
    "Strawberry",
  ]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center margin-y-16">
      {suggestions.map((suggestion) => (
        <ListItem text={suggestion} />
      ))}
    </div>
  );
}
