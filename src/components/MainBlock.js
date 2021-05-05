import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image, Form, Input, Header } from 'semantic-ui-react';
import MovieIcon from '../movieIcon.png';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    useEffect(() => {
        if (movie) {
            axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_APIKEY}`)
            .then(response => {
                if (response.data.Response === "True") {
                    setSearchResults(response.data.Search)
                    // console.log("==>",response.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setSearchResults([]);
        }
        setFetching(false);
    }, [movie])

    const movieHandler = (e) => {
        setMovie(e.target.value);
        setFetching(true);
    };

    return(
    <div className="Main-form-block">
        <div className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
        </div>
        <Form id="Main-form-block">
            <Header as='h4'>Movie title</Header>
            <Input loading={fetching} fluid icon='search' iconPosition='left' placeholder='Search...' value={movie} onChange={movieHandler}/>
        </Form>

        <Card.Group centered={true} id="Cards-group" itemsPerRow={5}>
        {searchResults.map((movie, i) => ( 
            (movie.Poster === "N/A") ? 
            <>
                <Card key={i} raised>
                    {/* <Card.Description>{movie.Title}</Card.Description> */}
                    <Image src={MovieIcon} circular size='small' centered />
                    {/* <Card.Description>{movie.Year}</Card.Description> */}
                </Card>
            </> 
                : 
            <>
                <Card key={i} raised image={movie.Poster}/>
            </>
        ))}
        </Card.Group>
    </div>
    )
}

export default MainBlock