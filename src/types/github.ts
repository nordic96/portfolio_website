export type LanguageData = Record<string, number>;

export interface RepoMetadataResponse {
  data: {
    language: LanguageData;
    stargazer_count: number;
  };
}
