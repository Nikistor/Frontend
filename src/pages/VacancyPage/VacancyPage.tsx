import {useEffect} from "react";
import {useVacancy} from "../../hooks/vacancies/useVacancy";
import {useNavigate, useParams} from "react-router-dom"
import CityCard from "../../components/CityCard/CityCard";
import "./VacancyPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import {pluralDeliveryDate} from "../../utils/plural";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

const VacancyPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {vacancy, name, setName, fetchVacancy, saveVacancy, sendVacancy, deleteVacancy, setVacancy} = useVacancy()

    useEffect(() => {
        id && fetchVacancy(id)
        
        return () => {
            setVacancy(undefined)
        };
    }, [])

    if (id == undefined || vacancy == undefined)
    {
        return (
            <div className="vacancy-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendVacancy = async() => {
        await sendVacancy()
        navigate("/vacancies")
    }

    const onDeleteVacancy = async () => {
        await deleteVacancy()
        navigate("/cities")
    }

    const cards = vacancy.cities.map(city  => (
        <CityCard city={city} key={city.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveVacancy} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendVacancy} bg={variables.blue}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteVacancy} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = vacancy.status == 1

    const completed = [3, 4].includes(vacancy.status)

    return (
        <div className="vacancy-page-wrapper">

            <div className="vacancy-cities-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая вакансия" : vacancy.name}</h3>
                </div>

                <div className="vacancy-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == vacancy.status).name}</span>
                    <span>Дата создания: {moment(vacancy.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(vacancy.status) && <span>Дата формирования: {moment(vacancy.date_of_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(vacancy.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Покупатель: {vacancy.owner.name}</span> }
                    {is_moderator && <span>Модератор: {vacancy.moderator.name}</span>}
                    {completed && <span>Дата доставки: {vacancy.delivery_date > 0 ? pluralDeliveryDate(vacancy.delivery_date) : "Нет"}</span>}
                </div>

                {is_draft &&
                    <div className="inputs-container">

                    <CustomInput placeholder={"Название вакансии"} value={name} setValue={setName}/>

                    </div>
                }


                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default VacancyPage