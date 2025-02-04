import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleUserLocationInformationQuery } from '../app/fetchers/location/locationApi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

                // Add marker
                L.marker([latitude, longitude])
                    .addTo(mapInstanceRef.current)
                    .bindPopup('User Location')
                    .openPopup();
            }
        }
    }, [data]);

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
