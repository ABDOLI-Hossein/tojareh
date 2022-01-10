import React, {Component} from "react";
import axios from "axios";


class Detail extends Component{

    state = {
        data : []
    }


    componentWillMount(){
        axios.get(`http://localhost:3004/books?id=${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    data:response.data[0]
                })
            })


    }







    render() {
       console.log(this.props.match.params.id)
        let data = this.state.data;
        return(
            <>
                <div className='wholeWrapDetail d-flex per-8 mrl-auto mw-100m'>
                    <div className="detail_left per-3 mw-100m" style={{backgroundImage:`url(../images/${data.image})`}}>

                    </div>
                    <div className="detail_right per-7 mw-100m">
                        <h1>{data.title}</h1>
                        <p className="price">Price: {data.price}</p>
                        <p>Genre: <b>{data.genre}</b></p>
                        <h4>Discription</h4>
                        <hr/>
                        <p className="description">{data.body}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Detail;