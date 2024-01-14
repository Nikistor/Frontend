import "./VacanciesFilters.sass"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import {ADMIN_STATUSES, USER_STATUSES, variables} from "../../../utils/consts";
import {useAuth} from "../../../hooks/users/useAuth";
import {useVacancies} from "../../../hooks/vacancies/useVacancies";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import CustomButton from "../../../components/CustomButton/CustomButton";

const VacanciesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {status, setStatus, date_start, setDateStart, date_end, setDateEnd} = useVacancies()

    const handleSubmit = () => {
        refetch()
    }

    return (
        <div className="filters-wrapper">

            <div className="top-container">

                <h3>Список заказов</h3>

            </div>

            <div className="bottom-container">

                <CustomDatePicker placeholder="От" value={date_start} setValue={setDateStart}/>

                <CustomDatePicker placeholder="До" value={date_end} setValue={setDateEnd}/>

                <DropdownMenu
                    width={175}
                    options={is_moderator ? ADMIN_STATUSES : USER_STATUSES}
                    selectedOption={status}
                    setSelectedOption={(id) => {
                        setStatus(id)
                    }}
                />

                <CustomButton bg={variables.blue} onClick={handleSubmit}>
                    Применить
                </CustomButton>

            </div>

        </div>
    )
}

export default VacanciesFilters