import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";

const Home = ({ onSearch }) => {
  const BASE_URL = "https://restcountries.com/v3.1/name/";
  const [countries, setCountries] = useState([]);
  const [border, setBorder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getCountryData = async function (country) {
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/${country}`);
      const data = await response.json();
      setCountries(data);

      ///country 2
      const neighbor = data[0].borders[0];
      if (!neighbor) return;
      const borderRes = await fetch(
        `https://restcountries.com/v3.1/alpha/${neighbor}`
      );
      const borderData = await borderRes.json();
      setBorder(borderData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountryData("nigeria");
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong, Please try again</div>;
  }

  return (
    <div className="count">
      <SearchInput onSearch={getCountryData} />
      {countries.map((country) => (
        <article key={country.area} className="country ${className}">
          <img
            className="country__img"
            src={country.flags.png}
            alt="Country Flag"
          />
          <div className="country__data">
            <h3 className="country__name">{country.name.common}</h3>
            <h4 className="country__region">{country.region}</h4>
            <p className="country__row">
              <span>©</span>
              {country.capital}
            </p>
            <p className="country__row">
              <span>👫</span>
              {(+country.population / 1000000).toFixed(1)} people
            </p>

            <p className="country__row">
              <span>🗺</span>
              {country.subregion}
            </p>
          </div>
        </article>
      ))}

      {border.map((border) => (
        <article key={border.area} className="neighbour">
          <img
            className="country__img"
            src={border.flags.png}
            alt="Bordering Country Flag"
          />
          <div className="country__data">
            <h3 className="country__name">{border.name.common}</h3>
            <h4 className="country__region">{border.region}</h4>
            <p className="country__row">
              <span>©</span>
              {border.capital}
            </p>
            <p className="country__row">
              <span>👫</span>
              {(+border.population / 1000000).toFixed(1)} people
            </p>
            <p className="country__row">
              <span>🗺</span>
              {border.subregion}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Home;
