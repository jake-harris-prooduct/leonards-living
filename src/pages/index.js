import { useState, useEffect } from 'react';
import Map from '../components/Map';
import YearSlider from '../components/YearSlider';
import { getLocation } from '../utils/data';

export default function Home() {
  const [year, setYear] = useState(1991);
  const [friendsData, setFriendsData] = useState(null);

  // Fetch the JSON data
  useEffect(() => {
    fetch('/living-data.json')
      .then((response) => response.json())
      .then((data) => setFriendsData(data.friends))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!friendsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Friends' Location History</h1>
      <YearSlider year={year} setYear={setYear} />
      <Map friendsData={friendsData} year={year} />
    </div>
  );
}
