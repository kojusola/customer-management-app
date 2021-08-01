export default function ValidationError({ message }) {
    return message ? <span style={{ color: 'red', display: 'block' }}>{message}</span> : null;
}
