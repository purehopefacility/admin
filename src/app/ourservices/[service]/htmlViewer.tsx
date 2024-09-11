import React from 'react';

interface DisplayContentProps {
  content: string;
}

const DisplayContent: React.FC<DisplayContentProps> = ({ content }) => {
  return (
    <div>
      <h2>Saved Content:</h2>
      {/* Render the saved HTML content */}
      <div dangerouslySetInnerHTML={{ __html: content }} className="prose"/>
    </div>
  );
};

export default DisplayContent;
