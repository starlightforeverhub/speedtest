'use client'

import { useState, useEffect } from 'react';
import { measurePing, measureDownloadSpeed, measureUploadSpeed, getGeoInfo } from '../lib/speedtest';

export default function Home() {
  const [ping, setPing] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [geoInfo, setGeoInfo] = useState({ query: '', city: '', country: '' });

  useEffect(() => {
    const fetchGeoInfo = async () => {
      const info = await getGeoInfo();
      setGeoInfo(info);
    };
    fetchGeoInfo();
  }, []);

  const handleStartTest = async () => {
    setIsTesting(true);
    setPing(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);

    const pingResult = await measurePing();
    setPing(pingResult);

    const downloadResult = await measureDownloadSpeed();
    setDownloadSpeed(downloadResult);

    const uploadResult = await measureUploadSpeed();
    setUploadSpeed(uploadResult);

    setIsTesting(false);
  };

  return (
    <main className="container">
      <h1 className="title">Network Speed Test</h1>
      <div className="results">
        <div className="result-item">
          <h2>Ping</h2>
          <p>{ping} ms</p>
        </div>
        <div className="result-item">
          <h2>Download</h2>
          <p>{downloadSpeed.toFixed(2)} Mbps</p>
        </div>
        <div className="result-item">
          <h2>Upload</h2>
          <p>{uploadSpeed.toFixed(2)} Mbps</p>
        </div>
      </div>
      <button className="start-button" onClick={handleStartTest} disabled={isTesting}>
        {isTesting ? 'Testing...' : 'Start Test'}
      </button>
      <div className="geo-info">
        <h2>Your Location</h2>
        <p>IP: {geoInfo.query}</p>
        <p>City: {geoInfo.city}</p>
        <p>Country: {geoInfo.country}</p>
      </div>
    </main>
  );
}
