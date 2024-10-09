import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { FiLoader } from "react-icons/fi";

const Home = ({ onSearch }) => {
  const BASE_URL = "https://restcountries.com/v3.1/name";
  const [countries, setCountries] = useState([]);
  const [border, setBorder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getCountryData = async function (country) {
    setIsLoading(true);

    try {
      if (country) {
        const response = await fetch(`${BASE_URL}/${country}`);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }

        const data = await response.json();
        // Check if the response data contains any country information
        if (data.length === 0) {
          throw new Error("Country not found");
        }

        setCountries(data);

        ///country 2
        const neighbor = data[0].borders[0];
        if (neighbor) {
          const borderRes = await fetch(
            `https://restcountries.com/v3.1/alpha/${neighbor}`
          );
          const borderData = await borderRes.json();
          setBorder(borderData);
        }
      } else {
        setCountries([]);
        setBorder([]);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        setError("Internet connection error. Please check your connection.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountryData("");
  }, []);

  return (
    <div className="">
      <SearchInput onSearch={getCountryData} />
      {error && <div>{error}</div>}
      {!error && isLoading && (
        <div className="spinner">
          <FiLoader />
        </div>
      )}
      {!error && !isLoading && (
        <div className="countries">
          {countries.map((country) => (
            <article key={country.area} className="country">
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
      )}
    </div>
  );
};

export default Home;
