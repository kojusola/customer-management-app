import React, {useState} from "react";
import BranchDetailsForm from './components/BranchDetailsForm'
import PersonalDetailsForm from './components/PersonalDetailsForm'
import BusinessDetailsForm from './components/BusinessDetailsForm'


function Register() {
    const [formStep, setFormStep] = useState(0);

    const handleStepCompletion = (e) => {
        e.preventDefault();
        console.log('works');
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
              <BusinessDetailsForm
                    onClick= {handleStepCompletion}
                />
            )}
            {formStep === 2 && (
              <BranchDetailsForm
                    onClick= {handleStepCompletion}
                />
            )}
        </div>
    );
}

export default Register;