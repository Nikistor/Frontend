import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {City} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import CityPage from "./Pages/CityPage/CityPage";
import CitiesList from "./Pages/CitiesList/CitiesList";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {

    const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)

    return (
        <BrowserRouter basename="/Frontend">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className={"content-wrapper"}>

                        <Breadcrumbs selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/cities" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/cities" element={<CitiesList />} />

                            <Route path="/cities/:id" element={<CityPage selectedCity={selectedCity} setSelectedCity={setSelectedCity} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
