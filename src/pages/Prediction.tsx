import React, { useState } from 'react';
import { MortimerCharacter } from '../components/MortimerCharacter';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { calculateDeathPrediction } from '../utils/predictions';

interface PredictionProps {
  onComplete: (data: any) => void;
}

export const Prediction: React.FC<PredictionProps> = ({ onComplete }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    occupation: '',
    hobbies: '',
    fears: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mortimer's dialogue for each step
  const stepDialogues = [
    "Let us begin the morbid calculations. I require some information about your mortal existence...",
    "Yes, the data flows through the spectral network. Tell me more about yourself...",
    "I can see the tendrils of fate forming. Just a few more details to complete the algorithm..."
  ];
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Your identity is required for the death calculation";
        }
        if (!formData.age.trim()) {
          newErrors.age = "Your age is essential for temporal alignment";
        } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
          newErrors.age = "Enter a valid age, mortal";
        }
        break;
      case 2:
        if (!formData.location.trim()) {
          newErrors.location = "Location influences the cosmic coordinates of your demise";
        }
        if (!formData.occupation.trim()) {
          newErrors.occupation = "Your daily labors shape the pattern of your fate";
        }
        break;
      case 3:
        if (!formData.hobbies.trim()) {
          newErrors.hobbies = "Your leisure activities may hold the key to your doom";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Simulate API call to generate prediction
      setTimeout(() => {
        const prediction = calculateDeathPrediction(formData);
        onComplete(prediction);
      }, 3000);
    }
  };
  
  // Render form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input
              id="name"
              name="name"
              label="Your Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            
            <Input
              id="age"
              name="age"
              type="number"
              label="Your Age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              id="location"
              name="location"
              label="Your Location"
              placeholder="City or region where you reside"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              required
            />
            
            <Input
              id="occupation"
              name="occupation"
              label="Your Occupation"
              placeholder="How do you earn your living?"
              value={formData.occupation}
              onChange={handleChange}
              error={errors.occupation}
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <Input
              id="hobbies"
              name="hobbies"
              label="Your Hobbies"
              placeholder="What activities occupy your free time?"
              value={formData.hobbies}
              onChange={handleChange}
              error={errors.hobbies}
              required
            />
            
            <Input
              id="fears"
              name="fears"
              label="Your Greatest Fear"
              placeholder="What terrifies your mortal heart?"
              value={formData.fears}
              onChange={handleChange}
              error={errors.fears}
            />
          </>
        );
      default:
        return null;
    }
  };
  
  // Loading indicators for submission
  const renderLoadingState = () => (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF00FF] mb-4"></div>
      <p className="text-[#00FFFF] font-mono">Consulting the spectral algorithm...</p>
      <div className="mt-4 text-xs text-[#E0E0FF]/60">
        <p>Calibrating necromantic predictors...</p>
        <p>Analyzing mortality statistics...</p>
        <p>Scanning actuarial tables from beyond the veil...</p>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        {/* Title section */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-creepster text-[#FF00FF] tracking-wider mb-2">
            Death Consultation
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <div className={`h-2 w-8 rounded-full ${currentStep >= 1 ? 'bg-[#FF00FF]' : 'bg-[#2D1B69]'}`}></div>
            <div className={`h-2 w-8 rounded-full ${currentStep >= 2 ? 'bg-[#FF00FF]' : 'bg-[#2D1B69]'}`}></div>
            <div className={`h-2 w-8 rounded-full ${currentStep >= 3 ? 'bg-[#FF00FF]' : 'bg-[#2D1B69]'}`}></div>
          </div>
        </div>
        
        {/* Character and dialogue */}
        <div className="mb-4">
          <MortimerCharacter 
            speaking={true} 
            text={stepDialogues[currentStep - 1]}
          />
        </div>
        
        {/* Prediction form */}
        <Card variant="default" className="max-w-md mx-auto">
          {isSubmitting ? (
            renderLoadingState()
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                {renderFormStep()}
              </div>
              
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button 
                    variant="primary" 
                    onClick={handleNextStep}
                    className="ml-auto"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button 
                    variant="secondary" 
                    type="submit"
                    className="ml-auto"
                  >
                    Reveal My Fate
                  </Button>
                )}
              </div>
            </form>
          )}
        </Card>
        
        {/* Disclaimer */}
        <div className="text-center mt-4">
          <p className="text-xs text-[#E0E0FF]/60 font-mono">
            *Disclaimer: All predictions are for entertainment purposes only. 
            The Digital Necromancer is not responsible for any existential dread that may occur.
          </p>
        </div>
      </div>
    </div>
  );
};