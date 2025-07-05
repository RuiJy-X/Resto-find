import "./App.css";

import NavBar from "./NavBar.tsx";
import Header from "./Header.tsx";
import Search from "./Search.tsx";
import RestaurantText from "./RestaurantText.tsx";
import Card from "./Card.tsx";
import RestaurantList from "./RestaurantList.tsx";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Header text="Where do you want to eat?" />
      <Search />
      <RestaurantText text="Ribshack" />
      <Header text="Add Restaurants" />
      <Card />
      <Header text="View Restaurants" />
      <Search />
      <RestaurantList />
    </div>
  );
}

export default App;
