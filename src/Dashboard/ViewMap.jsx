import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleUserLocationInformationQuery } from '../app/fetchers/location/locationApi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

function ViewMap() {
    const param = useParams();
    const id = param.id;
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null); // Prevent multiple map initializations

    const { data, isLoading, isError } = useGetSingleUserLocationInformationQuery(id);

    useEffect(() => {
        if (data && data.data?.latitude && data.data?.longitude) {
            const { latitude, longitude } = data.data;

            if (!mapInstanceRef.current) {
                // Initialize map
                mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 13);

                // Add OpenStreetMap tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(mapInstanceRef.current)

                const markerIcon = L.icon({
                    iconUrl: markerIconPng,
                    shadowUrl: markerShadowPng,
                    iconSize: [25, 41], // Default Leaflet icon size
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                });

                // Add marker
                L.marker([latitude, longitude], { icon: markerIcon })
                    .addTo(mapInstanceRef.current)
                    .bindPopup('User Location')
                    .openPopup();
            }
        }
    }, [data, mapRef]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading location data.</p>;

    return (
        <div>
            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '500px',
                    marginTop: '20px',
                }}
            ></div>
        </div>
    );
}

export default ViewMap;
