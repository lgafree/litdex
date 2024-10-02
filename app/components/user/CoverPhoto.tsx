import React from 'react';

interface CoverPhotoProps {
  coverPhoto: string | null;
  baseImageUrl: string;
  openFullscreen: (imageUrl: string) => void;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ coverPhoto, baseImageUrl, openFullscreen }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (coverPhoto) {
        openFullscreen(`${baseImageUrl}/${coverPhoto}`);
      }
    }
  };

  return (
    <div
      className="w-full h-full bg-gray-300 cursor-pointer"
      onClick={() => coverPhoto && openFullscreen(`${baseImageUrl}/${coverPhoto}`)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {coverPhoto ? (
        <img 
          src={`${baseImageUrl}/${coverPhoto}`} 
          alt="Cover" 
          className="w-full h-full object-cover cursor-pointer" 
        />
      ) : null}
    </div>
  );
};

export default CoverPhoto;
