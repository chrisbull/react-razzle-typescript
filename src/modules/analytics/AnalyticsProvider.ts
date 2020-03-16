import React, { PropsWithChildren } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

function usePageViews() {
  const location = useLocation();
  React.useEffect(() => {
    ReactGA.send(['pageview', location.pathname]);
  }, [location]);
}

export const AnalyticsProvider = ({ children }: PropsWithChildren<any>) => {
  usePageViews();
  return children;
};
