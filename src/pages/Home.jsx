import React from 'react'
import HorizontalLoginForm from "../Form";
import Ajoutrecette from "../AjouRecette";

export default class Ajouter extends React.Component {
    constructor (props){
        super(props);
        this.handleFormTitle = this.handleFormTitle.bind(this);

        this.state= {
            titreForm : ""
        }
    }

    handleFormTitle(nom) {
        this.setState({
            titreForm : nom
        })
    }

    render() {
        return (
            <div className="page-container">


                {/*<HorizontalLoginForm/>*/}

                <Ajoutrecette {...this.props} />

            </div>
        )
    }

}