import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../buttons/PrimaryButton";

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  onClose,
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep >= totalSteps;
  const isLastStep = currentStep === totalSteps - 1;

  const activeStep = stepsArray[currentStep];
  const isSubStepActive =
    activeStep?.props.showSubStep && activeStep?.props.subStep;

  const stepTitle = isSubStepActive
    ? activeStep.props.subStep.props?.title || activeStep.props.title
    : activeStep.props.title;

  const stepDescription = isSubStepActive
    ? activeStep.props.subStep.props?.description ||
      activeStep.props.description
    : activeStep.props.description;

  const stepLogo = isSubStepActive
    ? activeStep.props.subStep.props?.logo || activeStep.props.logo
    : activeStep.props.logo;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep >= totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    const activeStep = stepsArray[currentStep];

    // 👇 if this step has a subStep open, just close it
    if (activeStep?.props.showSubStep && activeStep?.props.subStep) {
      if (activeStep?.props.onCloseSubStep) {
        activeStep.props.onCloseSubStep();
      }
      return;
    }

    if (currentStep > 0) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // updateStep(totalSteps);
    onFinalStepCompleted();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]">
      <div
        className={`mx-auto w-full max-w-[600px] bg-primary rounded-[20px] border-[0.5px] border-stroke-gray shadow-xl ${stepCircleContainerClassName}`}
      >
        {/* Header */}
        <div
          className={`${stepContainerClassName} flex w-full items-center justify-between px-4 pt-6 md:px-8 md:pt-8 pb-2`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#f9f9f9] rounded-full p-1.5">
              <img
                src={stepLogo}
                alt="Logo"
                className="size-[20px] md:size-[24px]"
              />
            </div>
            <h3 className="text-md font-medium text-primary-text">
              {stepTitle}
            </h3>
          </div>

          <div className="text-xs hidden md:block font-regular text-dull-gray">
            {currentStep < totalSteps - 1
              ? `Next: ${stepsArray[currentStep + 1]?.props.title || ""}`
              : ""}
          </div>
        </div>
        <div>
          <p className="px-4 md:px-8 pb-4 text-xs text-secondary-text">
            {stepDescription}
          </p>
        </div>

        {/* Step Content */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-4 md:px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep]}
        </StepContentWrapper>

        {/* Footer */}
        {!isCompleted && (
          <div className={`px-4 md:px-8 pb-4 md:pb-8 ${footerClassName}`}>
            <div className={`mt-10 flex justify-between items-center`}>
              {currentStep !== 0 ? (
                <button
                  onClick={handleBack}
                  className={`duration-350 text-xxs cursor-pointer flex items-center gap-2 font-regular font-jetbrains-mono uppercase rounded px-2 py-1 transition  ${
                    currentStep === 0
                      ? "pointer-events-none opacity-50 text-neutral-400"
                      : "text-medium-opacity  hover:opacity-70"
                  }`}
                  {...backButtonProps}
                >
                  <img
                    src="/assets/general/back-button.svg"
                    alt="back"
                    className="size-4"
                  />
                  {stepsArray[currentStep - 1]?.props.title}
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className={`duration-350 text-xxs cursor-pointer flex items-center gap-2 font-regular rounded font-jetbrains-mono uppercase  px-2 py-1 transition text-medium-opacity hover:opacity-70`}
                  {...backButtonProps}
                >
                  <img
                    src="/assets/general/back-button.svg"
                    alt="back"
                    className="size-4"
                  />
                  Cancel
                </button>
              )}
              {!isSubStepActive && (
                <PrimaryButton
                  onClick={isLastStep ? handleComplete : handleNext}
                  loading={activeStep?.props.loading}
                  className="px-10 w-[7rem] h-[2.0rem]"
                  disabled={activeStep?.props.disabled}
                  {...nextButtonProps}
                >
                  {isLastStep ? "Complete" : nextButtonText}
                </PrimaryButton>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Watch size changes
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        onHeightReady(entry.contentRect.height);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        maxHeight: "500px", // Limit before scrolling
        overflowY: "auto", // Scroll inside if too tall
      }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

export function Step({
  children,
  title,
  disabled,
  loading,
  subStep = null,
  showSubStep = false,
  hoverSection = null,
  onCloseSubStep = null,
}) {
  return (
    <div className="px-4 md:px-8">
      {showSubStep && subStep ? subStep : children}
      {hoverSection && <div className="mt-4">{hoverSection}</div>}
    </div>
  );
}
