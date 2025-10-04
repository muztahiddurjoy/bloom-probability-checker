"use client"
import { LatLng } from '@/app/page';
import React, { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import { Button } from './ui/button';
import { Loader2, Locate } from 'lucide-react';

const MainContainer = () => {
    const [userLocation, setUserLocation] = useState<LatLng | null>(null);
    const [locating, setlocating] = useState<boolean>(false)
    const map = useMap()


    useEffect(() => {
        handleLocateMe();
      }, []);

    const handleLocateMe = () => {
        setlocating(true)
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                setlocating(false)
                return;
            }
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const newLocation = { lat: latitude, lng: longitude };
              setUserLocation(newLocation);
              map.setView(newLocation, 30);
              localStorage.setItem('lastLat', newLocation.lat.toString());
              localStorage.setItem('lastLng', newLocation.lng.toString());
              setlocating(false);
            },
            (error) => {
              console.error("Error getting user location:", error);
              setlocating(false);
            }
          );
    }


    
  return (
    <div>
        <Button disabled={locating} onClick={handleLocateMe} className='absolute z-50 -bottom-5 right-2' size="icon">
            {locating ? <Loader2 size={15} className='animate-spin'/> : <Locate size={15}/>}</Button>
    </div>
  )
}

export default MainContainer