import { Page } from "../../components/Page";
import { useSetup } from "./hooks/useSetup";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { FormControl } from "@mui/base";
import { LanguageFilter } from "./components/LanguageFilter";
import { TrendingSection } from "./components/TrendingSection";
import { FavouritesSection } from "./components/FavouritesSection";

export const HomePage = () => {
  const query = useSetup();
  if (query.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <CircularProgress />
        </div>
        <Typography component="div">
          Retrieving trending repositories
        </Typography>
      </Box>
    );
  }

  return (
    <Page>
      <Grid container spacing={8}>
        <Grid item sx={{ width: "100%" }}>
          <FormControl style={{ width: "100%" }}>
            <LanguageFilter />
          </FormControl>
        </Grid>
        <Grid container item spacing={1}>
          <TrendingSection />
        </Grid>
        <Grid container item spacing={1}>
          <FavouritesSection />
        </Grid>
      </Grid>
    </Page>
  );
};
