import "./CitiesList.sass"
import {useEffect} from "react";
import CityCard from "../../../components/CityCard/CityCard";
import {useCities} from "../../../hooks/cities/useCities";

const CitiesList = () => {

    const {cities, fetchCities} = useCities()

    useEffect(() => {
        fetchCities()
    }, [])

    const cards = cities.map(city  => (
        <CityCard city={city} key={city.id}/>
    ))

    return (
        <div className="cities-list">

            { cards }

        </div>
    )
}

export default CitiesList;