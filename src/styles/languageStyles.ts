import { ClassValue } from 'clsx';

export const programmingLangStyles = (language: string): ClassValue => ({
  'bg-[#3572A5]': language === 'Python' || language === 'Jupyter Notebook',
  'bg-[#b07219]': language === 'Java',
  'bg-[#f34b7d]': language === 'C++',
  'bg-[#f1e05a]': language === 'JavaScript',
  'bg-[#3178c6]': language === 'TypeScript',
});
