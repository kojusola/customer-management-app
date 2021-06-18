import React, {useState} from "react";
import BranchDetailsForm from './components/BranchDetailsForm';
import EmailConfirmationForm from './components/EmailConfirmationForm';
import CongratulationsMessage from './components/CongratulationsMessage';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import BusinessDetailsForm from './components/BusinessDetailsForm';
import UploadBvnDetails from './components/UploadBvnDetails';


function Register() {
    const [formStep, setFormStep] = useState(0);

    const handleStepCompletion = (e) => {
        e.preventDefault();
        console.log('works');
          setFormStep(cur => cur + 1)
      }
      const pinHandleStepCompletion = () => {
        setFormStep(cur => cur + 1)
      }

    return (
        <div>
            {formStep === 0 && (
              <PersonalDetailsForm
                    onClick= {handleStepCompletion}
                />
            )}
            {formStep === 1 && (
              <EmailConfirmationForm
                onComplete = {pinHandleStepCompletion}
                />
            )}
            {formStep === 2 && (
              <BusinessDetailsForm
                    onClick= {handleStepCompletion}
                />
            )}
            {formStep === 3 && (
              <BranchDetailsForm
                    onClick= {handleStepCompletion}
                />
            )}
            {formStep === 4 && (
              <UploadBvnDetails
                    onClick= {handleStepCompletion}
                />
            )}
            {formStep === 5 && (
              <CongratulationsMessage
                    onClick= {handleStepCompletion}
                />
            )}
        </div>
    );
}

export default Register;