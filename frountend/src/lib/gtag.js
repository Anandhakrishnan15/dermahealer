// lib/gtag.js
export const GA_MEASUREMENT_ID = process.env.GA_ID;

// Log pageviews
export const pageview = (url) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};

// Log specific events
export const event = ({ action, params }) => {
    window.gtag("event", action, params);
};
