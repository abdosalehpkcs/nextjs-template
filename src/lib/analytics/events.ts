/**
 * Analytics Event Definitions
 * @module analytics/events
 *
 * This file defines all trackable events in a type-safe manner.
 * Adding a new event here ensures compile-time safety across the codebase.
 *
 * HOW TO ADD A NEW EVENT:
 * 1. Add the event name to the AnalyticsEventName type
 * 2. Define the event parameters interface
 * 3. Add the event to the ANALYTICS_EVENTS registry
 * 4. Use trackEvent('your_event', params) in your component
 */

// ============================================================================
// EVENT PARAMETER INTERFACES
// ============================================================================

/** Base parameters included with all events */
export interface BaseEventParams {
  /** Optional custom timestamp */
  timestamp?: number;
  /** Optional page/screen where event occurred */
  page_location?: string;
}

/** UI Interaction Events */
export interface ButtonClickParams extends BaseEventParams {
  button_id: string;
  button_text?: string;
  section?: string;
}

export interface LinkClickParams extends BaseEventParams {
  link_url: string;
  link_text?: string;
  is_external?: boolean;
}

export interface NavigationParams extends BaseEventParams {
  from_page?: string;
  to_page: string;
  navigation_type?: 'menu' | 'breadcrumb' | 'footer' | 'internal_link';
}

/** Form Events */
export interface FormStartParams extends BaseEventParams {
  form_id: string;
  form_name?: string;
}

export interface FormSubmitParams extends BaseEventParams {
  form_id: string;
  form_name?: string;
  success: boolean;
  error_message?: string;
}

export interface FormFieldParams extends BaseEventParams {
  form_id: string;
  field_name: string;
  field_type?: string;
}

/** Commerce Events (GA4 Ecommerce) */
export interface ViewItemParams extends BaseEventParams {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  currency?: string;
}

export interface AddToCartParams extends BaseEventParams {
  item_id: string;
  item_name: string;
  quantity: number;
  price?: number;
  currency?: string;
}

export interface PurchaseParams extends BaseEventParams {
  transaction_id: string;
  value: number;
  currency: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    quantity: number;
    price: number;
  }>;
}

/** Lead Generation Events */
export interface ContactSubmitParams extends BaseEventParams {
  form_type: 'contact' | 'newsletter' | 'demo_request' | 'support';
  success: boolean;
  error_code?: string;
}

export interface SignupParams extends BaseEventParams {
  method: 'email' | 'google' | 'github' | 'other';
  success: boolean;
}

/** Engagement Events */
export interface ShareParams extends BaseEventParams {
  content_type: string;
  item_id?: string;
  method: 'copy_link' | 'twitter' | 'facebook' | 'linkedin' | 'email' | 'other';
}

export interface SearchParams extends BaseEventParams {
  search_term: string;
  results_count?: number;
}

export interface ScrollDepthParams extends BaseEventParams {
  percent_scrolled: 25 | 50 | 75 | 90 | 100;
  page_path: string;
}

/** Error Events */
export interface ErrorParams extends BaseEventParams {
  error_type: 'javascript' | 'api' | 'validation' | 'network' | 'unknown';
  error_message: string;
  error_code?: string;
  component?: string;
}

// ============================================================================
// EVENT NAME TYPES (Compile-time safety)
// ============================================================================

/**
 * All valid analytics event names.
 * This ensures no typos in event names across the codebase.
 */
export type AnalyticsEventName =
  // UI Events
  | 'button_click'
  | 'link_click'
  | 'navigation'
  // Form Events
  | 'form_start'
  | 'form_submit'
  | 'form_field_focus'
  | 'form_field_error'
  // Commerce Events
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  // Lead Events
  | 'contact_submit'
  | 'newsletter_signup'
  | 'demo_request'
  | 'signup'
  | 'login'
  // Engagement Events
  | 'share'
  | 'search'
  | 'scroll_depth'
  | 'video_start'
  | 'video_complete'
  | 'file_download'
  // Error Events
  | 'error'
  | 'exception';

// ============================================================================
// EVENT PARAMETER MAP (Type-safe event->params mapping)
// ============================================================================

/**
 * Maps event names to their parameter types.
 * This ensures trackEvent('button_click', params) has correct params type.
 */
