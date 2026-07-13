/// <reference types="vite/client" />
import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initAnalytics = () => {
  if (import.meta.env.PROD && MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string) => {
  if (import.meta.env.PROD && MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};
