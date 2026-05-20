import { useState } from 'react';
import { images } from '../../data/images';

export default function SafeImage({ src, alt, className = '', fallback = images.placeholder }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
