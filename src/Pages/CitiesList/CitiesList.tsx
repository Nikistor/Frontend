import "./CitiesList.sass"
import SearchBar from "./SearchBar/SearchBar";
import {useEffect, useState} from "react";
import CityCard from "./CityCard/CityCard";
import {iCitiesMock, requestTime} from "../../Consts";
import {City} from "../../Types";
import SearchBarMock from "./SearchBar/SearchMock.tsx";

const CitiesList = () => {

    const [cities, setCities] = useState<City[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchCities = async () => {

        try {

            const response = await fetch(`/api/cities/search/?&name=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const responseData  = await response.json();

            const cities: City[] = responseData.cities || [];

            setCities(cities)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setCities(iCitiesMock);

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                await searchCities();

            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        fetchData();

        return () => {

            const controller = new AbortController();
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
    }, [isMock]);

    const searchCitiesMock = (searchTerm: string) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const filteredCities = iCitiesMock.filter((city) =>
            city.name.toLowerCase().includes(searchTermLowerCase)
        );
        setCities(filteredCities);
    };


    const cards = cities.map(city  => (
        <CityCard city={city} key={city.id} isMock={isMock} />
    ))
    return (

        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск городов</h2>
                {isMock ? <SearchBarMock onSearch={searchCitiesMock}/> : <SearchBar query={query} setQuery={setQuery}  />}



            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default CitiesList;