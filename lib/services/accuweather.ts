const ACCUWEATHER_API_KEY = 'ZwAy6erjJj2snOZ3QCxs8uDGxvZeYyMB';
const BASE_URL = 'http://dataservice.accuweather.com';

export interface CitySearchResult {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
  Country: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
}

export interface WeatherForecast {
  Headline: {
    Text: string;
    Category: string;
  };
  DailyForecasts: Array<{
    Date: string;
    Temperature: {
      Minimum: {
        Value: number;
        Unit: string;
      };
      Maximum: {
        Value: number;
        Unit: string;
      };
    };
    Day: {
      Icon: number;
      IconPhrase: string;
    };
    Night: {
      Icon: number;
      IconPhrase: string;
    };
  }>;
}

export async function searchCity(cityName: string): Promise<CitySearchResult[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${encodeURIComponent(cityName)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching for city:', error);
    throw error;
  }
}

export async function getWeatherForecast(locationKey: string, targetDate?: Date): Promise<WeatherForecast> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecasts/v1/daily/1day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

export async function getCityWeather(cityName: string, targetDate?: Date): Promise<{
  city: CitySearchResult;
  weather: WeatherForecast;
} | null> {
  try {
    const cities = await searchCity(cityName);
    
    if (cities.length === 0) {
      return null;
    }

    const city = cities[0];

    const weather = await getWeatherForecast(city.Key, targetDate);
    
    return {
      city,
      weather
    };
  } catch (error) {
    console.error('Error getting city weather:', error);
    throw error;
  }
} 