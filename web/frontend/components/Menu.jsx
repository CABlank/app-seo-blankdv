// web/frontend/components/Menu.jsx

import { NavigationMenu } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation();

  return (
    <NavigationMenu
      navigationLinks={[
        {
          label: t("NavigationMenu.pageName"),
          destination: "/pagename",
        },
        {
          label: "Keyword Rankings",
          destination: "/KeywordRankingsPage",
        },
        {
          label: "Organic Search Traffic",
          destination: "/OrganicSearchTrafficPage",
        },
        {
          label: "Backlink Analysis",
          destination: "/BacklinkAnalysisPage",
        },
        {
          label: "On-Page SEO Analysis",
          destination: "/OnPageSEOAnalysisPage",
        },
        {
          label: "Conversion Rate Optimization",
          destination: "/ConversionRateOptimizationPage",
        },
        {
          label: "Competitor Analysis",
          destination: "/CompetitorAnalysisPage",
        },
      ]}
    />
  );
}
