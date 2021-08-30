import { useState, useCallback } from "react";

import SearchIcon from "./icons/Search";

import debounce from "../lib/debounce";

import css from "./SearchInput.module.scss";

const SearchInput = ({ onChange, onTyping }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onTyping();
    handleDebounce(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    debounce((searchValue) => {
      onChange(searchValue);
    }, 500),
    []
  );

  return (
    <div className={css.input}>
      <div className={css.input__icon}>
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Telusuri Film"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
