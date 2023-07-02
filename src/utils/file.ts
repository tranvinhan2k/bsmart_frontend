export function createObjectUrl(data: any) {
  const binaryData = [];
  binaryData.push(data);

  return URL.createObjectURL(new Blob(binaryData, { type: 'image/png' }));
}
