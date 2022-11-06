import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'

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
            toast.error('Please, fill in the field');
            return;
        }
        this.props.onSubmit(searchQuery);
        this.setState({searchQuery: ''});    
    }

    render() {
        const { searchQuery } = this.state;
        return (
            <div className={css.searchbar}>
                <header>
                    <form onSubmit={this.handleSubmit} className={css.searchform}>
                        <input
                            className={css.input}
                            name='searchQuery'
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            onChange={this.handleChange}
                            value={searchQuery}
                        />
                        <button type="submit" className={css.button}>
                            <span className={css.button_label}>Search</span>
                        </button>
                    </form>
                </header>
            </div> 
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}