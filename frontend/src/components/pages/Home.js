import React, { useState, useEffect } from 'react';

import api from '../../utils/api';

function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Faz a chamada à API quando o componente monta
        api.get("/cars")
            .then((response) => {
                setCars(response.data.cars);
            })
            .catch((error) => {
                console.error('Erro ao obter dados:', error);
            });
    }, []); // O array vazio assegura que useEffect é chamado apenas uma vez, equivalente a componentDidMount

    return (
        <div>
            <ul>
                {
                    cars.length > 0 && 
                    cars.map((car)=>(
                        <div>
                            <p>{car.model} - {car.age}</p>
                            </div>
                    ))
                }
            </ul>
        </div>
    );
}

export default Home;
