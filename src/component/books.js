import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";




class Books extends Component{


    state = {
        books : [],
        allBooks:[],
        search : ""
    }





    onSearch = (e) => {
        e.preventDefault();
        let valueSearch = this.search.value.toLowerCase();
        console.log(valueSearch)
        let itemFound = [];
        this.state.allBooks.map(function (item,i){
            if (item.title.toLowerCase().includes(valueSearch)){
                itemFound.push(item)
            }
        })
        this.setState({
            books : itemFound
        })
    }



    onSelect = (e) => {
        e.preventDefault();
        let selectGenre =  this.genre.value;
        document.getElementById('title').innerText = selectGenre;
        let itemFound = [];



        this.state.allBooks.map(function (item,i){
            if (item.genre.includes(selectGenre)){
                itemFound.push(item)
            }
            if (selectGenre === "All Genre"){
                itemFound.push(item)
            }
        })
        this.setState({
            books : itemFound
        })
    }


    // onSubmit = (e) => {
    //     e.preventDefault();
    //     let searchKey =  this.search.value;
    //     let itemFound = [];
    //     this.state.allBooks.map(function (item,i){
    //         if (item.title.includes(searchKey)){
    //             itemFound.push(item)
    //         }
    //     })
    //     this.setState({
    //         books : itemFound
    //     })
    //
    //
    // }





    componentWillMount(){

        axios.get(`http://localhost:3004/books`)
            .then(response => {
                this.setState({
                    books:response.data,
                    allBooks:response.data
                })
            })

    }







