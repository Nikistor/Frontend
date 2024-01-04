import "./CityCard.sass"
import {City} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useVacancy} from "../../hooks/vacancies/useVacancy";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const CityCard = ({ city }: {city:City}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {vacancy, is_draft, addCityToVacancy, deleteCityFromVacancy} = useVacancy()

    const handleAddCity = (e) => {
        e.preventDefault()
        addCityToVacancy(city)
    }

    const handleDeleteCity = (e) => {
        deleteCityFromVacancy(city)
    }

    const is_chosen = vacancy?.cities.find(g => g.id == city.id)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={city.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {city.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/cities/${city.id}`}>
                        <CustomButton bg={variables.blue}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("cities") &&
                        <CustomButton onClick={handleAddCity} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("cities") &&
                        <CustomButton onClick={handleDeleteCity} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("vacancies") &&
                        <CustomButton onClick={handleDeleteCity} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default CityCard;