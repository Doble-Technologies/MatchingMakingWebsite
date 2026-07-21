import { useEffect, useState } from 'react';
import { config } from '@src/config';

export const useNews = () => {
  const [news, setNews] = useState(null);

  const getNewsTimestamp = (item) => {
    const rawTimestamp = item?.publishedAt;
    const parsedTimestamp = new Date(rawTimestamp).getTime();
    return Number.isNaN(parsedTimestamp) ? 0 : parsedTimestamp;
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(`${config.api_url}/view/latest/patches`);
        const data = await response.json();
        const orderedNews = data?.riot_news?.sort((a, b) => {
          return getNewsTimestamp(b) - getNewsTimestamp(a);
        });
        setNews(orderedNews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadNews();
  }, []);

  return {
    news,
    getNewsTimestamp
  };
};