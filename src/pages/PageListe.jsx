// src/pages/Ajouter.jsx

import React, { Component } from 'react';
import db from "../Firestore";
import {Icon} from 'antd';
import { Link } from 'react-router-dom';
import * as firebase from "firebase";

class PageListe extends Component {
    constructor (props){
        super(props);
        this.state ={
            data: []
        };
        this.deleteRecette= this.deleteRecette.bind(this);
        this.getImage=this.getImage.bind(this);
    }



    async componentDidMount() {
        var data = await this.getData();
        this.setState({
            data: data
        });


    }



    async getData() {
        console.log("getData");
        var collectionRef = db.collection("recettes");

        return await collectionRef.orderBy("dateCreation", "desc").get().then(  function (querySnapshot) {
            const dataSource = [];

            querySnapshot.forEach( function (doc) {
                var data2 = [];
                data2.push(
                    doc.id,
                    doc.data()
                );
                dataSource.push(
                    data2
                );
            });
            console.log("dataSource: ", dataSource);
            return dataSource;
        });
    }

    deleteRecette(index) {
        var confirmation = window.confirm("Etes-vous sûr de vouloir supprimer cette recette?");
        if(confirmation) {
            console.log("index: ", index);
            db.collection("recettes").doc(index).delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                    window.location.reload();
                }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }


    }


    getImage(image, index){
        var imageActuelle = 'images/'+image;
        console.log("image: ", imageActuelle);
        var storageRefActuel = firebase.storage().ref(imageActuelle);

        /*this.setState({
            imageActuelle: storageRefActuel
        });*/
        storageRefActuel.getDownloadURL().then(function(url) {
            //  console.log(url);
            var img = document.getElementById("imageActuelle"+index);
            img.src=url;
            console.log("url", url);
        });
    }

    /*Affichage du tableau avec lien vers le formulaire de création de données*/


    render() {


        const RecettesList = this.state.data.map((items, index) => (

            <tbody>
            <tr key={index} style={{"border": "solid grey 1px"}}>
                <td>{this.getImage.call(this,items[1].image, index)}<img src="" alt="recette" id={"imageActuelle"+index} width="90px"/></td>
                <td scope="row" className="bold" >{items[1].nomRecette}</td>
                {/*<td>{items[1].typeRecette}</td>*/}
                {/*<td>{items[1].ingredients}</td>*/}
                {/*<td>{items[1].preparation}</td>*/}
                {/*<td>{items[1].cuisson}</td>*/}
                {/*<td>{items[1].difficulte}</td>*/}
                {/*<td>{items[1].personnes}</td>*/}
                <td>{items[1].tags}</td>
                {/*<td>{items[1].materiel}</td>*/}
                {/*<td>{items[1].commentaire}</td>*/}
                <td> <Link to={`/edit/${items[0]}`}><Icon style={{"font-size": "25px","margin-right": "10px"}} type="edit" /></Link> | <Icon style={{"color": "red","font-size": "25px","margin-left": "10px"}} type="delete" value={items[1].id} onClick={() => this.deleteRecette(items[0])}/></td>
            </tr>
            </tbody>
        ));

        console.log("recettesList: ", RecettesList);

        return (
            <div className="page-container container-tableau">
                <h1 className="titre">Recettes</h1>

                <table className="table table-striped table-hover ombre">
                    <thead className="thead-modif">
                    <tr className="header-liste">
                        <th scope="col">Image</th>
                        <th scope="col">Nom</th>
                        {/*<th scope="col">Type</th>*/}
                        {/*<th scope="col">Ingrédients</th>*/}
                        {/*<th scope="col">Préparation</th>*/}
                        {/*<th scope="col">Cuisson</th>*/}
                        {/*<th scope="col">Difficulté</th>*/}
                        {/*<th scope="col">Nb de personnes</th>*/}
                        <th scope="col">Tags</th>
                        {/*<th scope="col">Matériel</th>*/}
                        {/*<th scope="col">Commentaire</th>*/}
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    {RecettesList}
                </table>
            </div>
        );
    };
}

export default PageListe;

