'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
// import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
const IntlTelInput = dynamic(() => import('react-intl-tel-input'), {});

const Input = () => {

    const [code, setCode] = useState(0);
    const [phone, setPhone] = useState("");
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
    const [errorBag, setErrorBag] = useState({
        otp: "",
        email: "",
        code: "",
        phone: "",
        confirm_password: "",
        password: "",
    });

    const formatMobileNumber = (mobileNumber) => {

        mobileNumber = mobileNumber.replace(/[^0-9]/g, "");
        if (mobileNumber.charAt(0) == 0) {
            mobileNumber = mobileNumber.slice(1);
        }
        return mobileNumber;
    }

    return (
        <>
            <IntlTelInput
                format={true}
                numberType="MOBILE"
                onSelectFlag={(phone, country, formattedPhoneNumber, isValid) => {

                    let errorBagLocal = { ...errorBag };
                    if (isValid === false) {
                        errorBagLocal['phone'] = "* " + 'Please enter valid number.';
                    } else {
                        errorBagLocal['phone'] = "";
                    }
                    phone = formatMobileNumber(phone);
                    setPhone("");
                    setCode(country.dialCode);
                    setFormattedPhoneNumber("");
                    setErrorBag(errorBagLocal);
                    // setResponseErrors("");
                }}
                onPhoneNumberChange={(isValid, phone, country, formattedPhoneNumber) => {

                    phone = formatMobileNumber(phone);
                    setPhone(phone);
                    setCode(country.dialCode);
                    setFormattedPhoneNumber(formattedPhoneNumber);
                }}

                onPhoneNumberBlur={(isValid, phone, country) => {

                    let errorBagLocal = { ...errorBag };
                    if (isValid === false) {
                        errorBagLocal['phone'] = "* " + 'Please enter valid number.';
                    } else {
                        errorBagLocal['phone'] = "";
                    }
                    setErrorBag(errorBagLocal);
                    // setResponseErrors("");

                }}
            />
            <div className="form-list">
                <span className="text-danger" dangerouslySetInnerHTML={{ __html: errorBag.phone }} />
                <span className="text-danger" dangerouslySetInnerHTML={{ __html: errorBag.code }} />
            </div>
        </>
    );
}

export default Input;
