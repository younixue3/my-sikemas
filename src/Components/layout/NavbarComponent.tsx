import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

export const NavbarComponent = () => {
    const cookies = new Cookies();
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

    return (
        <div className="w-100">
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl z-index-sticky w-100"
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
                    <div className="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
                        <a href="#" className="nav-link p-0">
                            <div className="sidenav-toggler-inner">
                                <i className="sidenav-toggler-line bg-white"></i>
                                <i className="sidenav-toggler-line bg-white"></i>
                                <i className="sidenav-toggler-line bg-white"></i>
                            </div>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            <div className="input-group">
                                <span className="input-group-text text-body"><i className="fas fa-search"
                                                                                aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Type here..."/>
                            </div>
                        </div>
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
                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
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
    );
};