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

export interface RepositoryInfoCardProps {
  id: number;
  name: string;
  ownerName: string;
  githubLink: string;
  description: string;
  numberOfStars: number;
}

export const RepositoryInfoCard = ({
  id,
  name,
  ownerName,
  githubLink,
  numberOfStars,
  description,
}: RepositoryInfoCardProps) => {
  const {
    useFavouriteRepository,
    useUnfavouriteRepository,
    checkIsFavourited,
  } = useTrendingRepositories();

  const favouriteQuery = useFavouriteRepository(id);
  const unFavouriteQuery = useUnfavouriteRepository(id);

  const isFavourited = useMemo(
    () => checkIsFavourited(id),
    [checkIsFavourited, id]
  );

  const onFavourited = useCallback(() => {
    if (isFavourited) {
      unFavouriteQuery.mutate({ ownerName, repoName: name });
    } else {
      favouriteQuery.mutate({ ownerName, repoName: name });
    }
  }, [isFavourited, unFavouriteQuery, ownerName, name, favouriteQuery]);

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
            href={githubLink}
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
            label={numberOfStars}
            icon={<StarBorderIcon />}
            variant="outlined"
            title={`Starred ${numberOfStars} times`}
          />
        </Typography>
        <IconButton
          onClick={onFavourited}
          aria-label="Favourite repository"
          title="Favourite"
          disabled={favouriteQuery.isPending || unFavouriteQuery.isPending}
        >
          {isFavourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};
