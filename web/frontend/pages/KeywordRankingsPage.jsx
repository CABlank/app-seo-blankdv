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
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { Provider, useAppBridge } from '@shopify/app-bridge-react';
import { trophyImage } from "../assets";
import { ProductsCard } from "../components";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useEffect, useState } from 'react';
import axios from 'axios';
  
export default function HomePage() {
    const app = useAppBridge();
    const shopOrigin = app.getState().shopOrigin;


    const { t } = useTranslation();

    const [data, setData] = useState(null);
    const [storeUrl, setStoreUrl] = useState(null);

    useEffect(() => {
        getSessionToken(app)
        .then((token) => {


            axios.get(`https://${shopOrigin}/admin/api/2023-07/shop.json`, {
            headers: {
                'X-Shopify-Access-Token': token,
            }
            })

            .then(response => {
                console.log('Shopify response:', response.data);
                setStoreUrl(response.data.shop.myshopify_domain);
            })
            .catch(error => {
                console.log('Error:', error);
                console.error('Error fetching shop data:', error);
            });
        });
    }, [app]);

    
    useEffect(() => {
        if (storeUrl) {
            const keyword = 'shopify';

            axios({
                method: 'post',
                url: 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
                auth: {
                    username: process.env.REACT_APP_CLIENT_ID,
                    password: process.env.REACT_APP_CLIENT_SECRET
                },
                data: {
                    "priority": 1,
                    "language_code": "en",
                    "location_code": 2840,
                    "keywords": [keyword],
                    "domains": [storeUrl]
                }
            })
            .then(response => {
                console.log('DataForSEO response:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.log('Error:', error);
                console.error(error);
            });
        }
    }, [storeUrl]);

    console.log('Data:', data);
    console.log('Store URL:', storeUrl);


    return (
        <Page narrowWidth>
          <TitleBar title={t("HomePage.title")} primaryAction={null} />
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <Stack
                  wrap={false}
                  spacing="extraTight"
                  distribution="trailing"
                  alignment="center"
                >
                  <Stack.Item fill>
                    <TextContainer spacing="loose">
                      <Text as="h2" variant="headingMd">
                        {("HomePage.heading")}
                      </Text>
                      <p>
                        <Trans
                          i18nKey="HomePage.yourAppIsReadyToExplore"
                          components={{
                            PolarisLink: (
                              <Link url="https://polaris.shopify.com/" external />
                            ),
                            AdminApiLink: (
                              <Link
                                url="https://shopify.dev/api/admin-graphql"
                                external
                              />
                            ),
                            AppBridgeLink: (
                              <Link
                                url="https://shopify.dev/apps/tools/app-bridge"
                                external
                              />
                            ),
                          }}
                        />
                      </p>
                      <p>{t("HomePage.startPopulatingYourApp")}</p>
                      <p>
                        <Trans
                          i18nKey="HomePage.learnMore"
                          components={{
                            ShopifyTutorialLink: (
                              <Link
                                url="https://shopify.dev/apps/getting-started/add-functionality"
                                external
                              />
                            ),
                          }}
                        />
                      </p>
                    </TextContainer>
                  </Stack.Item>
                  <Stack.Item>
                    <div style={{ padding: "0 20px" }}>
                      <Image
                        source={trophyImage}
                        alt={t("HomePage.trophyAltText")}
                        width={120}
                      />
                    </div>
                  </Stack.Item>
                </Stack>
              </Card>
            </Layout.Section>
            <Layout.Section>
              <ProductsCard />
            </Layout.Section>
          </Layout>
        </Page>
      );
}