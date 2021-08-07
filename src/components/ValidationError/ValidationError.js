export default function ValidationError({ message, ...rest }) {
    return message ? <span style={{ color: 'red', display: 'block', ...rest }} >{message}</span> : null;
}
