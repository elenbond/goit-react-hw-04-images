import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        setSearchQuery(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() === '') {
            toast.error('Please, fill in the field');
            return;
        }
        onSubmit(searchQuery);
        setSearchQuery('');
    };

    return (
        <div className={css.searchbar}>
            <header>
                <form onSubmit={handleSubmit} className={css.searchform}>
                    <input
                        className={css.input}
                        name='searchQuery'
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        value={searchQuery}
                    />
                    <button type="submit" className={css.button}>
                        <span className={css.button_label}>Search</span>
                    </button>
                </form>
            </header>
        </div>
    )
};

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}