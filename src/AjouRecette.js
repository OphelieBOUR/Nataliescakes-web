import React from 'react';
import * as firebase from 'firebase';
import 'firebase/storage';
import {Form, Icon, Label, Input, Button, InputNumber, Select, Upload} from 'antd';
import axios from 'axios';
import FileUploader from "react-firebase-file-uploader";
import db from "./Firestore";



const Option = Select.Option;

class Ajoutrecette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: "",
            nomRecette: "",
            preparation: "",
            cuisson: "",
            personnes: "",
            difficulte: "",
            typeRecette: "",
            image: "",
            isUploading: false,
            progress: 0,
            imageURL: "",
            edit: 0,
            nomBouton: "",
            imageActuelle:"",
            imageChangee:0
        };
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        console.log("upload success");
        this.setState({ image: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ imageURL: url }));

        this.setState({
            imageChangee:1
        });
        document.getElementById("imageActuelle").style.display='none';
    };



    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addRecette = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        if (this.state.edit===0) {

            const userRef = db.collection("recettes").add({
                nomRecette: this.state.nomRecette,
                typeRecette: this.state.typeRecette,
                ingredients: this.state.ingredients,
                cuisson: this.state.cuisson,
                difficulte: this.state.difficulte,
                personnes: this.state.personnes,
                preparation: this.state.preparation,
                tags: this.state.tags,
                materiel: this.state.materiel,
                commentaire: this.state.commentaire,
                image: this.state.image,
                dateCreation: new Date()
            });
            this.setState({
                nomRecette: "",
                typeRecette: "",
                ingredients: "",
                cuisson: "",
                difficulte: "",
                personnes: "",
                image: "",
                preparation: "",
                tags: "",
                materiel: "",
                commentaire: "",
                imageURL: "",
                dateCreation: ""
            });
        }
        else {
            const userRef = db.collection("recettes").doc(this.props.match.params.id).update({
                nomRecette: this.state.nomRecette,
                typeRecette: this.state.typeRecette,
                ingredients: this.state.ingredients,
                cuisson: this.state.cuisson,
                difficulte: this.state.difficulte,
                personnes: this.state.personnes,
                preparation: this.state.preparation,
                tags: this.state.tags,
                materiel: this.state.materiel,
                commentaire: this.state.commentaire,
                image: this.state.image

            });
            if (this.state.imageChangee===1) {
                this.deleteImage(this.state.imageActuelle.name);
            }
            this.setState({
                nomRecette: "",
                typeRecette: "",
                ingredients: "",
                cuisson: "",
                difficulte: "",
                personnes: "",
                image: "",
                preparation: "",
                tags: "",
                materiel: "",
                commentaire: "",
                imageURL: ""
            });

        }
        this.props.history.push('/');
    };

    async componentDidMount(){

        var documentId = this.props.match.params.id;

        if (documentId != null) {
            this.setState({
                edit: 1
            });
            console.log("edit");

            document.getElementById("imageActuelle").style.display='block';

            var collectionRef = db.collection("recettes");

            var data = await collectionRef.where(firebase.firestore.FieldPath.documentId(), '==', documentId).get()
                .then( function (querySnapshot) {
                    var dataEdit="";
                    querySnapshot.forEach(function(doc) {
                        dataEdit = doc.data();
                    });

                    return dataEdit;
                });


            await this.setState({
                nomRecette: data.nomRecette,
                typeRecette: data.typeRecette,
                ingredients: data.ingredients,
                cuisson: data.cuisson,
                difficulte: data.difficulte,
                personnes: data.personnes,
                image: data.image,
                preparation: data.preparation,
                tags: data.tags,
                materiel: data.materiel,
                commentaire: data.commentaire,
                nomBouton: "Modifier",
                imageURL: ""
            });
            await this.getImage();
            await console.log(this.state);


        }
        else {
            console.log("ajout");
            await this.setState({
                edit: 0,
                nomBouton: "Ajouter"
            });
            document.getElementById("imageActuelle").style.display='none';
        }
    }

    deleteImage(imageActuelle) {
        var refActuelle = firebase.storage().ref("images/"+imageActuelle);
        refActuelle.delete().then(function(){
            console.log("Image supprimée");
        }).catch(function(error){
            console.log("Erreur suppression de l'image");
        });
    }

    getImage() {
        var imageActuelle = 'images/'+this.state.image;
        console.log("image: ", imageActuelle);
        var storageRefActuel = firebase.storage().ref(imageActuelle);

        this.setState({
            imageActuelle: storageRefActuel
        });
        storageRefActuel.getDownloadURL().then(function(url) {
            //  console.log(url);
            var img = document.getElementById("imageActuelle");
            img.src=url;
            console.log("url", url);
        });
    }

    render() {
        var titreForm = "";
        if(this.state.edit===0) {
            titreForm = "Ajouter un produit";
        }
        else {
            titreForm = "Modifier un produit";

        }
        //console.log(titreForm);




        return (
            <div>
                <h1> {titreForm}</h1><br/>

                <Form labelCol={{ span: 3}} wrapperCol={{span: 12}} onSubmit={this.addRecette}>

                    <Form.Item label="Nom de la recette">
                        <Input required
                               type="text"
                               name="nomRecette"
                               placeholder="Ex : Gâteau au chocolat"
                               onChange={this.updateInput}
                               value={this.state.nomRecette}
                        />
                    </Form.Item>

                    <Form.Item label="Type de recette">
                        <Input required
                               type="text"
                               name="typeRecette"
                               placeholder="Ex : Classique"
                               onChange={this.updateInput}
                               value={this.state.typeRecette}
                        />
                    </Form.Item>

                    <Form.Item label="Ingrédients">
                        <Input required
                               type="text"
                               name="ingredients"
                               placeholder="Ex : 200g de Farine, 4 oeufs, ..."
                               onChange={this.updateInput}
                               value={this.state.ingredients}
                        />
                    </Form.Item>

                    <Form.Item label="Temps de préparation">
                        <Input required
                               type="text"
                               name="preparation"
                               placeholder="Ex : 10 minutes, 40 minutes"
                               onChange={this.updateInput}
                               value={this.state.preparation}
                        />
                    </Form.Item>

                    <Form.Item label="Temps de cuisson">
                        <Input required
                               type="text"
                               name="cuisson"
                               placeholder="Ex : 1 heure, 10 minutes"
                               onChange={this.updateInput}
                               value={this.state.cuisson}
                        />
                    </Form.Item>

                    <Form.Item label="Difficulté">

                        <Input required min={"1"}
                               max={"5"}
                               placeholder={"De 1 à 5"}
                               type="number"
                               name="difficulte"
                               onChange={this.updateInput}
                               value={this.state.difficulte}
                        />

                    </Form.Item>

                    <Form.Item label="Nombre de personnes">
                        <Input required min={"1"}
                               type="number"
                               name="personnes"
                               onChange={this.updateInput}
                               value={this.state.personnes}
                        />
                    </Form.Item>

                    <Form.Item label="Tags">
                        <Input required
                               type="text"
                               name="tags"
                               placeholder="Ex : Sucré"
                               onChange={this.updateInput}
                               value={this.state.tags}
                        />
                    </Form.Item>

                    <Form.Item label="Matériel nécessaire">
                        <Input required
                               type="text"
                               name="materiel"
                               placeholder="Ex : Moule"
                               onChange={this.updateInput}
                               value={this.state.materiel}
                        />
                    </Form.Item>

                    <Form.Item label="Commentaire">
                        <Input required
                               type="text"
                               name="commentaire"
                               placeholder="Ex : Très bon !"
                               onChange={this.updateInput}
                               value={this.state.commentaire}
                        />
                    </Form.Item>

                    <Form.Item label="Photo">

                        <img src="" id="imageActuelle" alt="image actuelle" width="300px"/>

                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        {this.state.imageURL && <img src={this.state.imageURL} style={{width: "300px"}}/>}
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename={false}
                            storageRef={firebase.storage().ref("images")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />

                    </Form.Item>



                <button className="nathalie-button button-form" type="submit" >{this.state.nomBouton}</button>
            </Form>
            </div>
        );

    }
}
export default Ajoutrecette;