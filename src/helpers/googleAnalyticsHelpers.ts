import ReactGA4 from 'react-ga4';

export const handleGoogleAnayticsEvent = (category: string, action: string, label?: string): void => {
    ReactGA4.event({
        category: category,
        action: action,
        label: label
    })
}