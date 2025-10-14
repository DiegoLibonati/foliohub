import { RepoFlat } from "@src/entities/app";

interface DefaultProps {
  className?: string;
  children?: string;
}

export interface CardProfileProps {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  repos: RepoFlat[];
}

export interface SubTitleProps extends DefaultProps {
  id: string;
}

export interface ItemLinkRepoProps {
  name: string;
  href: string;
}