    render() {

        // console.log(this.state)
        return(
            <>
                <h1 id="title">ALL BOOKS</h1>
                <form className="saform">
                    <div className="searchWrap">
                        <input onKeyUp={this.onSearch} ref={input => this.search = input} type="search" placeholder="Search"/>
                        {/*<button onClick={this.onSubmit} type="submit" className="sa-button-login"><h6>search</h6></button>*/}
                    </div>
                    <div className="selectWrap">
                        <select ref={input => this.genre = input} name="genre" onChange={this.onSelect} >
                            <option value="All Genre" selected>All Genre</option>
                            <option value="Horror">Horror</option>
                            <option value="History">History</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Classics">Classics</option>
                            <option value="Action and Adventure">Action and Adventure</option>
                        </select>
                    </div>



                </form>



                <hr/>
                <div className="wrapWholeCard">

                    {this.state.books.map(function (item,i){
                        return (

                            <Link to={`/detail/${item.id}`}>
                                <div className="eachCard">
                                <div className='imageCard' style={{
                                    backgroundImage:`url(../images/${item.image})`,
                                }}></div>

                                <div>
                                    <h6>{item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}</h6>
                                    <div className="starWrap">
                                        <svg width="111" height="24" viewBox="0 0 111 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.7622 3.28886C10.906 2.8163 11.575 2.81631 11.7188 3.28886L13.0701 7.72855C13.2623 8.36014 13.8449 8.7918 14.5051 8.7918H19.01C19.4864 8.7918 19.6929 9.3949 19.3164 9.68688L15.5618 12.5991C15.0701 12.9804 14.8649 13.6258 15.0461 14.2211L16.4533 18.8447C16.5953 19.3112 16.0538 19.6842 15.6686 19.3854L12.1598 16.6639C11.6188 16.2442 10.8622 16.2442 10.3212 16.6639L6.81245 19.3854C6.42716 19.6842 5.8857 19.3112 6.02767 18.8447L7.43489 14.2211C7.61607 13.6258 7.4109 12.9804 6.91921 12.5991L3.16461 9.68688C2.78816 9.3949 2.99463 8.7918 3.47105 8.7918H7.97592C8.63612 8.7918 9.2187 8.36014 9.41093 7.72855L10.7622 3.28886Z" fill="#FBFF49" stroke="#FBFF49"/>
                                            <path d="M32.5381 3.50736C32.6761 3.02362 33.3617 3.02362 33.4997 3.50736L34.697 7.70337C34.8808 8.34758 35.4695 8.7918 36.1394 8.7918H40.2637C40.7322 8.7918 40.9434 9.37837 40.5824 9.67704L37.0318 12.6146C36.573 12.9942 36.3822 13.6093 36.5456 14.1819L37.8478 18.7458C37.9826 19.2182 37.4267 19.5814 37.0482 19.2683L33.9751 16.7257C33.4203 16.2667 32.6176 16.2667 32.0627 16.7257L28.9896 19.2683C28.6112 19.5814 28.0553 19.2182 28.1901 18.7458L29.4923 14.1819C29.6557 13.6093 29.4649 12.9942 29.0061 12.6146L25.4554 9.67704C25.0944 9.37837 25.3056 8.7918 25.7741 8.7918H29.8984C30.5683 8.7918 31.157 8.34758 31.3409 7.70337L32.5381 3.50736Z" fill="#FBFF49" stroke="#FBFF49"/>
                                            <path d="M55.0242 3.09619C55.1734 2.63465 55.8264 2.63465 55.9757 3.09619L57.4817 7.75333C57.6819 8.37238 58.2583 8.7918 58.9089 8.7918H63.7926C64.2763 8.7918 64.4781 9.41039 64.0874 9.69564L60.1282 12.5858C59.605 12.9678 59.3861 13.6425 59.5854 14.2589L61.0957 18.9293C61.2448 19.3904 60.7166 19.7727 60.3252 19.487L56.3843 16.6102C55.8575 16.2255 55.1424 16.2255 54.6155 16.6102L54.9103 17.014L54.6155 16.6102L50.6746 19.487C50.2833 19.7727 49.755 19.3904 49.9041 18.9293L51.4144 14.2589C51.6137 13.6425 51.3948 12.9678 50.8716 12.5858L46.9125 9.69564C46.5217 9.41039 46.7235 8.7918 47.2073 8.7918H52.0909C52.7415 8.7918 53.318 8.37238 53.5182 7.75333L55.0242 3.09619Z" fill="#FBFF49" stroke="#FBFF49"/>
                                            <path d="M77.5003 3.50736C77.6383 3.02361 78.3239 3.02362 78.4619 3.50736L79.6592 7.70337C79.843 8.34758 80.4317 8.7918 81.1016 8.7918H85.2259C85.6944 8.7918 85.9056 9.37837 85.5446 9.67704L81.994 12.6146C81.5351 12.9942 81.3443 13.6093 81.5077 14.1819L82.8099 18.7458C82.9447 19.2182 82.3889 19.5814 82.0104 19.2683L78.9373 16.7257C78.3825 16.2667 77.5797 16.2667 77.0249 16.7257L73.9518 19.2683C73.5733 19.5814 73.0175 19.2182 73.1522 18.7458L74.4545 14.1819C74.6179 13.6093 74.427 12.9942 73.9682 12.6146L70.4176 9.67704C70.0566 9.37837 70.2678 8.7918 70.7363 8.7918H74.8606C75.5305 8.7918 76.1192 8.34757 76.303 7.70337L77.5003 3.50736Z" fill="#FBFF49" stroke="#FBFF49"/>
                                            <path d="M99.2812 3.28886C99.425 2.8163 100.094 2.81631 100.238 3.28886L101.589 7.72855C101.781 8.36014 102.364 8.7918 103.024 8.7918H107.529C108.005 8.7918 108.212 9.39489 107.835 9.68688L104.081 12.5991C103.589 12.9804 103.384 13.6258 103.565 14.2211L104.972 18.8447C105.114 19.3112 104.573 19.6842 104.188 19.3854L100.679 16.6639C100.138 16.2442 99.3813 16.2442 98.8402 16.6639L95.3315 19.3854C94.9462 19.6842 94.4047 19.3112 94.5467 18.8447L95.9539 14.2211C96.1351 13.6258 95.9299 12.9804 95.4383 12.5991L91.6836 9.68688C91.3072 9.3949 91.5137 8.7918 91.9901 8.7918H96.495C97.1552 8.7918 97.7377 8.36014 97.93 7.72855L99.2812 3.28886Z" stroke="#FBFF49"/>
                                        </svg>
                                        <small>4.3</small>
                                    </div>
                                    <small>{item.price}</small>
                                </div>
                            </div>
                            </Link>

                        )

                    })}
                </div>



            </>
        )
    }
}

export default Books;
