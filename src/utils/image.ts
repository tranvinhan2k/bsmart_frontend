import { image } from '~/constants/image';
import { ImagePayload } from '~/models/type';
import { ImageKeys } from '~/models/variables';

export function handleGetImageLink(images: ImagePayload[], type: ImageKeys) {
  return images.find((img) => img?.type === type)?.url || image.noAvatar;
}
