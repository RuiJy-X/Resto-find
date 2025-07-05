import { useState } from "react";
import Button from "./Button";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Grape",
    "Mango",
    "Orange",
    "Peach",
    "Strawberry",
  ];
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
        <Button text="Search" />
      </div>
    </div>
  );
}
