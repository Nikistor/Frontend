import "./CitiesPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import CitiesList from "./CitiesList/CitiesList";
import CitiesTableWrapper from "./CitiesTableWrapper/CitiesTableWrapper";

const CitiesPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="cities-wrapper">

            {/*{!is_moderator && <CitiesList />}*/}
            {/*{is_moderator && <CitiesTableWrapper />}*/}
            {<CitiesList />}

        </div>
    )
}

export default CitiesPage;