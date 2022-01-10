import React, {Component} from "react";
import {Switch,Route} from "react-router-dom";


import Detail from "./component/detail";
import Books from "./component/books";



class Routes extends Component{
    render() {
        return(
            <Switch>
                <Route path="/" exact component={Books}/>
                <Route path="/detail/:id" component={Detail}/>

            </Switch>

        )
    }
}


export default Routes;