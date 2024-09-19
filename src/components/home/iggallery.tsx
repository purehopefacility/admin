

'use client';
import { useEffect } from 'react';

export default function IgGallery() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s.electricblaze.com/widget.js";
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup to avoid memory leaks
    };
  }, []);

  return (
    <div className='w-full'>
      {/* <h1 className="text-3xl text-center font-bold my-10">Instagram Gallery</h1> */}
      <div className="electricblaze-id-2UhxDEy my-20" ></div>
      <style>{`
            .PIz4HixPF9mDMQqIRfcD {
              display: none !important;
            }
          `}</style>
    </div>
  );
}


