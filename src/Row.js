import React, { useEffect, useRef, useState } from 'react'
import { instance } from './axios';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // const [playingTrailer, setPlayingTrailer] = useState(null);
    // const youtubePlayer = useRef(null);
    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results)
            return request;

        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // const stopPlayingTrailer = () => {
    //     if (playingTrailer) {
    //         playingTrailer.stopVideo();
    //         setPlayingTrailer(null);
    //         setTrailerUrl("")
    //     }
    // };

    const handleClick = (movie) => {

        // set trailer url to stop playing other video if one is playing
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || movie?.source || " ")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(url)
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    // console.table(movies)
    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => {
                            handleClick(movie)
                        }}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
