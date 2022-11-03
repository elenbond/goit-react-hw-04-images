import { TailSpin } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = () => {
    return (
        <div>
            <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                timeout={3000}
            />
        </div>
    )
}

export default Loader;

Loader.propTypes = {
    ariaLabel: PropTypes.string,
}