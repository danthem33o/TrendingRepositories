export type RepositoryOwner = {
  name: string;
};

export type Repository = {
  id: number;
  name: string;
  url: string;
  description: string;
  stars: number;
  createdAt: string;
  owner: RepositoryOwner;
};
