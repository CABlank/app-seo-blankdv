import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';

const DomainExtractor = () => {
  const location = useLocation();
  const app = useAppBridge();
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const shop = searchParams.get('shop');
    if (shop) {
      getSessionToken(app)
        .then((token) => {
          fetch(`https://${shop}/admin/api/2023-04/shop.json`, {
            headers: {
              'X-Shopify-Access-Token': token,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setDomain(data.shop.myshopify_domain);
            })
            .catch((error) => {
              console.error('Failed to fetch custom domain:', error);
            });
        });
    }
  }, [app, location.search]);

  return (
    <div>
      <h1>Store Domain</h1>
      <p>{domain}</p>
    </div>
  );
};

export default DomainExtractor;
