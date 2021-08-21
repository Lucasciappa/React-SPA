import React, { useMemo } from 'react';
import queryString from "query-string"
import { useLocation } from 'react-router-dom';

import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SerachScreen = ({ history }) => {

    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);

    
    const [formValues, handleInputChange] = useForm({
        hero: q
    });
    
    const { hero } = formValues;


    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${hero}`);
        // console.log(hero);
    }

    return (
        <div className="container mt-2">
            <div className="row">

                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="hero"
                            value={hero}
                            placeholder="Find your hero"
                            autoComplete="off"
                            className="form-control"
                            onChange={handleInputChange} />

                        <button
                            className="btn mt-1 btn-block btn-outline-primary"
                            type="submit">
                            Search...
                        </button>
                    </form>

                </div>
                <div className="col-7">

                    <h4>Results</h4>
                    <hr />

                    {
                        (q === "") 
                            &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }
                    
                    {
                        (q !== "" && heroesFiltered.length === 0) 
                            &&
                        <div className="alert alert-danger">
                            There is not a hero with '{q}'
                        </div>
                    }

                    {
                        
                        
                        heroesFiltered.map( hero => (
                            <HeroCard
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>

            </div>

        </div>
    )
}
