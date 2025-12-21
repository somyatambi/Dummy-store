'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageZoomModal from './ImageZoomModal';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const openZoom = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div 
          className="relative aspect-square rounded-lg overflow-hidden bg-secondary cursor-zoom-in group"
          onClick={() => openZoom(selectedImageIndex)}
        >
          <Image
            src={images[selectedImageIndex] || '/placeholder.jpg'}
            alt={productName}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full text-sm font-medium">
              Click to zoom
            </div>
          </div>
        </div>
        
        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden bg-secondary cursor-pointer transition-all ${
                  index === selectedImageIndex
                    ? 'ring-2 ring-accent'
                    : 'hover:opacity-75'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 15vw"
                  loading="lazy"
                  quality={75}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <ImageZoomModal
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </>
  );
}
