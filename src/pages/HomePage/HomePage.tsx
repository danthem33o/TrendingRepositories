import styled from "styled-components";
import { RepositoryInfoCard } from "../../components/RepositoryInfoCard";
import { Page } from "../../components/Page";
import { useTrendingRepositories } from "../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useSetup } from "./hooks/useSetup";

const ScrollSection = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  height: 250px;
  overflow-x: auto;
  padding: 30px 20px;
`;

export const HomePage = () => {
  const query = useSetup();
  const { trending } = useTrendingRepositories();

  if (query.isLoading) {
    return <>...loading</>;
  }

  return (
    <Page>
      <h3>Trending repositories</h3>
      <ScrollSection>
        {trending.map((s) => (
          <RepositoryInfoCard
            key={s.id}
            name={s.name}
            githubLink={s.url}
            numberOfStars={s.stars}
            description={s.description}
          />
        ))}
      </ScrollSection>
    </Page>
  );
};
