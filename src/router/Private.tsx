import { Navigate, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";

function render(c: JSX.Element) {
    return c;
}
document.title = 'UMKT | SIKEMAS';
const Private = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    const hasSession : boolean = new Cookies().get('refresh') ? true : false;
    console.log(hasSession)
    const location = useLocation()

    return hasSession ? (
        <>{children}</>
      ) : (
        <Navigate
          replace={true}
          to="/login"
          state={{ from: `${location.pathname}${location.search}` }}
        />
      )
};

export default Private;