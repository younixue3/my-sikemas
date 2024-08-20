import { Link, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaSitemap, FaAward, FaTrophy } from "react-icons/fa";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import logo from '../../assets/logo.png'

export const SidebarComponent = ({children}:any) => {
    let cookies = new Cookies()
    let is_kaprodi = false
    function Is_kaprodi() {
        useEffect(() => {
            if (cookies.get('kaprodi')) {
                is_kaprodi = true
            } else {
                is_kaprodi = false
            }
        }, [cookies.get('kaprodi')])
    }
    let is_dosen = false
    let groups : any = new Array(cookies.get('groups'))
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    function logout_sso() {
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('refresh');
        cookies.remove('dosen');
        cookies.remove('groups');
        cookies.remove('kaprodi');

        navigate('/login');
    }

    // function Check_groups() {
    //     useEffect(() => {
    //         if (groups.filter((item:any) => item.name === 'Dosen' || item.name === 'Dosen Tetap')) {
    //             is_dosen = true
    //         } else {
    //             is_dosen = false
    //         }
    //     }, [cookies.get('groups')])
    // }

    const ToogleDrawer = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
    }, [toggle])

    Is_kaprodi()
    // Check_groups()

    const SidebarContent = () => {
        return <>{children}</>
    }

    return (
        <>
            <div className={toggle ? 'g-sidenav-show g-sidenav-pinned' : 'g-sidenav-show'}>
                <div className="min-height-300 bg-primary position-absolute w-100">
                </div>
                <aside
                    className="sidenav bg-white bg-body-tertiary fixed-top navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4"
                    id="sidenav-main" style={{zIndex:'10'}}>
                    <div className="sidenav-header">
                        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                            aria-hidden="true" id="iconSidenav"></i>

                        <Link to="/" className="nav-link h-100">
                            <img className="h-20 w-20 m-auto" src={logo}></img>
                            <span className="ms-1 font-weight-bold m-auto">SIKEMAS</span>
                        </Link>
                    </div>
                    <hr className="horizontal dark mt-0" />
                    <div className="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
                        <ul className="navbar-nav">
                        {cookies.get('dosen') === 'true' ?
                            <>
                            <li className="nav-item">
                                <Link to='/bimbingan' className="nav-link">
                                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                        <FaChalkboardTeacher className="text-primary text-sm opacity-10" />
                                    </div>
                                    <span className="nav-link-text ms-1">Bimbingan</span>
                                </Link>
                            </li>
                        {cookies.get('pegawai') === 'true' ? 
                        <></> 
                        : 
                        <>
                        <li className="nav-item">
                                <Link to='/laporan-bimbingan' className="nav-link">
                                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                        <FaChalkboardTeacher className="text-primary text-sm opacity-10" />
                                    </div>
                                    <span className="nav-link-text ms-1">Laporan Bimbingan</span>
                                </Link>
                            </li>
                        </>
                        }
                            {cookies.get('kaprodi') === 'true' ?
                                <>
                                    <li className="nav-item">
                                        <Link to='/laporan-bimbingan' className="nav-link">
                                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                <FaChalkboardTeacher className="text-primary text-sm opacity-10" />
                                            </div>
                                            <span className="nav-link-text ms-1">Laporan Bimbingan</span>
                                        </Link>
                                    </li>
                                </>
                                    :
                                <>
                                </> 
                                }
                            </> 
                            : 
                            <></>
                        }
                        {cookies.get('pegawai') === 'true' ? 
                        <>
                        <li className="nav-item">
                                            <Link to='/organisasi' className="nav-link">
                                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <FaSitemap className="text-primary text-sm opacity-10" />
                                                </div>
                                                <span className="nav-link-text ms-1">Organisasi</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/beasiswa' className="nav-link">
                                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <FaAward className="text-primary text-sm opacity-10" />
                                                </div>
                                                <span className="nav-link-text ms-1">Beasiswa</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/prestasi' className="nav-link">
                                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <FaTrophy className="text-primary text-sm opacity-10" />
                                                </div>
                                                <span className="nav-link-text ms-1">Prestasi</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/laporan-bimbingan' className="nav-link">
                                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <FaChalkboardTeacher className="text-primary text-sm opacity-10" />
                                                </div>
                                                <span className="nav-link-text ms-1">Laporan Bimbingan</span>
                                            </Link>
                                        </li>
                        </> 
                        :
                        <></>
                        }
                        </ul>
                    </div>
                </aside>
                
                <main className="main-content position-relative border-radius-lg p-3">
                    <div className="w-100" style={{display:"flex", width:"100%"}}>
                        <div className="w-100">
                            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl z-index-sticky"
                                id="navbarBlur" data-scroll="false">
                                <div className="container-fluid py-1 px-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                            <li className="breadcrumb-item text-sm">
                                                <a className="text-white" href="#">
                                                    <i className="ni ni-box-2"></i>
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item text-sm text-white"><a className="opacity-5 text-white"
                                                                                                href="#">Pages</a>
                                            </li>
                                            <li className="breadcrumb-item text-sm text-white active" aria-current="page">Default</li>
                                        </ol>
                                        <h6 className="font-weight-bolder mb-0 text-white">Default</h6>
                                    </nav>
                                    <div className="mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                                        <ul className="navbar-nav justify-content-end">
                                            <li className="nav-item d-flex align-items-center">
                                                {cookies.get('token') !== '' ? (
                                                    <>
                                                        <a href="/" className="nav-link text-white font-weight-bold px-0">
                                                            <i className="fa fa-user me-sm-1"></i>
                                                            <span
                                                                className="d-sm-inline d-none">{cookies.get('username') !== '' ? cookies.get('username') :
                                                                <p>Anonim</p>}</span>
                                                        </a>

                                                        <button onClick={logout_sso} className="btn btn-sm btn-danger ms-2 mt-3">
                                                            Logout
                                                        </button>
                                                    </>
                                                ) : (
                                                    <a href="/"
                                                    className="nav-link text-white font-weight-bold px-0">
                                                        <i className="fa fa-user me-sm-1"></i>
                                                        <span className="d-sm-inline d-none">login</span>
                                                    </a>
                                                )}
                                            </li>
                                            <li onClick={() => ToogleDrawer()} className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                                <a href="#" className="nav-link text-white p-0" id="iconNavbarSidenav">
                                                    <div className="sidenav-toggler-inner">
                                                        <i className="sidenav-toggler-line bg-white"></i>
                                                        <i className="sidenav-toggler-line bg-white"></i>
                                                        <i className="sidenav-toggler-line bg-white"></i>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="nav-item px-3 d-flex align-items-center">
                                                <a href="#" className="nav-link text-white p-0">
                                                    <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                                <a href="#" className="nav-link text-white p-0" id="dropdownMenuButton"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa fa-bell cursor-pointer"></i>
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
                                                    aria-labelledby="dropdownMenuButton">
                                                    <li className="mb-2">
                                                        <a className="dropdown-item border-radius-md" href="#">
                                                            <div className="d-flex py-1">
                                                                <div className="my-auto">
                                                                    <img src="" className="avatar avatar-sm me-3 " alt="user image"/>
                                                                </div>
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <h6 className="text-sm font-weight-normal mb-1">
                                                                        <span className="font-weight-bold">New message</span> from Laur
                                                                    </h6>
                                                                    <p className="text-xs text-secondary mb-0">
                                                                        <i className="fa fa-clock me-1"></i>
                                                                        13 minutes ago
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <SidebarContent />
                </main>
            </div>
        </>
    );
};
