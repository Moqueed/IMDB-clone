import { useState,useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Banner from './Components/Banner'
import Movies from './Components/Movies'
import Navbar from './Components/Navbar'
import WatchList from './Components/WatchList'
import MovieContext from './Components/Context/MovieContext'

function App() {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );


 
 

  const addToWatchList = (movieToAdd) => {
    const newWatchList = [...watchList, movieToAdd];
    setWatchList(newWatchList);
  };

  const removeFromWatchList = (movieToRemove) => {
    const filteredWatchList = watchList.filter((movieObj) => movieObj.id !== movieToRemove.id);
    setWatchList(filteredWatchList);
  };

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  return (
    <BrowserRouter>
    <Navbar/>

      <MovieContext.Provider value={{watchList,addToWatchList,removeFromWatchList,setWatchList}}>

      <Routes>
        <Route path="/" element={
           <>
           <Banner/>
           {/* <paginationContext.Provider value={{pageNo,handleNext,handlePrev}}> */}
           <Movies
              // watchList = {watchList}
              // addToWatchList = {addToWatchList}
              // removeFromWatchList = {removeFromWatchList}
              // pageNo = {pageNo}
              // handleNext = {handleNext}
              // handlePrev = {handlePrev}
           />
           {/* </paginationContext.Provider> */}
           </>
        }/>
        <Route path="/watchlist" element={
        <WatchList
            // movies = {watchList}
            // removeFromWatchList = {removeFromWatchList}
            // setWatchList = {setWatchList}
        />
        }/>
      </Routes>
      </MovieContext.Provider>
    </BrowserRouter>
  )
}
    

export default App
