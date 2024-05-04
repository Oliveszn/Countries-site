import React, { useState, useEffect } from "react";

const Home = () => {
  const BASE_URL = "https://restcountries.com/v3.1/name/";
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountryData = async function (country) {
      const response = await fetch(`${BASE_URL}/${country}`);
      const data = await response.json();
      console.log(data);
      setCountries(data);
    };
    getCountryData("nigeria");
  }, []);

  // <article class="country ${className}">
  //   <img class="country__img" src="${data.flag}" />
  //   <div class="country__data">
  //     <h3 class="country__name">${data.name}</h3>
  //     <h4 class="country__region">${data.region}</h4>
  //     <p class="country__row">
  //       <span>👫</span>${(+data.population / 1000000).toFixed(1)} people
  //     </p>
  //     <p class="country__row">
  //       <span>🗣️</span>${data.languages[0].name}
  //     </p>
  //     <p class="country__row">
  //       <span>💰</span>${data.currencies[0].name}
  //     </p>
  //   </div>
  // </article>;

  return (
    <div>
      <h1>List of Countries</h1>
      <ul>
        {countries.map((country) => (
          <article key={country.area} className="country ${className}">
            <img
              className="country__img"
              src={country.flags.png}
              alt="Country Flag"
            />
            <div className="country__data">
              <h3 className="country__name">{country.name.official}</h3>
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
      </ul>
    </div>
  );
};

export default Home;
