import React, { Component } from 'react';
import LaunchResult from './LaunchResult';

class LaunchSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      searchTerm: "",
      sortField: "launch_date_utc",
      isDescending: false,
      items: [],
      filteredItems: []
    };
  }
  componentDidMount() {
    fetch("/api/launches/")
      .then(res => res.json())
      .then(results => {
        this.setState({
          items: results
        });
        this.filterResults(this.state.searchTerm, this.state.sortField, this.state.isDescending);
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        })
      });
  }
  updateSearch(event) {
    this.filterResults(event.target.value, this.state.sortField, this.state.isDescending);
  }
  toggleDescending() {
    this.filterResults(this.state.searchTerm, this.state.sortField, !this.state.isDescending);
  }
  updateSort(event) {
    this.filterResults(this.state.searchTerm, event.target.value, this.state.isDescending);
  }
  filterResults(searchTerm, sortField, isDescending) {
    var searchTermLower = searchTerm.toLowerCase();
    var updatedItems = this.state.items;
    if(searchTermLower) {
      updatedItems = updatedItems.filter(function(item){
        var searchableText = item.mission_name.toLowerCase() + (item.details || "").toLowerCase();
        return searchableText.indexOf(searchTermLower) !== -1;
      });
    }
    var sortField = sortField;
    updatedItems.sort(function(a, b){ 
      var x = a[sortField].toLowerCase();
      var y = b[sortField].toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    if(isDescending){
      updatedItems.reverse();
    }
    this.setState({
      isLoaded: true,
      searchTerm,
      sortField,
      isDescending,
      filteredItems: updatedItems
    });
  }
  render() {
    const { error, isLoaded, searchTerm, sortField, isDescending, filteredItems } = this.state;
    if(error){
      return <div className="container">Error: {error.message}</div>
    } else if(!isLoaded) {
      return <div className="container">Loading...</div>
    } 
    
    let resultList;
    if(filteredItems.length == 0) {
      resultList = <div className="container">No Results</div>
    } else {
      resultList = (
        <div>
          {filteredItems.map((result) => 
            <LaunchResult key={result.flight_number} {...result} />
          )}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="searchBox row">
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-xs">
                <i className="fa fa-search fa-lg searchIcon"></i>
              </div>
              <div className="col">
                <input className="form-control" type="text" value={searchTerm} onChange={this.updateSearch.bind(this)} placeholder="Search"></input>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="row">
              <div className="col-xs sortLabel">
                Sort by: 
              </div>
              <div className="col">
                <select className="custom-select sortSelect" id="sort" value={sortField} onChange={this.updateSort.bind(this)}>
                  <option value="launch_date_utc">Date</option>
                  <option value="mission_name">Mission Name</option>
                </select>
              </div>
              <div className="col-xs sortIcon" onClick={this.toggleDescending.bind(this)}>
                <i className={"fa fa-lg " + (isDescending ? 'fa-sort-alpha-desc' : 'fa-sort-alpha-asc')}></i>
              </div>
            </div>
          </div>
        </div>
        {resultList}
      </div>
    );
  }
}

export default LaunchSearch;
