import {useDispatch, useSelector} from 'react-redux';
import {
	updateCity
} from "../../store/cities/citySlice";
import {api} from "../../utils/api";

export function useCity() {
	const city = useSelector(state => state.city.city);

	const dispatch = useDispatch()
	const setCity = (value) => {
		dispatch(updateCity(value))
	}

	const fetchCity = async (id) => {

		const {data} = await api.get(`cities/${id}`);

		setCity(data)

	};

	return {
		city,
		setCity,
		fetchCity
	};
}