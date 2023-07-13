import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { trophyImage } from "../assets";
import { ProductsCard } from "../components";
import { DomainExtractor } from "../components";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const app = useAppBridge();
  const { t } = useTranslation();

  const config = { apiKey: process.env.SHOPIFY_API_KEY, shopOrigin: params.shop};
  const [data, setData] = useState(null);
  const [storeUrl, setStoreUrl] = useState(null);

  useEffect(() => {
      getSessionToken(app)
      .then((token) => {
          axios.get(`https://${app.getState().shopOrigin}/admin/api/2023-07/shop.json`, {
          headers: {
              'X-Shopify-Access-Token': token,
          }
          })
          .then(response => {
              console.log('Shopify response:', response.data);
              setStoreUrl(response.data.shop.myshopify_domain);
          })
          .catch(error => console.log(error));
      });
  }, []);

  // You can replace this with your actual render code
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Store URL: {storeUrl}</p>
    </div>
  );
}
