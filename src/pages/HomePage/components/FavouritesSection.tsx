import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RepositoryInfoCard } from "../../../components/RepositoryInfoCard";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";

export const FavouritesSection = () => {
  const { favourites } = useTrendingRepositories();

  return (
    <>
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
    </>
  );
};
