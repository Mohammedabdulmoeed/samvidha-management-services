import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Samvidha Management Services`
      : 'Samvidha Management Services | Facility & Maintenance Solutions';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
