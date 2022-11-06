import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ loadMore }) => { 
    return (
        <div>
            <button type='button' onClick={loadMore} className={css.button}>
                Load More
            </button>
        </div>
    )
}

export default Button;

Button.propTypes = {
    loadMore: PropTypes.func,
}