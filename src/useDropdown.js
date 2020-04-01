import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
      <select
        className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        id="grid-state"
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={!options.length}
      >
        <option />

        {options.map((item) => (
          <option className="text-sm" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;
