import { useTrendingRepositories } from "../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useCallback, useMemo } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Repository } from "../state/TrendingRepositories/types";

export interface RepositoryInfoCardProps {
  repository: Repository;
}

export const RepositoryInfoCard = ({ repository }: RepositoryInfoCardProps) => {
  const { id, name, owner, url, stars, description } = repository;

  const {
    useFavouriteRepository,
    useUnfavouriteRepository,
    checkIsFavourited,
  } = useTrendingRepositories();

  const favouriteQuery = useFavouriteRepository(repository);
  const unFavouriteQuery = useUnfavouriteRepository(repository);

  const isFavourited = useMemo(
    () => checkIsFavourited(id),
    [checkIsFavourited, id]
  );

  const onFavourited = useCallback(() => {
    if (isFavourited) {
      unFavouriteQuery.mutate({ ownerName: owner.name, repoName: name });
    } else {
      favouriteQuery.mutate({ ownerName: owner.name, repoName: name });
    }
  }, [isFavourited, unFavouriteQuery, owner.name, name, favouriteQuery]);

  return (
    <Card
      aria-label="Repository information"
      sx={{
        width: 350,
        flexShrink: 0,
        height: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={name}
        action={
          <IconButton
            aria-label="Repository link"
            title="Open repository in new tab"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <LinkIcon />
          </IconButton>
        }
        sx={{
          display: "flex",
          overflow: "hidden",
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          },
        }}
        titleTypographyProps={{ noWrap: true, title: name }}
      />
      <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Typography variant="body2" color="text.secondary" overflow="auto">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          component="span"
          variant="body2"
          color="text.secondary"
          overflow="auto"
          sx={{ flexGrow: 1 }}
        >
          <Chip
            label={stars}
            icon={<StarBorderIcon />}
            variant="outlined"
            title={`Starred ${stars} times`}
          />
        </Typography>
        <IconButton
          onClick={onFavourited}
          aria-label="Favourite repository"
          title={isFavourited ? "Favourited" : "Favourite"}
          disabled={favouriteQuery.isPending || unFavouriteQuery.isPending}
        >
          {isFavourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};
