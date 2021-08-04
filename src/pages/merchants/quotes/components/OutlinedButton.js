import Button from '@material-ui/core/Button'

function OutlinedButton({ handleOnClicked, text }) {
    return (
        <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleOnClicked}
            style={{ textTransform: 'none' }}
        >{text}</Button>
    )
}

export default OutlinedButton
