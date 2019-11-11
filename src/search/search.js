import React from 'react';
class Search extends  React.Component {	
	render() {
		const {changeList} = this.props;	
		return (
			<div className="container">
				<h2 className="heading">Live Search</h2>
				<label className="search-label" htmlFor="search-input">
					<input
						type="search"					
						placeholder="Search..."
						onChange={ e => changeList(e.target.value)}
					/>					
				</label>				
			</div>
			)
	}
}
export default Search;