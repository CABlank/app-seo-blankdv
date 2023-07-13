import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

const DomainExtractor = () => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const query = queryString.parse(window.location.search);
    if (query.shop) {
      setDomain(query.shop);
    }
  }, []);

  return (
    <div>
      <h1>Store Domain</h1>
      <p>{domain}</p>
    </div>
  );
};

export default DomainExtractor;
