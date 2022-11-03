import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';

export default class Searchbar extends Component  {
    state = {
        searchQuery: '',
    }

    handleChange = (event) => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (event) => {
        const { searchQuery } = this.state;
        event.preventDefault();
        if (searchQuery.trim() === '') {
            toast.error('Please, fill in the field', {autoClose: 500});
            return;
        }
        this.props.onSubmit(searchQuery);
        this.setState({searchQuery: ''});    
    }
    render() {
        return (
            <div>
                <header>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" className='button'>
                        <span className='button-label'>Search</span>
                        </button>

                        <input
                            className='input'
                            name='searchQuery'
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            onChange={this.handleChange}
                            value={this.state.searchQuery}
                        />
                    </form>
                </header>
            </div> 
            
        )
    }
    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}