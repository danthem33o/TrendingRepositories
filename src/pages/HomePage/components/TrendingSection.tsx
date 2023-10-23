import { Typography, Box, CircularProgress } from "@mui/material";
import { RepositoryInfoCard } from "../../../components/RepositoryInfoCard";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useOnFilterByLanguage } from "../hooks/useOnFilterByLanguage";

export const TrendingSection = () => {
  const { trending } = useTrendingRepositories();

  const { isLoading } = useOnFilterByLanguage();

  return (
    <>
      <Typography variant="h5" sx={{ width: "100%" }}>
        Trending repositories (Top 10)
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
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
            <RepositoryInfoCard key={s.id} repository={s} />
          ))}
        </Box>
      )}
    </>
  );
};
