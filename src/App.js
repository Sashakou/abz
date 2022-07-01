import React, { useEffect, useState, lazy, Suspense } from 'react';
import './App.scss';
import Header from "./components/Header/Header";
//import CardsBlock from "./components/CardsBlock/CardsBlock";
import store from './redux/redux-store';
import { Provider } from 'react-redux';
//import FormBlockContainer from "./components/FormBlock/FormBlockContainer";
import * as axios from "axios";
import Alert from "./components/Alert/Alert";
const CardsBlockLazy = lazy(() => import("./components/CardsBlock/CardsBlock"));
const FormBlockContainerLazy = lazy(() => import("./components/FormBlock/FormBlockContainer"));

function App() {
    const [alert, setAlert] = useState({});
    const [users, setUsers] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [url, setUrl] = useState('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6');
    const GetUsers= (firstPage) => {
        let urlGet = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';
        if(firstPage === undefined) urlGet = url;
        axios.get(
            urlGet,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                setUsers(response.data.users)

                if(response.data.total_pages === response.data.page){
                    setBtnDisabled(true);
                }else{
                    setUrl(response.data.links.next_url);
                }
            })
            .catch((error) => {
                onShowAlert('error', error.response.data.message);
            });
    }
    let onCloseAlert = () => {
        setAlert({
            type: "",
            text: "",
            show: false
        });
    }
    let onShowAlert = (type, text) => {
        setAlert({
            type: type,
            text: text,
            show: true
        });
    }
    const renderLoader = () => {
        return(
            <div className="coverPreloader">
                <div className="preloader">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 2.4C24 1.07452 25.0772 -0.0124356 26.3961 0.119892C30.2962 0.511212 34.0543 1.85353 37.3337 4.04473C41.2805 6.68189 44.3566 10.4302 46.1731 14.8156C47.9896 19.201 48.4649 24.0266 47.5388 28.6822C46.6128 33.3377 44.327 37.6141 40.9706 40.9706C37.6141 44.327 33.3377 46.6128 28.6822 47.5388C24.0266 48.4649 19.201 47.9896 14.8156 46.1731C10.4302 44.3566 6.68188 41.2805 4.04473 37.3337C1.85353 34.0543 0.511211 30.2963 0.119892 26.3961C-0.0124351 25.0772 1.07452 24 2.4 24C3.72548 24 4.78454 25.0787 4.9498 26.3938C5.32038 29.343 6.37231 32.1774 8.03578 34.6669C10.1455 37.8244 13.1441 40.2853 16.6525 41.7385C20.1608 43.1917 24.0213 43.5719 27.7457 42.8311C31.4702 42.0902 34.8913 40.2616 37.5765 37.5765C40.2616 34.8913 42.0902 31.4702 42.8311 27.7457C43.5719 24.0213 43.1917 20.1608 41.7385 16.6525C40.2853 13.1441 37.8244 10.1455 34.667 8.03578C32.1774 6.37231 29.343 5.32039 26.3938 4.9498C25.0787 4.78454 24 3.72548 24 2.4Z" fill="#00BDD3"/></svg>
                </div>
            </div>
        )
    };
  return (
    <Provider store={store}>
      <Header/>
      <main>
        <section className="backgroundBlock">
          <h1>Test assignment for front-end developer</h1>
          <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
            understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
            should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
          <a href="#singUp" className="btn_custom btnYellow">Sign up</a>
        </section>
          <Suspense fallback={renderLoader()}>
              <CardsBlockLazy GetUsers={GetUsers} users={users} btnDisabled={btnDisabled}/>
              <FormBlockContainerLazy GetUsers={GetUsers}/>
          </Suspense>
        {/*<CardsBlock GetUsers={GetUsers} users={users} btnDisabled={btnDisabled}/>*/}
        {/*<FormBlockContainer GetUsers={GetUsers}/>*/}
        <Alert alert={alert} close={onCloseAlert}/>
      </main>
    </Provider>
  );
}

export default App;
