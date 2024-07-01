import React, { useState, useEffect } from "react";
import axios from "axios";

const NominatimURL = "https://nominatim.openstreetmap.org/search";

const AutocompleteInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(NominatimURL, {
            params: {
              q: query,
              format: "json",
              addressdetails: 1,
              limit: 20,
            },
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a place"
        className="p-2 border border-gray-300 rounded text-slate-700"
      />
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded mt-1 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="p-2 hover:bg-gray-100 hover:text-slate-800 cursor-pointer "
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
