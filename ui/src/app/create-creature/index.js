import React, { Component } from 'react';
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import isEmpty from 'lodash/isEmpty';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

const GET_REF_QUERY = gql`
query getReferences {
    getReferences(references: ["Size", "Morality", "Attitude", "Type"]) {
        Size { code, label }
        Morality { code, label }
        Attitude { code, label }
        Type { code, label }
    }
  }`;
const CREATE_CREA_MUTATION = gql`
mutation createCreature(
    $caMin: Int,
    $caMax: Int,
    $enName: String!,
    $pvMin: Int,
    $frName: String!,
    $pvMax: Int,
    $type_codes: [String],
    $attitude_code: String,
    $morality_code: String,
    $size_code: String) {
    createCreature(
        caMin: $caMin
        caMax: $caMax
        enName: $enName
        pvMin: $pvMin
        frName: $frName
        pvMax: $pvMax,
        type_codes: $type_codes,
        attitude_code: $attitude_code,
        morality_code: $morality_code,
        size_code: $size_code)
  }`;

class CreateCreature extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
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
            errors: null,
            type_codes: [],
            attitude_code: '',
            morality_code: '',
            size_code: ''
        };
      }

    handleClick (errors) {
        this.setState({ open: true, errors: errors });
    };

    handleClose (event, reason) {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ open: false });
    };

    handleChange (label) {
        return (event) => {
            this.setState({
                [label]: event.target.value
            });
        }
    };
    onCreated(data){
        this.props.history.push(`/file/${data.createCreature}`)
    }
    validation(){
        let errors = {};
        if(!this.state.frName){
            errors['frName'] = 'Veuillez renseigner ce champ'
        }
        if(!this.state.enName){
            errors['enName'] = 'Veuillez renseigner ce champ'
        }
        return errors;
    }

    render(){

        return (
                <Query query={GET_REF_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error</p>;
                        else 
                        return <div className='forms'>
                            <TextField
                                error={this.state.errors && this.state.errors['frName']}
                                required
                                id="fr-label"
                                label="Nom francais"
                                value={this.state.frName}
                                onChange={this.handleChange('frName')}
                                margin="normal"
                            />
                            <TextField
                                error={this.state.errors && this.state.errors['enName']}
                                required
                                id="en-label"
                                label="Nom anglais"
                                value={this.state.enName}
                                onChange={this.handleChange('enName')}
                                margin="normal"
                            />
                            <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
                            <Select
                                multiple
                                label="Types"
                                value={this.state.type_codes}
                                onChange={this.handleChange('type_codes')}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                <div>
                                    {selected.map(value => (
                                    <Chip key={value} label={data.getReferences.Type.find(x => x.code === value)["label"]}/>
                                    ))}
                                </div>
                                )}
                            >
                            {data.getReferences.Type.map(type => (
                                <MenuItem key={type.code} value={type.code}>
                                    {type.label}
                                </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                id="size"
                                select
                                label="Taille"
                                value={this.state.size_code}
                                onChange={this.handleChange('size_code')}
                                SelectProps={{
                                    native: true,
                                }}
                                margin="normal"
                                >
                                {data.getReferences.Size.map(option => (
                                    <option key={option.code} value={option.code}>
                                    {option.label}
                                    </option>
                                )).concat([<option key={''} value={''}></option>])}
                            </TextField>
                            <TextField
                                id="attitude"
                                select
                                label="Alignement - Attitude"
                                value={this.state.attitude_code}
                                onChange={this.handleChange('attitude_code')}
                                SelectProps={{
                                    native: true,
                                }}
                                margin="normal"
                                >
                                {data.getReferences.Attitude.map(option => (
                                    <option key={option.code} value={option.code}>
                                    {option.label}
                                    </option>
                                )).concat([<option key={''} value={''}></option>])}
                            </TextField>
                            <TextField
                                id="morality"
                                select
                                label="Alignement - Moralité"
                                value={this.state.morality_code}
                                onChange={this.handleChange('morality_code')}
                                SelectProps={{
                                    native: true,
                                }}
                                margin="normal"
                                >
                                {data.getReferences.Morality.map(option => (
                                    <option key={option.code} value={option.code}>
                                    {option.label}
                                    </option>
                                )).concat([<option key={''} value={''}></option>])}
                            </TextField>
                            <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
                            <TextField
                                id="pvMin"
                                label="Points de vie min"
                                value={this.state.pvMin}
                                onChange={this.handleChange('pvMin')}
                                margin="normal"
                            />
                            <TextField
                                id="pvMax"
                                label="Points de vie max"
                                value={this.state.pvMax}
                                onChange={this.handleChange('pvMax')}
                                margin="normal"
                            />
                            <TextField
                                id="caMin"
                                label="Classe d'armure min"
                                value={this.state.caMin}
                                onChange={this.handleChange('caMin')}
                                margin="normal"
                            />
                            <TextField
                                id="caMax"
                                label="Classe d'armure max"
                                value={this.state.caMax}
                                onChange={this.handleChange('caMax')}
                                margin="normal"
                            />
                            <TextField
                                id="speed"
                                label="Vitesse (cases)"
                                value={this.state.speed}
                                onChange={this.handleChange('speed')}
                                margin="normal"
                            />
                <Mutation 
                    mutation={CREATE_CREA_MUTATION} 
                    onCompleted={this.onCreated} // redirect to detail page once completed
                >
                {   
                    (createCreature, { data }) => {
                        function onSubmit(){
                            let errors = this.validation();
                            if(isEmpty(errors)){
                                createCreature({ variables: { 
                                    caMin: parseInt(this.state.caMin),
                                    caMax: parseInt(this.state.caMax),
                                    enName: this.state.enName,
                                    pvMin: parseInt(this.state.pvMin),
                                    frName: this.state.frName,
                                    pvMax: parseInt(this.state.pvMax),
                                    size_code: this.state.size_code === '' ? null : this.state.size_code,
                                    type_codes: this.state.type_codes,
                                    attitude_code: this.state.attitude_code === '' ? null : this.state.attitude_code,
                                    morality_code: this.state.morality_code === '' ? null : this.state.morality_code
                                } });
                            }
                            else {
                                this.handleClick(errors)
                            }
                        }
                        return (<Button onClick={onSubmit.bind(this)} variant="contained" color="primary">Créer</Button>)
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
        }}
    </Query>
    );
    }
};

export default CreateCreature;