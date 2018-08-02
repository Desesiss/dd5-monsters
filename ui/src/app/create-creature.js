import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from './components/button'
import {displayField} from './utilities/index';

const CREATE_CREA_MUTATION = gql`
mutation CreateCreature(
    $caMin: Int,
    $caMax: Int,
    $enName: String!,
    $pvMin: Int,
    $frName: String!,
    $pvMax: Int) {
    CreateCreature(
        caMin: $caMin
        caMax: $caMax
        enName: $enName
        pvMin: $pvMin
        frName: $frName
        pvMax: $pvMax) 
        { enName }
  }`;

class CreateCreature extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onCreated = this.onCreated.bind(this);

        this.state = {
            caMin: 0,
            caMax: 0,
            enName: '',
            pvMin: 0,
            frName: '',
            pvMax: 0
        };
      }

    onChange(name){
        return (event) => {
            this.setState({
                [name]: event.target.value
            });
        }
    }
    onCreated(data){
        this.props.history.push(`/file/${data.CreateCreature.enName}`)
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
                            createCreature({ variables: { 
                                caMin: this.state.caMin,
                                caMax: this.state.caMax,
                                enName: this.state.enName,
                                pvMin: this.state.pvMin,
                                frName: this.state.frName,
                                pvMax: this.state.pvMax
                            } });
                        }
                        return (<Button onClick={onSubmit.bind(this)}>Créer</Button>)
                    }
                }
            </Mutation>
        </div>
    );
    }
};

export default CreateCreature;