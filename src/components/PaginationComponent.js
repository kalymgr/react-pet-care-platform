import React, {Component} from 'react';
import { Button } from 'reactstrap';

const clickNextPageButton = () =>
{

}

export class Pagination extends Component {

    constructor(props) {
        super(props);
        this.clickNextPageButton = this.clickNextPageButton.bind(this);
        this.clickPrevPageButton = this.clickPrevPageButton.bind(this);

        // initialize prev page and next page buttons attributes
        this.prevPageButtonDisabled = false;  
        this.nextPageButtonDisabled = false;
    }

    /**
     * Method called when next page button is clicked
     */
    clickNextPageButton() {
        let pageNo = this.props.pageNumber;  // get the page number
        pageNo++;  // increase the page number by one
        this.props.getDataPage(pageNo);  // get the data

    }

    clickPrevPageButton() {
        let pageNo = this.props.pageNumber;  // get the page number
        pageNo--;  // increase the page number by one
        this.props.getDataPage(pageNo);  // get the data
    }

    render() {
        if (this.props.pageNumber == 1)  // case of first page. Previous page button must be disabled.
            this.prevPageButtonDisabled = true;
        return (
            <div className="row">
                <div className="col-12">
                    <Button id="prevPageButton" disabled={this.prevPageButtonDisabled} outline onClick={this.clickPrevPageButton}>Prev page</Button>
                    <Button id="nextPageButton" disabled={this.nextPageButtonDisabled} outline onClick={this.clickNextPageButton}>Next page</Button>
                </div>
            </div>
        )
    }
    
}



