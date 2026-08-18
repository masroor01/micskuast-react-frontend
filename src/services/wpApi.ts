// Service for fetching WordPress data and providing mock fallback data from SQL backup

const WP_API_BASE = import.meta.env.VITE_WP_API_URL || 'https://micskuast.in/wp-json';

export interface WPPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  date: string;
  type: string;
}

export interface CommodityOutlook extends WPPost {
  marketingYear: string;
  googleDriveUrl: string;
  shortDescription: string;
}

// Mock database parsed from the sql backup for instant offline loading or development
const MOCK_OUTLOOKS: CommodityOutlook[] = [
  {
    id: 2715,
    title: 'Apple Outlook',
    slug: 'apple-outlook',
    content: '<p>Outlook report for Apple marketing, arrivals, prices and production trends for Jammu & Kashmir (2025-26).</p>',
    date: '2026-08-12',
    type: 'commodity_outlook',
    marketingYear: '2025-26',
    googleDriveUrl: 'https://drive.google.com/file/d/1jYC5YzApC7blX9b8TAyHcpYaWvW6eetM/view?usp=drive_link',
    shortDescription: 'Outlook report for Apple marketing, arrivals, prices and production trends in Jammu & Kashmir.'
  },
  {
    id: 2716,
    title: 'Cherry Outlook',
    slug: 'cherry-outlook',
    content: '<p>Outlook report for Cherry marketing, arrivals, prices and production trends for Kashmir valley (2025-26).</p>',
    date: '2026-06-15',
    type: 'commodity_outlook',
    marketingYear: '2025',
    googleDriveUrl: 'https://drive.google.com/file/d/1jYC5YzApC7blX9b8TAyHcpYaWvW6eetM/view?usp=drive_link', // reusing for demo
    shortDescription: 'Outlook report for Cherry marketing, arrivals, prices and production trends in Ganderbal & Srinagar.'
  }
];

const MOCK_PAGES: Record<string, WPPost> = {
  'publications': {
    id: 381,
    title: 'Publications',
    slug: 'publications',
    content: '<p>Welcome to the Publications Directory of the Market Intelligence Cell. Here you will find research papers, policy briefs, and market bulletins regarding J&K agriculture.</p>',
    date: '2025-05-13',
    type: 'page'
  },
  'vice-chancellors-message': {
    id: 382,
    title: "Vice Chancellor's Message",
    slug: 'vice-chancellors-message',
    content: '<p>SKUAST-K has been at the forefront of providing technological solutions to the farming community. The Market Intelligence Cell plays an essential role in bridging the gap between farmers, research, and markets through predictive price data and analysis.</p>',
    date: '2025-05-13',
    type: 'page'
  }
};

export const wpApi = {
  /**
   * Fetches pages from WordPress or falls back to local backup data.
   */
  async getPage(slug: string): Promise<WPPost> {
    try {
      const response = await fetch(`${WP_API_BASE}/wp/v2/pages?slug=${slug}`);
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          id: data[0].id,
          title: data[0].title.rendered,
          slug: data[0].slug,
          content: data[0].content.rendered,
          date: new Date(data[0].date).toLocaleDateString(),
          type: 'page'
        };
      }
      throw new Error('Page not found');
    } catch (e) {
      console.warn(`Failed fetching page slug "${slug}" from live WP. Falling back to SQL backup mock.`, e);
      if (MOCK_PAGES[slug]) {
        return MOCK_PAGES[slug];
      }
      return {
        id: 999,
        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        slug,
        content: `<p>This page "${slug}" is running headless. Content is managed in WordPress.</p>`,
        date: new Date().toLocaleDateString(),
        type: 'page'
      };
    }
  },

  /**
   * Fetches all commodity outlook reports.
   */
  async getCommodityOutlooks(): Promise<CommodityOutlook[]> {
    try {
      const response = await fetch(`${WP_API_BASE}/wp/v2/commodity_outlook`);
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      return data.map((item: any) => ({
        id: item.id,
        title: item.title.rendered,
        slug: item.slug,
        content: item.content.rendered,
        date: new Date(item.date).toLocaleDateString(),
        type: 'commodity_outlook',
        // ACF custom fields mapping (WordPress exposes them in the 'acf' key if ACF REST API is enabled)
        marketingYear: item.acf?.marketing_year || '2025-26',
        googleDriveUrl: item.acf?.google_drive_url || '#',
        shortDescription: item.acf?.short_description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || ''
      }));
    } catch (e) {
      console.warn('Failed fetching commodity_outlook from live WP. Falling back to SQL backup mock.', e);
      return MOCK_OUTLOOKS;
    }
  }
};
