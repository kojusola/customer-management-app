import Box from '@material-ui/core/Box'


import { DialogTitled } from "components/Dialogs/Dialogs";
import { StyledTextField, CancelButton, OutlinedButton, Spinner, ValidationError } from "components";


//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';

//schemas
import { sendEmailSchema } from "validators";


function EmailCustomers({ selected, isOpen, toggle, toEmails }) {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(sendEmailSchema),
        defaultValues: { toEmails, subject: '', message: '' }
    });
    const { mutate, isLoading } = useMutation(mutateFunction);

    const { enqueueSnackbar } = useSnackbar();

    const sendEmail = (values) => {
        mutate({ key: 'customers/send-email', method: 'post', data: { ...values, toEmails: values.toEmails?.split(',') } }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                toggle()
            }
        })
    }

    return (
        <DialogTitled isOpen={isOpen} toggleDialog={toggle} title={selected > 1 ? "Email customers" : "Email customer"}>
            <Box>
                <form noValidate onSubmit={handleSubmit(sendEmail)}>
                    <Box px={4} py={2}>
                        <Controller
                            name="toEmails"
                            control={control}
                            render={({ field }) => <StyledTextField
                                margin="normal"
                                multiline
                                label={selected > 1 ? "To: Email addresses" : "To: Email address"}
                                {...field}
                            />}
                        />
                        <ValidationError message={errors.toEmails?.message} />
                        <Controller
                            name="subject"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <StyledTextField
                                margin="normal"
                                label="Subject"
                                {...field}
                            />}
                        />
                        <ValidationError message={errors.subject?.message} />
                        <Controller
                            name="message"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <StyledTextField
                                margin="normal"
                                multiline
                                rows={4}
                                label="Message"
                                {...field}
                            />}
                        />
                        <ValidationError message={errors.message?.message} />

                        {/* <Controller
                            name="sendMeCopy"
                            control={control}
                            render={({ field }) => <Checkbox
                                {...field}
                                inputProps={{ 'aria-label': 'Checkbox A' }}
                            />}
                        />
                        <Typography component="span">I agree to the</Typography> */}
                    </Box>

                    <Box display="flex" pt={1} p={1} style={{
                        justifyContent: "flex-end",
                        backgroundColor: "#EEEBF0"
                    }}>
                        <CancelButton
                            handleOnClicked={toggle}
                        />
                        <OutlinedButton
                            text={isLoading ? <Spinner text="Sending..." /> : 'Send Email'}
                            type="submit"
                            disabled={isLoading}
                        />
                    </Box>
                </form>
            </Box>
        </DialogTitled>
    )
}

export default EmailCustomers
