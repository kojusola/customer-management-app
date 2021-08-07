import Button from '@material-ui/core/Button'

function OutlinedButton({ handleOnClicked, text, ...rest }) {
    return (
        <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleOnClicked}
            style={{ textTransform: 'none' }}
            {...rest}
        >{text}</Button>
    )
}

export default OutlinedButton
