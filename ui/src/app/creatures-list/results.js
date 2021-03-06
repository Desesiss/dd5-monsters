import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import { TableSortLabel } from "@material-ui/core";

import {getRange} from '../utilities/index';
import TablePaginationActions from './pagination';

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const tableHead = [
  {label:'frName', title:'Nom francais'},
  {label:'enName', title:'Nom anglais'},
  {label:'pv', title:'PV'},
  {label:'ca', title:'CA'},
]

class CreatureResults extends React.Component {
  constructor(props) {
    super(props);

    this.renderCellHead = this.renderCellHead.bind(this);
    this.renderCellContent = this.renderCellContent.bind(this);
    this.onClickRow = this.onClickRow.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);

    this.state = {
      order: "asc",
      orderBy: "frName"
    };
  }

  handleChangePage(event, page){
    this.props._nextPage(this.props.numPerPage*page);
  };

  handleSortRequest = property => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  renderCellHead({label, title}){
    const { order, orderBy } = this.state;
    return(
      <TableCell
        key={label}
        sortDirection={orderBy === label ? order : false}
      >
        <Tooltip
          title="Trier"
          placement="bottom-start"
          enterDelay={300}
        >
          <TableSortLabel
            active={orderBy === label}
            direction={order}
            onClick={() => this.handleSortRequest(label)}
          >
            {title}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    );
  }
  renderCellContent(id, value){
    return(
        <TableCell component="th" scope="row">
          {value}
        </TableCell>
    );
  }
  onClickRow(id){
    this.props.history.push(`/file/${id}`)
  }
  render() {
    const { order, orderBy } = this.state;
    const {results} = this.props;
    return (
        <div className=''>
            {results && results.rows && results.rows.length > 0 &&
                <Paper className={'paper'}>
                <Table className={'table'}>
                <TableHead>
                    <TableRow>
                      {tableHead.map(x => this.renderCellHead(x))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.rows
                    .slice()
                    .sort(getSorting(order, orderBy))
                    .map(n => {
                        return (
                            <TableRow className='clickable' key={n.id} onClick={()=> this.onClickRow(n.id)}>
                                {this.renderCellContent(n.id, n.frName)}
                                {this.renderCellContent(n.id, n.enName)}
                                {this.renderCellContent(n.id, getRange(n.pvMin, n.pvMax))}
                                {this.renderCellContent(n.id, getRange(n.caMin, n.caMax))}
                            </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  colSpan={5}
                  count={this.props.results.count}
                  rowsPerPage={this.props.numPerPage}
                  page={this.props.page}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
            </Paper>
            }
            {(results &&  results.length === 0) &&
              <div>
                Aucun résultat.
              </div>
            }
        </div>
    );
  }
}

export default CreatureResults;
