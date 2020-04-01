import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const SearchParams = (props) => {
  const [location] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [pets, setPets] = useState([]);

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  const requestPets = async () => {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requestPets();
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white border shadow-md rounded p-5"
        >
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Location
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id={location}
              value={location}
              // onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </label>
          <AnimalDropdown />
          <BreedDropdown />
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Theme
            <select
              className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              onBlur={(e) => setTheme(e.target.value)}
            >
              <option className="text-sm" value="peru">
                Peru
              </option>
              <option className="text-sm" value="darkblue">
                Dark Blue
              </option>
              <option className="text-sm" value="chartreuse">
                Chartreuse
              </option>
              <option className="text-sm" value="mediumorchid">
                Medium Orchid
              </option>
            </select>
          </label>
          <button
            className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            // style={{ backgroundColor: theme }}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="border bg-white shadow-md rounded p-5">
        <Results pets={pets} />
      </div>
    </div>
  );
};

export default function SearchParamsError(props) {
  return (
    <ErrorBoundary>
      <SearchParams {...props} />
    </ErrorBoundary>
  );
}
