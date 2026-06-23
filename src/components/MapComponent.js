'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet markers in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

export default function MapComponent() {
  const center = [19.0160, 72.8420]; // Mumbai (Dadar/Parel area)

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location */}
        <Marker position={center} icon={customIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
        
        {/* Safe Shelter */}
        <Marker position={[19.0200, 72.8400]} icon={greenIcon}>
          <Popup>
            <strong>BMC Relief Camp, Dadar</strong><br/>
            Safe Shelter - 250 beds available<br/>
            Food, Water & Medical Kits: Yes
          </Popup>
        </Marker>

        {/* Hazard Zone */}
        <Circle center={[19.0150, 72.8450]} pathOptions={{ color: 'red', fillColor: '#ef4444' }} radius={400}>
          <Popup>Hindmata Junction - Severe Waterlogging. Avoid Route.</Popup>
        </Circle>

        {/* Hospital */}
        <Marker position={[19.0050, 72.8400]} icon={customIcon}>
          <Popup>
            <strong>KEM Hospital, Parel</strong><br/>
            Emergency Triage Active<br/>
            Helpline: 102
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}
