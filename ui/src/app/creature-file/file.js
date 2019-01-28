import React, { Component } from 'react'
import {getRange, displayField, displayList, displayDistance} from '../utilities/index';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";



class CreatureFileData extends Component {

  render() {
    const {
      frName, 
      enName, 
      pvMin, 
      pvMax,
      caMin, 
      caMax, 
      types, // TO IMPLEMENT  
      size, 
      alignment, 
       // TO IMPLEMENT  :
      senses, 
      skills,
      languages, 
      speed, 
      strength, 
      dexterity, 
      constitution, 
      intelligence, 
      wisdom, 
      charisma, 
      challengeRating, 
      savingThrows,
      vulnerabilities,
      immunities,
      resistances,
      conditions,
      specialTraits,
      actions,
      reactions,
      legendaryActions,
      description
    } = this.props.data;

    return (
      <div className='data-card'>
        <h1>{frName + ' ('+enName+')'}</h1>
        <h5>{(types ? types.join(', ') : '') + (size ? ' de taille ' + size : '') + ', ' + (alignment ? alignment : '')}</h5>
        <div><svg><polyline points="0,0 1000,2.5 0,5" ></polyline></svg></div>
        {displayField('Points de vie', getRange(pvMin, pvMax))}
        {displayField('Classe d\'armure', getRange(caMin, caMax))}
        {displayField('Vitesse', displayDistance(speed))}
        <hr/>
        <div><svg><polyline points="0,0 1000,2.5 0,5" ></polyline></svg></div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">FOR</TableCell>
              <TableCell align="right">DEX</TableCell>
              <TableCell align="right">CON</TableCell>
              <TableCell align="right">INT</TableCell>
              <TableCell align="right">SAG</TableCell>
              <TableCell align="right">CHA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="right">{strength ? strength + ' (' + (10-strength)/2 + ')' : ''}</TableCell>
                <TableCell align="right">{dexterity ? dexterity + ' (' + (10-dexterity)/2 + ')' : ''}</TableCell>
                <TableCell align="right">{constitution ? constitution + ' (' + (10-constitution)/2 + ')' : ''}</TableCell>
                <TableCell align="right">{intelligence ? intelligence + ' (' + (10-intelligence)/2 + ')' : ''}</TableCell>
                <TableCell align="right">{wisdom ? wisdom + ' (' + (10-wisdom)/2 + ')' : ''}</TableCell>
                <TableCell align="right">{charisma ? charisma + ' (' + (10-charisma)/2 + ')' : ''}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <div><svg><polyline points="0,0 1000,2.5 0,5" ></polyline></svg></div>
        {displayList('Jets de sauvegarde', savingThrows)}
        {displayList('Compétences', skills)}
        {displayList('Vulnérabilités aux dégâts', vulnerabilities)}
        {displayList('Résistances aux dégâts', resistances)}
        {displayList('Immunités aux dégâts', immunities)}
        {displayList('Immunités aux conditions', conditions)}
        {displayList('Sens', senses)}
        {displayList('Langues', languages)}
        {displayField('Puissance', challengeRating)}
        <div><svg><polyline points="0,0 1000,2.5 0,5" ></polyline></svg></div>
        {specialTraits && specialTraits.length > 0 && 
          specialTraits.map(item => displayField(item.label, item.value))
        }
        <div><svg><polyline points="0,0 1000,2.5 0,5" ></polyline></svg></div>
        {actions && actions.length > 0 && 
          <h2>Actions</h2>
        }
        {actions && actions.length > 0 && 
          actions.map(item => displayField(item.label, item.value))
        }
        {reactions && reactions.length > 0 && 
          <h2>Réactions</h2>
        }
        {reactions && reactions.length > 0 && 
          reactions.map(item => displayField(item.label, item.value))
        }
        {legendaryActions && legendaryActions.length > 0 && 
          <h2>Actions légendaires</h2>
        }
        {legendaryActions && legendaryActions.length > 0 && 
          legendaryActions.map(item => displayField(item.label, item.value))
        }
        <h2>Description</h2>
        {/* TODO : rich text plugin */}
        {description}
      </div>
    )
  }
}

export default CreatureFileData