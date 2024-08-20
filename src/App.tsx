
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { useEffect } from 'react'


// CSS
// import './App.css'
// import './assets/css/argon-dashboard.css'
// import './assets/css/main.css'
// import './assets/css/nucleo-icons.css'
// import './assets/css/kanban/main.css'
// import './assets/css/tiakacss/index.css'

// Javascript
// import './assets/js/core/popper.min.js'
// import './assets/js/core/bootstrap.min.js'
// import './assets/js/plugins/perfect-scrollbar.min.js'
// import './assets/js/argon-dashboard.min.js'

// Config Component
import { BaseRoute } from "./router/RouterComponent";
import store from './redux/store'
import { Cookies } from "react-cookie";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <BaseRoute />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
