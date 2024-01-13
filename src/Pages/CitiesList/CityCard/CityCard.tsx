import "./CityCard.sass"
import {City} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const CityCard = ({ city, isMock }: {city:City, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/cities/${city.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {city.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/cities/${city.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default CityCard;