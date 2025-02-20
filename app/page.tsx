import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const LocationTimeline = () => {
  const [year, setYear] = useState(2010);
  
  // Sample data structure - you would replace this with your actual data
  const data = {
    2010: {
      'London': ['Alice', 'Bob'],
      'New York': ['Charlie'],
      'Tokyo': ['David', 'Eve']
    },
    2011: {
      'London': ['Alice'],
      'Paris': ['Bob', 'Charlie'],
      'Tokyo': ['David', 'Eve']
    },
    // Add more years...
  };

  // Get all unique cities across all years
  const allCities = [...new Set(
    Object.values(data).flatMap(yearData => Object.keys(yearData))
  )];

  // Country mapping for flag images
  const cityToCountry = {
    'London': 'gb',
    'Paris': 'fr',
    'New York': 'us',
    'Tokyo': 'jp'
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const yearRange = 15; // Total number of years
      const startYear = 2010;
      
      // Calculate current year based on scroll position
      const scrollPercentage = scrollPosition / maxScroll;
      const currentYear = Math.floor(startYear + (scrollPercentage * yearRange));
      
      setYear(Math.min(Math.max(currentYear, startYear), startYear + yearRange - 1));
    };

    window.addEventListener('scroll', handleScroll);
    
    // Create scroll space
    const spacer = document.createElement('div');
    spacer.style.height = '300vh'; // Makes the page scrollable
    document.body.appendChild(spacer);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeChild(spacer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white p-4">
      <Card className="p-4">
        <div className="text-2xl mb-4">Year: {year}</div>
        <div className="flex gap-8">
          {allCities.map(city => {
            const peopleInCity = data[year]?.[city] || [];
            if (peopleInCity.length === 0) return null;

            return (
              <div key={city} className="flex flex-col items-center">
                <img
                  src={`https://flagcdn.com/w40/${cityToCountry[city]}.png`}
                  alt={`${city} flag`}
                  className="mb-2 w-10 h-6"
                />
                <div className="font-bold mb-2">{city}</div>
                <div className="flex flex-col gap-1">
                  {peopleInCity.map(person => (
                    <div key={person} className="bg-blue-100 px-3 py-1 rounded">
                      {person}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default LocationTimeline;
