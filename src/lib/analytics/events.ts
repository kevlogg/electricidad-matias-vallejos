// src/lib/analytics/events.ts

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | { event: 'click_cta'; location: string; target: string; text?: string }
  | { event: 'click_whatsapp'; location: string; service?: string }
  | { event: 'click_phone'; location: string }
  | { event: 'submit_quote_request'; service: string; urgency: string; zone?: string }
  | { event: 'view_service_detail'; service_id: string }
  | { event: 'click_review_link'; platform: string };

export const trackEvent = (payload: AnalyticsEvent): void => {
  if (typeof window !== 'undefined') {
    if (window.dataLayer) {
      window.dataLayer.push(payload);
    }
    // Also dispatch custom event for local monitoring or tag manager integrations
    window.dispatchEvent(new CustomEvent('mvelectricidad_analytics', { detail: payload }));
  }
};
