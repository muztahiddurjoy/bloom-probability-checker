"use client"
import { LatLng } from '@/app/page';
import React, { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'

const MainContainer = () => {
    const [userLocation, setUserLocation] = useState<LatLng | null>(null);
    
    const map = useMap()


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }, []);

    useEffect(() => {
        if (userLocation) {
          map.setView(userLocation, 13);
          localStorage.setItem('lastLat', userLocation.lat.toString());
          localStorage.setItem('lastLng', userLocation.lng.toString());
        }

    }, [userLocation])


    
  return (
    <div>MainContainer</div>
  )
}

export default MainContainer