import { useEffect } from "react";

const usePaystack = () => {

    useEffect(() => {
        const head = document.head;
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        head?.append(script);
        return () => {
            head?.remove(script)
        }
    }, [])
    const makePayment = ({ publicKey, email, firstName, lastName, amount, reference }, {
        onFinish = () => { }, onClose = () => { }
    }) => {
        // eslint-disable-next-line
        const hander = PaystackPop.setup({
            key: publicKey,
            email,
            firstname: firstName,
            lastname: lastName,
            amount: amount,
            ref: reference,
            callback: onFinish,
            onClose,
        });
        hander.openIframe();
    }
    return { makePayment }
}


export default usePaystack;