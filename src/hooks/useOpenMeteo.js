import {useState, useCallback, useEffect} from 'react'

const useOpenMeteo = (latitude, longitude) => {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';
    const timezone = 'Europe/London';
    const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min'];

    const hourlyVars = ['temperature_2m', 'weathercode'];
    const [meteoData, setMeteoData] = useState(null);

  const getMeteoData = useCallback(() => {
    fetch(
      `${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(
        ','
      )}&daily=${dailyVars.join(',')}&timezone=${timezone}`
    )
      .then((res) => res.json())
      .then((data) => setMeteoData({ ...data, timestamp: timestampToHours(Date.now()) }));
    console.log(meteoData);
  }, [latitude, longitude]);

  useEffect(() => {
    getMeteoData();
    const timer = setInterval(getMeteoData, 10000);
    return () => clearInterval(timer);
  }, [getMeteoData]);


  const timestampToHours = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return [meteoData, getMeteoData];
}
export default useOpenMeteo