import { Route, Routes, Outlet } from "react-router-dom";

//Layout Component
import { SidebarComponent } from "../Components/layout/SidebarComponent";

//Page
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Auth/Login";
import { Beasiswa } from "../Pages/Beasiswa/Beasiswa";
import { Organisasi } from "../Pages/Organisasi/Organisasi";
import Private from "./Private";
import { Kegiatan } from "../Pages/Organisasi/Kegiatan/Kegiatan";
import { Prestasi } from "../Pages/Prestasi/Prestasi";
import { Bimbingan } from "../Pages/Bimbingan/Bimbingan";
import { LaporanBimbingan } from "../Pages/Bimbingan/LaporanBimbingan";
import { ChartThreadsComponent } from "../Components/Chat/ChatThreadsComponent";
import {Periode} from "../Pages/Organisasi/Periode/Periode";

export const BaseRoute = () => {

    const LayoutDashboard = () => (
        <>
            <SidebarComponent>
                <div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </SidebarComponent>
            {/*<ChartThreadsComponent></ChartThreadsComponent>*/}
        </>
    )

    return (
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<LayoutDashboard />}>
                <Route path='/' element={(<Private><Home /></Private>)}></Route>
                <Route path='/organisasi' element={(<Private><Organisasi /></Private>)}/>
                <Route path='/organisasi/:organisasiId/kegiatan' element={(<Private><Kegiatan /></Private>)}/>
                <Route path='/organisasi/periode' element={(<Private><Periode /></Private>)}/>
                <Route path='/beasiswa' element={(<Private><Beasiswa /></Private>)}></Route>
                <Route path='/prestasi' element={(<Private><Prestasi /></Private>)}></Route>
                <Route path='/bimbingan' element={(<Private><Bimbingan /></Private>)}></Route>
                <Route path='/laporan-bimbingan' element={(<Private><LaporanBimbingan /></Private>)}></Route>
            </Route>
        </Routes>
    )

};