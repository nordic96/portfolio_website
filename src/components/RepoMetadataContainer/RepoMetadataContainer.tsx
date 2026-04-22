import { programmingLangStyles } from '@/src/styles';
import { RepoMetadataResponse } from '@/src/types';
import { cn } from '@/src/utils';
import { StarBorder } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

interface RepoMetadataContainerProps {
  url: string;
}

export default function RepoMetadataContainer(
  props: RepoMetadataContainerProps,
) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [starCount, setStarCount] = useState(0);
  const { url } = props;

  useEffect(() => {
    const repoUrl = new URL(url);
    const paths = repoUrl.pathname.split('/');
    const repoName = paths[paths.length - 1];
    const fetchLanguage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/repo-metadata/${repoName}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok || response.status !== 200) {
          throw new Error('Server Error');
        }
        const { data }: RepoMetadataResponse = await response.json();
        if (data.language) {
          const keys = Object.keys(data.language);
          keys.sort((x, y) => data.language[y] - data.language[x]);
          if (keys.length > 0) {
            setLanguage(keys[0]);
          }
        }
        if (data.stargazer_count) {
          setStarCount(data.stargazer_count);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLanguage();

    return () => {
      setError(false);
      setLoading(false);
      setLanguage('');
    };
  }, [url]);

  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton variant={'text'} width={'100%'} />;
  }

  return (
    <div className={'flex justify-between items-center text-sm'}>
      {/** Language */}
      <div className={'flex gap-1 items-center'}>
        <div
          className={cn(
            'w-3 h-3 rounded-full',
            programmingLangStyles(language),
          )}
        ></div>
        <span>{language}</span>
      </div>
      {/** Star */}
      <div className={'flex gap-1 items-center'}>
        <StarBorder fontSize={'small'} />
        <span>{starCount}</span>
      </div>
    </div>
  );
}
