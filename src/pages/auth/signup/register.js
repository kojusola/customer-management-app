import React, { useState } from "react";
import BranchDetailsForm from './components/BranchDetailsForm';
import EmailConfirmationForm from './components/EmailConfirmationForm';
import CongratulationsMessage from './components/CongratulationsMessage';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import BusinessDetailsForm from './components/BusinessDetailsForm';
import UploadBvnDetails from './components/UploadBvnDetails';

import { isEmailVerified } from "libs/auth";


function Register() {

  const initStep = isEmailVerified() ? 2 : 0;

  const [formStep, setFormStep] = useState(initStep);

  const handleStepCompletion = (e) => {
    e && e.preventDefault();
    setFormStep(cur => cur + 1)
  }
  const pinHandleStepCompletion = () => {
    setFormStep(cur => cur + 1)
  }
  const goTo = step => setFormStep(step);

  return (
    <>
      {formStep === 0 && (
        <PersonalDetailsForm
          onClick={handleStepCompletion}
        />
      )}
      {formStep === 1 && (
        <EmailConfirmationForm
          onComplete={pinHandleStepCompletion}
          goTo={goTo}
        />
      )}
      {formStep === 2 && (
        <BusinessDetailsForm
          onClick={handleStepCompletion}
        />
      )}
      {formStep === 3 && (
        <BranchDetailsForm
          onClick={handleStepCompletion}
          goTo={goTo}
        />
      )}
      {formStep === 4 && (
        <UploadBvnDetails
          onClick={handleStepCompletion}
          goTo={goTo}
        />
      )}
      {formStep === 5 && (
        <CongratulationsMessage
          onClick={handleStepCompletion}
        />
      )}
    </>
  );
}

export default Register;