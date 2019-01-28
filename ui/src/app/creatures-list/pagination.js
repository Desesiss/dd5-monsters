import React from "react";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);

    this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this);
  }

    handleFirstPageButtonClick(event){
      this.props.onChangePage(event, 0);
    } 
    handleBackButtonClick(event){
        this.props.onChangePage(event, this.props.page-1);
    } 
    handleNextButtonClick(event){
        this.props.onChangePage(event, this.props.page+1);
    } 
    handleLastPageButtonClick(event){
        this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    } 

  render() {
    const {count, rowsPerPage, page} = this.props;
    return (
        <div className='pagination-icons'>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <Icon>first_page</Icon>
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <Icon>chevron_right</Icon>
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <Icon>last_page</Icon>
        </IconButton>
      </div>
    );
  }
}

export default TablePaginationActions;
