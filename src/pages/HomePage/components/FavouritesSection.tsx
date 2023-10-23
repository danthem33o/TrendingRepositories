import { Icon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RepositoryInfoCard } from "../../../components/RepositoryInfoCard";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const FavouritesSection = () => {
  const { favourites } = useTrendingRepositories();

  return (
    <>
      <Typography variant="h5" sx={{ width: "100%" }}>
        Favourited repositories ({favourites.length})
      </Typography>
      {favourites.length ? (
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
            <RepositoryInfoCard key={s.id} repository={s} />
          ))}
        </Box>
      ) : (
        <div style={{}}>
          Nothing favourited yet! Click the{" "}
          <Icon>
            <FavoriteBorderIcon />
          </Icon>{" "}
          to start favouritting
        </div>
      )}
    </>
  );
};
