import Button from '@material-ui/core/Button'


function CancelButton({ handleOnClicked, text = "Cancel" }) {
    return (
        <Button
            variant="text"
            color="primary"
            onClick={handleOnClicked}
            style={{ textTransform: 'none' }}
        >{text}</Button>

    )
}

export default CancelButton
