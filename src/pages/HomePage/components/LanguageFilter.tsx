import { Autocomplete, TextField } from "@mui/material";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { SyntheticEvent, useCallback } from "react";

export const LanguageFilter = () => {
  const { languages, filterByLanguages } = useTrendingRepositories();

  const onChange = useCallback(
    (e: SyntheticEvent, value: string[]) => {
      filterByLanguages(value);
    },
    [filterByLanguages]
  );

  return (
    <Autocomplete
      title="Filter trending by languages"
      multiple
      freeSolo
      options={languages}
      onChange={onChange}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select or type language to filter on"
          aria-label="Select languages"
          sx={{ width: "100%" }}
          label="Filter by languages"
        />
      )}
    />
  );
};
