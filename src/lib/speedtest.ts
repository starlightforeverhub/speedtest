export const measurePing = async () => {
  const startTime = Date.now();
  await fetch('/ping', { cache: 'no-store' });
  return Date.now() - startTime;
};

export const measureDownloadSpeed = async () => {
  const startTime = Date.now();
  const response = await fetch('/dummy.zip', { cache: 'no-store' });
  const blob = await response.blob();
  const endTime = Date.now();
  const durationInSeconds = (endTime - startTime) / 1000;
  const sizeInBits = blob.size * 8;
  const speedBps = sizeInBits / durationInSeconds;
  const speedMbps = speedBps / 1024 / 1024;
  return speedMbps;
};

export const measureUploadSpeed = async () => {
    const sizeInMB = 5;
    const sizeInBytes = sizeInMB * 1024 * 1024;
    const dummyData = new Blob([new ArrayBuffer(sizeInBytes)], { type: 'application/octet-stream' });
    const formData = new FormData();
    formData.append('file', dummyData);

    const startTime = Date.now();
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const endTime = Date.now();

    const durationInSeconds = (endTime - startTime) / 1000;
    const sizeInBits = sizeInBytes * 8;
    const speedBps = sizeInBits / durationInSeconds;
    const speedMbps = speedBps / 1024 / 1024;

    return speedMbps;
};

export const getGeoInfo = async () => {
  const response = await fetch('/api/geoip');
  const data = await response.json();
  return data;
};
