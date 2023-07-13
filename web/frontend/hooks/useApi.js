import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
          data: [
            {
                "language_name": "English (United States)",
                "location_name": "United States",
                "keyword": "rank checker",
                "target": "sleepfirstusa.com"
            }
        ],
          auth: {
            username: 'carlosblank985@gmail.com',
            password: '6792dfbaab5c9d31',
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useApi;
