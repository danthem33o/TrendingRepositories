import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useTrendingRepositories } from "../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useCallback, useMemo } from "react";

export interface RepositoryInfoCardProps {
  id: number;
  name: string;
  ownerName: string;
  githubLink: string;
  description: string;
  numberOfStars: number;
}

const Border = styled.div`
  border-radius: 5px;
  width: 300px;
  height: 200px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 18px;
  color: #252525ff;
  box-shadow: 0px 10px 15px lightgrey;
`;

const Header = styled.h3`
  display: flex;
  flex-grow: 1;
  margin: 0;
  height: 50px;

  & span:first-child {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & span:last-child {
    width: 30px;
    text-align: right;
    color: gray;
    text-decoration: none;
  }

  & span:last-child a {
    color: gray;
    text-decoration: none;
  }
`;

const Body = styled.p`
  flex-grow: 1;
  margin: 0;
  height: 100px;
`;

const Footer = styled.div`
  display: flex;
`;

const FooterItem = styled.div`
  flex-grow: 1;
  text-align: center;
  font-weight: 600;
  & p {
    margin: 5px 0;
    color: #2da0fdff;
  }
`;

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
    <Border aria-label="Repository information">
      <Header>
        <span title={name}>{name}</span>
        <span>
          <a
            aria-label="Repository link"
            href={githubLink}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLink} />
          </a>
        </span>
      </Header>
      <Body>{description}</Body>
      <Footer>
        <FooterItem>
          {numberOfStars}
          <p>Stars</p>
        </FooterItem>
        <FooterItem>
          <button
            onClick={onFavourited}
            aria-label="Favourite repository"
            disabled={favouriteQuery.isPending || unFavouriteQuery.isPending}
          >
            {isFavourited ? "Favourited" : "Favourite"}
          </button>
        </FooterItem>
      </Footer>
    </Border>
  );
};
