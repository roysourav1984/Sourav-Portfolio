'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProfileImageUrl } from '@/lib/profile-image';

interface ProfileImageUploadProps {
  currentImageUrl?: string | null;
  onUploadSuccess?: (url: string) => void;
}

export function ProfileImageUpload({
  currentImageUrl,
  onUploadSuccess,
}: ProfileImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(
    getProfileImageUrl(currentImageUrl)
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/profile-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const { url } = await response.json();
      setImageUrl(url);
      onUploadSuccess?.(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt="Profile portrait"
          fill
          className="object-cover"
          priority
        />
      </div>

      <label className="block">
        <span className="sr-only">Upload profile image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50"
        />
      </label>

      {isLoading && <p className="text-sm text-gray-600">Uploading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
