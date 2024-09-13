import React from 'react';


interface DisplayContentProps {
  content: string;
}

const DisplayContent: React.FC<DisplayContentProps> = ({ content }) => {
  return (
    <>
      {/* Render the saved HTML content */}
      <div className="prose max-w-none text-justify"  dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default DisplayContent;