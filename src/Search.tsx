import { useEffect, useState } from "react";
import Button from "./Button";
import supabase from "./supbase-client.ts";
interface Props {
  mode: string;
  setSelectedRestaurant?: (restaurant: string) => void;
  setAllRestaurants?: (restaurants: string[]) => void;
}
export default function Search(props: Props) {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowDropdown(false);
  };

  const fetchLocations = async () => {
    const { data, error } = await supabase.from("Locations").select("location");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      const names = data.map((item) => item.location);
      setSuggestions(names);
    }
  };

  useEffect(() => {
    console.log("Fetching suggestions...");
    fetchLocations();
  }, []);

  const handleSearch = async () => {
    // This function can be used to handle the search action
    // if Random, it should fetching a random restaurant from the database using the location inputted (query)
    if (props.mode == "random") {
      //first get locationID if query is equal to location inside the database
      const { data, error } = await supabase
        .from("Locations")
        .select("id")
        .eq("location", query)
        .single();
      if (error) {
        console.error("Error fetching location ID:", error);
      } else if (data) {
        const locationId = data.id;
        // Now fetch a random restaurant from the database using the location ID
        const { data: restaurantData, error: restaurantError } = await supabase
          .from("Restaurants")
          .select("name")
          .eq("location", locationId);

        if (restaurantError) {
          console.error("Error fetching random restaurant:", restaurantError);
        } else if (restaurantData) {
          if (props.setSelectedRestaurant) {
            // Extract all restaurant names into an array
            const restaurantNames = restaurantData.map((r) => r.name);

            if (restaurantNames.length === 0) {
              alert("No restaurants found for this location.");
              return;
            }

            // Randomly select one restaurant
            const randomRestaurant =
              restaurantNames[
                Math.floor(Math.random() * restaurantNames.length)
              ];

            // Set it using the parent's setter
            props.setSelectedRestaurant(randomRestaurant);
          }
        }
      }
    } else if (props.mode == "list-all") {
      // If mode is list-all, we can fetch all restaurants from the database
      const { data, error } = await supabase
        .from("Locations")
        .select("id")
        .eq("location", query)
        .single();
      if (error) {
        console.error("Error fetching location ID:", error);
      } else if (data) {
        const locationId = data.id;
        // Now fetch all restaurants from the database using the location ID
        const { data: restaurantData, error: restaurantError } = await supabase
          .from("Restaurants")
          .select("name")
          .eq("location", locationId);

        if (restaurantError) {
          console.error("Error fetching all restaurants:", restaurantError);
        } else if (restaurantData) {
          if (props.setAllRestaurants) {
            props.setAllRestaurants(restaurantData.map((item) => item.name));
          }
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="position-relative" style={{ width: "300px" }}>
        {/* Input group */}
        <div className="input-group">
          <span
            className="input-group-text orange-bg"
            style={{
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              color: "white",
              borderBottom: "1px solid black",
              borderLeft: "1px solid black",
              borderTop: "1px solid black",
            }}
          >
            <i className="bi bi-geo-alt-fill"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            style={{
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              border: "1px solid black",
            }}
          />
        </div>

        {/* Dropdown */}
        {showDropdown && filteredSuggestions.length > 0 && (
          <ul
            className="list-group position-absolute"
            style={{
              top: "100%",
              left: 0,
              width: "100%",
              zIndex: 1000,
            }}
          >
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onMouseDown={() => handleSelect(item)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="d-flex flex-row justify-content-center mx-2 margin-y-16">
        <Button text="Search" onClick={handleSearch} />
      </div>
    </div>
  );
}
