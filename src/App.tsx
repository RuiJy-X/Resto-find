import "./App.css";
import { useState } from "react";
import NavBar from "./NavBar.tsx";
import Header from "./Header.tsx";
import Search from "./Search.tsx";
import RestaurantText from "./RestaurantText.tsx";
import Card from "./Card.tsx";
import RestaurantList from "./RestaurantList.tsx";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [allRestaurants, setAllRestaurants] = useState<string[]>([]);
  return (
    <div className="App">
      <NavBar />
      <Header text="Where do you want to eat?" />
      <Search mode="random" setSelectedRestaurant={setSelectedRestaurant} />
      <RestaurantText text={selectedRestaurant} />
      <Header text="Add Restaurants" />
      <Card />
      <Header text="View Restaurants" />
      <Search mode="list-all" setAllRestaurants={setAllRestaurants} />
      <RestaurantList restaurants={allRestaurants} />
    </div>
  );
}

export default App;
