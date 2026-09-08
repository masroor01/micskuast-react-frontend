let cachedConfig: any = null;
let fetchPromise: Promise<any> | null = null;

export const getCachedConfig = async (): Promise<any> => {
  if (cachedConfig) return cachedConfig;
  if (!fetchPromise) {
    fetchPromise = fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        cachedConfig = data;
        fetchPromise = null;
        return data;
      })
      .catch(err => {
        console.error("Failed to load config.php:", err);
        fetchPromise = null;
        return null;
      });
  }
  return fetchPromise;
};

export const getCachedConfigSync = (): any => {
  return cachedConfig;
};

export const setCachedConfig = (data: any) => {
  cachedConfig = data;
};

// Auto-fetch once on load and invalidate on update
if (typeof window !== 'undefined') {
  getCachedConfig();

  window.addEventListener('config-updated', () => {
    cachedConfig = null;
    getCachedConfig().then(() => {
      window.dispatchEvent(new Event('config-cache-refreshed'));
    });
  });
}