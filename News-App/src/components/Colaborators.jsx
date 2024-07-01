// src/components/Colaborators.jsx
import React, { useEffect, useState } from 'react';

function Colaborators({ colaborator }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${colaborator}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [colaborator]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <a
      href={`https://github.com/${userData.login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
    >
      <img src={userData.avatar_url} alt={userData.login} className="w-8 h-8 rounded-full" />
      <span className="ml-2 text-gray-700 truncate max-w-xs">{userData.login}</span>
    </a>
  );
}

export default Colaborators;
