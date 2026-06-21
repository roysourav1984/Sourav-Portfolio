// Get the profile image URL with fallback to local SVG
export function getProfileImageUrl(blobUrl?: string | null) {
  return blobUrl || '/images/portrait.svg';
}
