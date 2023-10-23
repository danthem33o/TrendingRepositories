import { RepositoryInfoCard } from "../../components/RepositoryInfoCard";
import { Page } from "../../components/Page";
import { useTrendingRepositories } from "../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useSetup } from "./hooks/useSetup";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

export const HomePage = () => {
  const query = useSetup();
  const { trending, favourites } = useTrendingRepositories();

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
        <Grid container item spacing={1}>
          <Typography variant="h5" sx={{ width: "100%" }}>
            Trending repositories
          </Typography>
          <Box
            sx={{
              overflowX: "auto",
              display: "flex",
              gap: 2,
              flexDirection: "row",
              padding: "10px 5px",
            }}
          >
            {trending.map((s) => (
              <RepositoryInfoCard
                key={s.id}
                id={s.id}
                name={s.name}
                ownerName={s.owner.name}
                githubLink={s.url}
                numberOfStars={s.stars}
                description={s.description}
              />
            ))}
          </Box>
        </Grid>
        <Grid container item spacing={1}>
          <Typography variant="h5" sx={{ width: "100%" }}>
            Favourited repositories ({favourites.length})
          </Typography>
          <Box
            sx={{
              overflowX: "auto",
              display: "flex",
              gap: 2,
              flexDirection: "row",
              padding: "10px 5px",
            }}
          >
            {favourites.map((s) => (
              <RepositoryInfoCard
                key={s.id}
                id={s.id}
                name={s.name}
                ownerName={s.owner.name}
                githubLink={s.url}
                numberOfStars={s.stars}
                description={s.description}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
