import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import isEmpty from 'lodash/isEmpty';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';


const CREATE_CREA_MUTATION = gql`
mutation createCreature(
    $caMin: Int,
    $caMax: Int,
    $enName: String!,
    $pvMin: Int,
    $frName: String!,
    $pvMax: Int,
    $alignment_code: String,
    $size_code: String) {
    createCreature(
        caMin: $caMin
        caMax: $caMax
        enName: $enName
        pvMin: $pvMin
        frName: $frName
        pvMax: $pvMax,
        alignment_code: $alignment_code,
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
            type_code: null,
            alignment_code: null,
            size_code: null
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

    handleChange (name) {
        return (event) => {
            this.setState({
                [name]: event.target.value
            });
        }
    };
    onCreated(data){
        this.props.history.push(`/file/${data.CreateCreature.id}`)
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
        const sizes = [{code: null, name: ''}, {code: 'PET', name: 'petite'}, {code:'TPE', name:'très petite'}];
        const alignments = [{code: null, name: ''}, {code: 'MAA-MII', name: 'chaotic neutre'}, {code:'LLL-BBB', name:'loyal bon'}];
        const types = [{code: null, name: ''}, {code: 'HUM', name: 'humanoide'}, {code:'DEM', name:'démon'}];

        return (
            <div className='forms'>
                <TextField
                    error={this.state.errors && this.state.errors['frName']}
                    required
                    id="fr-name"
                    label="Nom francais"
                    value={this.state.frName}
                    onChange={this.handleChange('frName')}
                    margin="normal"
                />
                <TextField
                    error={this.state.errors && this.state.errors['enName']}
                    required
                    id="en-name"
                    label="Nom anglais"
                    value={this.state.enName}
                    onChange={this.handleChange('enName')}
                    margin="normal"
                />
                <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
                <TextField
                    id="type"
                    select
                    label="Type"
                    value={this.state.type_code}
                    onChange={this.handleChange('type_code')}
                    SelectProps={{
                        native: true,
                    }}
                    margin="normal"
                    >
                    {types.map(option => (
                        <option key={option.code} value={option.code}>
                        {option.name}
                        </option>
                    ))}
                </TextField>
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
                    {sizes.map(option => (
                        <option key={option.code} value={option.code}>
                        {option.name}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="alignment"
                    select
                    label="Alignement"
                    value={this.state.alignment_code}
                    onChange={this.handleChange('alignment_code')}
                    SelectProps={{
                        native: true,
                    }}
                    margin="normal"
                    >
                    {alignments.map(option => (
                        <option key={option.code} value={option.code}>
                        {option.name}
                        </option>
                    ))}
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
                    label="Vitesse (m)"
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
                                    size_code: this.state.size_code,
                                    alignment_code: this.state.alignment_code
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
    );
    }
};

export default CreateCreature;