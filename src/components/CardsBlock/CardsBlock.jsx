import React, { useEffect, useState } from 'react';
import * as axios from "axios";


function CardsBlock(props) {
    //console.log(props);
    //console.log(props.users);
    //console.log(props.users.length);
    useEffect(() => {
        // code to run on component mount
        props.GetUsers();
    }, [])
    return (
        <section className="cardsBlock" id="user">
            <h2>Working with GET request</h2>
            {
                props.users.length === 0
                    ? <div className="coverPreloader">
                        <div className="preloader">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 2.4C24 1.07452 25.0772 -0.0124356 26.3961 0.119892C30.2962 0.511212 34.0543 1.85353 37.3337 4.04473C41.2805 6.68189 44.3566 10.4302 46.1731 14.8156C47.9896 19.201 48.4649 24.0266 47.5388 28.6822C46.6128 33.3377 44.327 37.6141 40.9706 40.9706C37.6141 44.327 33.3377 46.6128 28.6822 47.5388C24.0266 48.4649 19.201 47.9896 14.8156 46.1731C10.4302 44.3566 6.68188 41.2805 4.04473 37.3337C1.85353 34.0543 0.511211 30.2963 0.119892 26.3961C-0.0124351 25.0772 1.07452 24 2.4 24C3.72548 24 4.78454 25.0787 4.9498 26.3938C5.32038 29.343 6.37231 32.1774 8.03578 34.6669C10.1455 37.8244 13.1441 40.2853 16.6525 41.7385C20.1608 43.1917 24.0213 43.5719 27.7457 42.8311C31.4702 42.0902 34.8913 40.2616 37.5765 37.5765C40.2616 34.8913 42.0902 31.4702 42.8311 27.7457C43.5719 24.0213 43.1917 20.1608 41.7385 16.6525C40.2853 13.1441 37.8244 10.1455 34.667 8.03578C32.1774 6.37231 29.343 5.32039 26.3938 4.9498C25.0787 4.78454 24 3.72548 24 2.4Z" fill="#00BDD3"/></svg>
                        </div>
                    </div>
                    : <>
                        <div className="coverCards">
                            {
                                props.users.map(item => (
                                    <div className="card" key={item.id}>
                                        <img src={item.photo} alt={item.position} loading="lazy" height="70" width="70"/>
                                        <p className="name">{item.name}</p>
                                        <p className="position">{item.position}</p>
                                        <a href={`mailto:${item.email}`} target="_blank" className="email" title={item.email}>{item.email}</a>
                                        <a href={`tel:${item.phone}`} target="_blank" className="phone">{item.phone}</a>
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={() => props.GetUsers()} className='btn_custom' disabled={props.btnDisabled ? 'disabled' : ''} >Show more</button>
                    </>
            }
        </section>
    );
}
export default CardsBlock;




// import React, { useEffect, useState } from 'react';
// import * as axios from "axios";
//
//
// function CardsBlock() {
//     const [isLoading, setIsLoading] = useState(true);
//     const [users, setUsers] = useState([]);
//     const [btnDisabled, setBtnDisabled] = useState(false);
//     const [url, setUrl] = useState('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6');
//     const GetUsers= () => {
//         setIsLoading(true);
//         axios.get(
//             url,
//             {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         )
//             .then((response) => {
//                 //console.log(response.data);
//                 setUsers(response.data.users)
//
//                 if(response.data.total_pages === response.data.page){
//                     setBtnDisabled(true);
//                 }else{
//                     setUrl(response.data.links.next_url);
//                 }
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
//     let showMore = () => {
//         GetUsers();
//     }
//     useEffect(() => {
//         // code to run on component mount
//         GetUsers();
//     }, [])
//     return (
//         <section className="cardsBlock" id="user">
//             <h2>Working with GET request</h2>
//             {
//                 isLoading
//                     ? <div className="coverPreloader">
//                         <div className="preloader">
//                             <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 2.4C24 1.07452 25.0772 -0.0124356 26.3961 0.119892C30.2962 0.511212 34.0543 1.85353 37.3337 4.04473C41.2805 6.68189 44.3566 10.4302 46.1731 14.8156C47.9896 19.201 48.4649 24.0266 47.5388 28.6822C46.6128 33.3377 44.327 37.6141 40.9706 40.9706C37.6141 44.327 33.3377 46.6128 28.6822 47.5388C24.0266 48.4649 19.201 47.9896 14.8156 46.1731C10.4302 44.3566 6.68188 41.2805 4.04473 37.3337C1.85353 34.0543 0.511211 30.2963 0.119892 26.3961C-0.0124351 25.0772 1.07452 24 2.4 24C3.72548 24 4.78454 25.0787 4.9498 26.3938C5.32038 29.343 6.37231 32.1774 8.03578 34.6669C10.1455 37.8244 13.1441 40.2853 16.6525 41.7385C20.1608 43.1917 24.0213 43.5719 27.7457 42.8311C31.4702 42.0902 34.8913 40.2616 37.5765 37.5765C40.2616 34.8913 42.0902 31.4702 42.8311 27.7457C43.5719 24.0213 43.1917 20.1608 41.7385 16.6525C40.2853 13.1441 37.8244 10.1455 34.667 8.03578C32.1774 6.37231 29.343 5.32039 26.3938 4.9498C25.0787 4.78454 24 3.72548 24 2.4Z" fill="#00BDD3"/></svg>
//                         </div>
//                     </div>
//                     : <>
//                         <div className="coverCards">
//                             {
//                                 users.map(item => (
//                                     <div className="card" key={item.id}>
//                                         <img src={item.photo} alt={item.position}/>
//                                         <p className="name">{item.name}</p>
//                                         <p className="position">{item.position}</p>
//                                         <a href={`mailto:${item.email}`} target="_blank" className="email" title={item.email}>{item.email}</a>
//                                         <a href={`tel:${item.phone}`} target="_blank" className="phone">{item.phone}</a>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                         <button onClick={showMore} className='btn_custom' disabled={btnDisabled ? 'disabled' : ''} >Show more</button>
//                     </>
//             }
//         </section>
//     );
// }
// export default CardsBlock;