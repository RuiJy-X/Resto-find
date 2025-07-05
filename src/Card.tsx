import { useState } from "react";
import Button from "./Button";
import supabase from "./supbase-client.ts";

export default function Card() {
  const [query, setQuery] = useState<string>("");
  const [restaurant, setRestaurant] = useState<string>("");
  const addRestaurant = async () => {
    let locationId: number | null = null;
    const { data, error } = await supabase
      .from("Locations")
      .select("id")
      .eq("name", query)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      locationId = data?.id;
    }

    if (!locationId) {
      const { data, error } = await supabase
        .from("Locations")
        .insert({
          name: query,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        locationId = data?.id;
      }
    }

    const { data: restaurantData, error: restaurantError } = await supabase
      .from("Restaurants")
      .insert({
        name: restaurant,
        locationId: locationId,
      });

    if (restaurantError) {
      console.error("Error fetching data:", restaurantError);
    } else {
      setSuggestions([...suggestions, restaurant]);
      setQuery("");
      setRestaurant("");
    }
  };
  const [suggestions, setSuggestions] = useState<string[]>([
    "Apple",
    "Banana",
    "Cherry",
    "Grape",
    "Mango",
    "Orange",
    "Peach",
    "Strawberry",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleRestaurant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRestaurant(value);
  };
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

  return (
    <div className="margin-y-32 d-flex flex-row justify-content-center">
      <div
        className="p-4 rounded-5 d-flex flex-column position-relative shadow"
        style={{ backgroundColor: "white", width: "500px" }}
      >
        <label htmlFor="location" className="form-label text-left">
          Location
        </label>

        {/* Input and Dropdown */}
        <div className="position-relative">
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            style={{
              borderRadius: "15px",
              border: "1px solid black",
            }}
          />
          {showDropdown && filteredSuggestions.length > 0 && (
            <ul
              className="list-group position-absolute"
              style={{
                width: "100%",
                zIndex: 1000,
                top: "100%",
                left: 0,
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

        <label htmlFor="restaurant" className="mt-3 form-label">
          Restaurant Name
        </label>
        <input
          type="text"
          id="restaurant"
          placeholder="Ex. McDonalds"
          value={restaurant}
          onChange={handleRestaurant}
          className="form-control"
          style={{
            borderRadius: "15px",
            border: "1px solid black",
          }}
        />

        <div className="d-flex flex-row justify-content-center mx-2 margin-y-16">
          <Button text="Add" onClick={addRestaurant} />
        </div>
      </div>
    </div>
  );
}
