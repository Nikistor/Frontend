import "./CitiesFilters.sass"
import SearchBar from "../../../SearchBar/SearchBar";
import {useCities} from "../../../hooks/cities/useCities";

const CitiesFilters = () => {

    const {query, setQuery, fetchCities} = useCities()

    const handleSubmit = () => fetchCities()

    return (
        <div className="cities-filters">

            <h2>Поиск городов</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default CitiesFilters