import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from './components/button'
import {displayField} from './utilities/index';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CREATE_CREA_MUTATION = gql`
mutation createCreature(
    $caMin: Int,
    $caMax: Int,
    $enName: String!,
    $pvMin: Int,
    $frName: String!,
    $pvMax: Int) {
    createCreature(
        caMin: $caMin
        caMax: $caMax
        enName: $enName
        pvMin: $pvMin
        frName: $frName
        pvMax: $pvMax)
  }`;

class CreateCreature extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onCreated = this.onCreated.bind(this);
        this.validation = this.validation.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            caMin: 0,
            caMax: 0,
            enName: '',
            pvMin: 0,
            frName: '',
            pvMax: 0,
            open: false,
            message: ''
        };
      }

    handleClick (message) {
        this.setState({ open: true, message: message });
    };

    handleClose (event, reason) {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ open: false });
    };

    onChange (name) {
        return (event) => {
            this.setState({
                [name]: event.target.value
            });
        }
    };
    onCreated(data){
        this.props.history.push(`/file/${data.CreateCreature.enName}`)
    }
    validation(){
        let errors = [];
        if(!this.state.frName){
            errors.push({field:'frName', error:'Veuillez renseigner ce champ'})
        }
        if(!this.state.enName){
            errors.push({field:'enName', error:'Veuillez renseigner ce champ'})
        }
        return errors;
    }

    render(){
        return (
            <div>
                <h1>{displayField('Nom francais', this.state.frName, {isEdit:true, onChange:this.onChange('frName')})}</h1>
                <h3>{displayField('Nom anglais', this.state.enName, {isEdit:true, onChange:this.onChange('enName')})}</h3>
                <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
                {displayField('Type', this.state.type, {isEdit:true, onChange:this.onChange('type')})}
                {displayField('Taille', this.state.taille, {isEdit:true, onChange:this.onChange('taille')})}
                {displayField('Alignement', this.state.alignment, {isEdit:true, onChange:this.onChange('alignment')})}
                <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
                {displayField('Points de vie min', this.state.pvMin, {isEdit:true, onChange:this.onChange('pvMin')})}
                {displayField('Points de vie max', this.state.pvMax, {isEdit:true, onChange:this.onChange('pvMax')})}
                {displayField('Classe d\'armure min', this.state.caMin, {isEdit:true, onChange:this.onChange('caMin')})}
                {displayField('Classe d\'armure max', this.state.caMax, {isEdit:true, onChange:this.onChange('caMax')})}
                {displayField('Vitesse', this.state.speed, {isEdit:true, onChange:this.onChange('speed')})}
                <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>

                <Mutation 
                    mutation={CREATE_CREA_MUTATION} 
                    onCompleted={this.onCreated} // redirect to detail page once completed
                >
                {   
                   
                    (createCreature, { data }) => {
                        function onSubmit(){
                            let errors = this.validation();
                            if(errors.length === 0){
                                createCreature({ variables: { 
                                    caMin: parseInt(this.state.caMin),
                                    caMax: parseInt(this.state.caMax),
                                    enName: this.state.enName,
                                    pvMin: parseInt(this.state.pvMin),
                                    frName: this.state.frName,
                                    pvMax: parseInt(this.state.pvMax)
                                } });
                            }
                            else {
                                this.handleClick(errors)
                            }
                        }
                        return (<Button onClick={onSubmit.bind(this)}>Créer</Button>)
                    }
                }
            </Mutation>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Erreur de validation</span>}
                action={[
                    <IconButton
                      onClick={this.handleClose}
                    >
                      <CloseIcon />
                    </IconButton>,
                ]}
            />
                
        </div>
    );
    }
};

export default CreateCreature;