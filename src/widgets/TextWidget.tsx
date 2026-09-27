import React, { useState } from 'react';

interface TextWidgetProps {
  config: Record<string, unknown>;
  onUpdateConfig?: (config: Record<string, unknown>) => void;
  editMode?: boolean;
}

export const TextWidget: React.FC<TextWidgetProps> = ({ config, onUpdateConfig, editMode }) => {
  const [content, setContent] = useState((config.content as string) || '');

  const handleBlur = () => {
    onUpdateConfig?.({ content });
  };

  return (
    <div className="text-widget">
      {editMode ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          className="text-editor"
          placeholder="Type your notes here..."
        />
      ) : (
        <p className="text-content">{content || 'No content'}</p>
      )}
    </div>
  );
};
