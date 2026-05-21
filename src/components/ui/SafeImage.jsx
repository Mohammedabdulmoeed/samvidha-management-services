import { useState } from 'react';
import { images } from '../../data/images';

export default function SafeImage({
  src,
  alt,
  className = '',
  fallback = images.office,
  loading = 'lazy',
  priority = false,
  width,
  height,
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
