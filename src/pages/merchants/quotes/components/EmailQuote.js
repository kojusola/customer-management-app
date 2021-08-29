import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'


import { DialogTitled } from "components/Dialogs/Dialogs";
import { StyledTextField, CancelButton, OutlinedButton, Spinner, ValidationError } from "components";


//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useSelector } from "react-redux";
import { generateQuoteHTML } from "helpers";


//schemas
import { sendEmailSchema } from "validators";


function EmailQuote({ isOpen, toggle, toEmails, data }) {

    const authUser = useSelector(state => state.user.authUser);

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
        const html = generateQuoteHTML(data);
        const payload = values.sendMeCopy ? { ...values, quoteId: data?.data?.id, html, toEmails: [authUser.email].concat(values.toEmails?.split(',')) } : { ...values, quoteId: data?.data?.id, html, toEmails: values.toEmails?.split(',') }
        mutate({ key: 'quotes/email-quote', method: 'post', data: payload }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                toggle()
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            },
            onError() {
                setTimeout(() => {
                    window.location.reload()
                }, 800)
            }
        })
    }

    return (
        <DialogTitled isOpen={isOpen} toggleDialog={toggle} title="Email quote">
            <Box>
                <form noValidate onSubmit={handleSubmit(sendEmail)}>
                    <Box px={4} py={2}>
                        <Controller
                            name="toEmails"
                            control={control}
                            render={({ field }) => <StyledTextField
                                margin="normal"
                                multiline
                                label="To: Email address"
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

                        <Controller
                            name="sendMeCopy"
                            control={control}
                            render={({ field }) => <Checkbox
                                {...field}
                                inputProps={{ 'aria-label': 'Checkbox A' }}
                            />}
                        />
                        <Typography component="span">Email copy of this to yourself</Typography>
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

export default EmailQuote
