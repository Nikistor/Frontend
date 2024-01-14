import "./CitiesPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import CitiesList from "./CitiesList/CitiesList";
import CitiesFilters from "./CitiesFilters/CitiesFilters";

const CitiesPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="cities-wrapper">

            <CitiesFilters />

            {!is_moderator && <CitiesList />}

        </div>
    )
}

export default CitiesPage;