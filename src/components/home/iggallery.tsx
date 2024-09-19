'use client';
import { useEffect } from 'react';

export default function IgGallery() {
  useEffect(() => {
    // Add the script for the widget
    const script = document.createElement('script');
    script.src = "https://s.electricblaze.com/widget.js";
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);

    // Add the style dynamically to hide the specific class
    const style = document.createElement('style');
    style.innerHTML = `.PIz4HixPF9mDMQqIRfcD { display: none !important; }`;
    document.head.appendChild(style);

    // Cleanup to avoid memory leaks
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className='w-full'>
      {/* <h1 className="text-3xl text-center font-bold my-10">Instagram Gallery</h1> */}
      <div className="electricblaze-id-2UhxDEy my-20"></div>
    </div>
  );
}