export interface AnalyticsEventMap {
  // UI Events
  button_click: ButtonClickParams;
  link_click: LinkClickParams;
  navigation: NavigationParams;
  // Form Events
  form_start: FormStartParams;
  form_submit: FormSubmitParams;
  form_field_focus: FormFieldParams;
  form_field_error: FormFieldParams & { error_message: string };
  // Commerce Events
  view_item: ViewItemParams;
  add_to_cart: AddToCartParams;
  remove_from_cart: AddToCartParams;
  begin_checkout: BaseEventParams & { value?: number; currency?: string };
  purchase: PurchaseParams;
  // Lead Events
  contact_submit: ContactSubmitParams;
  newsletter_signup: ContactSubmitParams;
  demo_request: ContactSubmitParams;
  signup: SignupParams;
  login: SignupParams;
  // Engagement Events
  share: ShareParams;
  search: SearchParams;
  scroll_depth: ScrollDepthParams;
  video_start: BaseEventParams & { video_id: string; video_title?: string };
  video_complete: BaseEventParams & { video_id: string; video_title?: string };
  file_download: BaseEventParams & { file_name: string; file_type?: string };
  // Error Events
  error: ErrorParams;
  exception: ErrorParams;
}

// ============================================================================
// EVENT REGISTRY (Documentation & validation)
// ============================================================================

/**
 * Registry of all analytics events with metadata.
 * Used for documentation, validation, and debugging.
 */
export const ANALYTICS_EVENTS: Record<
  AnalyticsEventName,
  {
    name: AnalyticsEventName;
    description: string;
    category: 'ui' | 'form' | 'commerce' | 'lead' | 'engagement' | 'error';
    ga4Recommended?: boolean;
  }
> = {
  // UI Events
  button_click: {
    name: 'button_click',
    description: 'User clicked a button',
    category: 'ui',
  },
  link_click: {
    name: 'link_click',
    description: 'User clicked a link',
    category: 'ui',
  },
  navigation: {
    name: 'navigation',
    description: 'User navigated to a new page',
    category: 'ui',
  },
  // Form Events
  form_start: {
    name: 'form_start',
    description: 'User started interacting with a form',
    category: 'form',
  },
  form_submit: {
    name: 'form_submit',
    description: 'User submitted a form',
    category: 'form',
  },
  form_field_focus: {
    name: 'form_field_focus',
    description: 'User focused on a form field',
    category: 'form',
  },
  form_field_error: {
    name: 'form_field_error',
    description: 'Form field validation error occurred',
    category: 'form',
  },
  // Commerce Events (GA4 Recommended)
  view_item: {
    name: 'view_item',
    description: 'User viewed an item/product',
    category: 'commerce',
    ga4Recommended: true,
  },
  add_to_cart: {
    name: 'add_to_cart',
    description: 'User added item to cart',
    category: 'commerce',
    ga4Recommended: true,
  },
  remove_from_cart: {
    name: 'remove_from_cart',
    description: 'User removed item from cart',
    category: 'commerce',
    ga4Recommended: true,
  },
  begin_checkout: {
    name: 'begin_checkout',
    description: 'User started checkout process',
    category: 'commerce',
    ga4Recommended: true,
  },
  purchase: {
    name: 'purchase',
    description: 'User completed a purchase',
    category: 'commerce',
    ga4Recommended: true,
  },
  // Lead Events
  contact_submit: {
    name: 'contact_submit',
    description: 'User submitted contact form',
    category: 'lead',
  },
  newsletter_signup: {
    name: 'newsletter_signup',
    description: 'User signed up for newsletter',
    category: 'lead',
    ga4Recommended: true,
  },
  demo_request: {
    name: 'demo_request',
    description: 'User requested a demo',
    category: 'lead',
  },
  signup: {
    name: 'signup',
    description: 'User signed up for an account',
    category: 'lead',
    ga4Recommended: true,
  },
  login: {
    name: 'login',
    description: 'User logged in',
    category: 'lead',
    ga4Recommended: true,
  },
  // Engagement Events
  share: {
    name: 'share',
    description: 'User shared content',
    category: 'engagement',
    ga4Recommended: true,
  },
  search: {
    name: 'search',
    description: 'User performed a search',
    category: 'engagement',
    ga4Recommended: true,
  },
  scroll_depth: {
    name: 'scroll_depth',
    description: 'User scrolled to a certain depth',
    category: 'engagement',
  },
  video_start: {
    name: 'video_start',
    description: 'User started watching a video',
    category: 'engagement',
    ga4Recommended: true,
  },
  video_complete: {
    name: 'video_complete',
    description: 'User completed watching a video',
    category: 'engagement',
    ga4Recommended: true,
  },
  file_download: {
    name: 'file_download',
    description: 'User downloaded a file',
    category: 'engagement',
    ga4Recommended: true,
  },
  // Error Events
  error: {
    name: 'error',
    description: 'An error occurred',
    category: 'error',
  },
  exception: {
    name: 'exception',
    description: 'An exception was thrown',
    category: 'error',
    ga4Recommended: true,
  },
} as const;

/**
 * Helper to check if an event name is valid
 */
export function isValidEventName(name: string): name is AnalyticsEventName {
  return name in ANALYTICS_EVENTS;
}
