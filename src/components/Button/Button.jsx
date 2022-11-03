import PropTypes from 'prop-types';

const Button = ({ loadMore }) => { 
    return (
        <div>
            <button type='button' onClick={loadMore}>
                Load More
            </button>
        </div>
    )
}

export default Button;

Button.propTypes = {
    loadMore: PropTypes.func,
}