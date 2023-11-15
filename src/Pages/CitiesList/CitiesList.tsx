import "./CitiesList.sass"
import SearchBar from "./SearchBar/SearchBar";
import {useEffect, useState} from "react";
import CityCard from "./CityCard/CityCard";
import {iCitiesMock, requestTime} from "../../Consts";
import {City} from "../../Types";

const CitiesList = () => {

    const [cities, setCities] = useState<City[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchCities = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/cities/search?&name=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const cities: City[] = await response.json()

            setCities(cities)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setCities(iCitiesMock)

    }

    useEffect(() => {
        searchCities()
    }, [query])

    const cards = cities.map(city  => (
        <CityCard city={city} key={city.id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск городов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default CitiesList;