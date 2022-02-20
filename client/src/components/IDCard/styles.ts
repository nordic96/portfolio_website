import { makeStyles } from '@mui/styles';

export default makeStyles({
    introLabel: {
        color: '#ffffff',
        fontSize: 14,
    },
    introTitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 36,
    },
    cardContainer: {
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
        top: 20,
        backgroundColor: '#F8F8F8',
        color: '#404c55',
        width: 280,
        height: 420,
        borderRadius: 25,
        verticalAlign: 'middle',
    },
    container: {
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
    },
    descContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '40vw',
        textAlign: 'left',
        gap: 32,
    },
});
