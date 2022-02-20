import { makeStyles } from '@mui/styles';
import Background from '../../assets/images/background.jpeg';

export default makeStyles({
    container: {
        background: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: '#fffffff',
    },
});
