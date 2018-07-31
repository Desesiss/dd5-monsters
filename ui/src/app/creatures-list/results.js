import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import { TableSortLabel } from "@material-ui/core";


function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const tableHead = [
  {name:'frName', title:'Nom francais'},
  {name:'enName', title:'Nom anglais'},
  {name:'pv', title:'PV'},
  {name:'ca', title:'CA'},
]

class CreatureResults extends React.Component {
  constructor(props) {
    super(props);

    this.renderCellHead = this.renderCellHead.bind(this);
    this.state = {
      order: "asc",
      orderBy: "frName"
    };
  }

  handleSortRequest = property => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };
  getRange(min, max){
    if(min === max){
      return min;
    } else {
      return min + ' - ' + max;
    }
  }
  renderCellHead({name, title}){
    const { order, orderBy } = this.state;
    return(
      <TableCell
        key={name}
        sortDirection={orderBy === name ? order : false}
      >
        <Tooltip
          title="Trier"
          placement="bottom-start"
           enterDelay={300}
        >
          <TableSortLabel
            active={orderBy === name}
            direction={order}
            onClick={() => this.handleSortRequest(name)}
          >
            {title}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    );
  }
  render() {
    const { order, orderBy } = this.state;
    const {results} = this.props;
    return (
        <div>
            {results && results.length > 0 &&
                <Paper className={'paper'}>
                <Table className={'table'}>
                <TableHead>
                    <TableRow>
                    {tableHead.map(x => this.renderCellHead(x))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results
                    .slice()
                    .sort(getSorting(order, orderBy))
                    .map(n => {
                        return (
                        <TableRow key={n.id}>
                            <TableCell component="th" scope="row">
                            {n.frName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {n.enName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {this.getRange(n.pvMin, n.pvMax)}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {this.getRange(n.caMin, n.caMax)}
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </Paper>
            }
        </div>
    );
  }
}

export default CreatureResults;
