

'use client';
import { useEffect } from 'react';

export default function IgGallery() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup to avoid memory leaks
    };
  }, []);

  return (
    <div className='w-full'>
      <div className="elfsight-app-5d1ea7b0-b19b-409b-8a10-90bf8e8ccec1 my-20" data-elfsight-app-lazy></div>
    </div>
  );
}

