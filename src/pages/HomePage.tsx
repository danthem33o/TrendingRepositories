import styled from "styled-components";
import { RepositoryInfoCard } from "../components/RepositoryInfoCard";
import { useTrendingRepositoriesQuery } from "../queries/useTrendingRepositoriesQuery";
import { Page } from "../components/Page";

const ScrollSection = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  height: 250px;
  overflow-x: auto;
  padding: 30px 20px;
`;

export const HomePage = () => {
  const query = useTrendingRepositoriesQuery();

  if (query.isLoading) {
    return <>...loading</>;
  }

  return (
    <Page>
      <h3>Trending repositories</h3>
      <ScrollSection>
        {query.data?.data.items.map((s) => (
          <RepositoryInfoCard
            key={s.id}
            name={s.name}
            githubLink={s.html_url}
            numberOfStars={s.stargazers_count}
            description={s.description}
          />
        ))}
      </ScrollSection>
    </Page>
  );
};
