import { useEffect, useState } from 'react';
import { config } from '@src/config';

export const useLeagueNews = () => {
  const [leaguePatchNotes, setLeaguePatchNotes] = useState(null);

  useEffect(() => {
    const loadLeaguePatchNotes = async () => {
      try {
        const response = await fetch(`${config.api_url}/view/latest/patchnotes`);
        const data = await response.json();
        setLeaguePatchNotes(data?.patch_notes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadLeaguePatchNotes();
  }, []);

  return {
    leaguePatchNotes
  };
};