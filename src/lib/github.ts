import { LanguageData } from '../types';

const PAT_TOKEN = process.env.GITHUB_PAT || '';
const GH_HEADERS: HeadersInit = {
  Authorization: `Bearer ${PAT_TOKEN}`,
  'Content-Type': 'application/json',
  'X-Github-Api-Version': '2026-03-10',
};
async function fetchRepoLanguage(repo_name: string): Promise<LanguageData> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/nordic96/${repo_name}/languages`,
      { headers: GH_HEADERS },
    );
    if (response.ok && response.status === 200) {
      return await response.json();
    }
    throw new Error('Server Error');
  } catch (e) {
    throw e;
  }
}

async function fetchRepoMetadata(repo_name: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/nordic96/${repo_name}`,
      { headers: GH_HEADERS },
    );
    if (response.ok && response.status === 200) {
      const data = await response.json();
      if (data && data.stargazers_count) {
        return data.stargazers_count as number;
      }
    }
    throw new Error('Server Error or Data Not Found');
  } catch (e) {
    throw e;
  }
}

interface RepoMetadataResponse {
  data: {
    language: LanguageData;
    stargazer_count: number;
  };
}
export async function prepareRepoMetadata(
  repo_name: string,
): Promise<RepoMetadataResponse> {
  try {
    const arr = await Promise.all([
      fetchRepoLanguage(repo_name),
      fetchRepoMetadata(repo_name),
    ]);
    if (!arr[0] || typeof arr[1] !== 'number') {
      throw new Error('Invalid Type');
    }
    const preparedData: RepoMetadataResponse = {
      data: {
        language: arr[0],
        stargazer_count: arr[1],
      },
    };
    return preparedData;
  } catch (e) {
    throw e;
  }
}
