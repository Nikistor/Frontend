import "./CityPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iCitiesMock, requestTime} from "../../Consts";
import {City} from "../../Types";
import mockImage from "/src/assets/mock.png"

const CityPage = ({ selectedCity, setSelectedCity }: { selectedCity:City | undefined, setSelectedCity: Dispatch<City| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
            return () => {
        };
    }, [id]);

    if (id == undefined){
        return null;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`/api/cities/${id}/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const city: City = await response.json()

            setSelectedCity(city)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedCity(iCitiesMock.find((service:City) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/cities/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedCity?.name}</h2>

                    <br />

                    <span className="description">{selectedCity?.description}</span>

                    <br />

                    <span className="foundation_date">Год основания: {selectedCity?.foundation_date} г.</span>

                    <br />

                    <span className="grp">Население: {selectedCity?.grp} млн</span>

                    <br />

                    <span className="square">Площадь: {selectedCity?.square} км^2</span>

                    <br />

                    <span className="climate">Климат: {selectedCity?.climate}</span>

                </div>

            </div>

        </div>
    )
}

export default CityPage;