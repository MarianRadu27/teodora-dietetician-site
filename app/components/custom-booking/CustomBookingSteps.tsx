type CustomBookingStepsProps = {
  currentStep: number;
};

const steps = [
  { id: 1, label: "Modalitate" },
  { id: 2, label: "Serviciu" },
  { id: 3, label: "Data și ora" },
  { id: 4, label: "Date de contact" },
  { id: 5, label: "Confirmare" },
];

export function CustomBookingSteps({
  currentStep,
}: CustomBookingStepsProps) {
  return (
    <ol aria-label="Pașii programării" className="booking-steps custom-booking-steps">
      {steps.map((step) => {
        const status =
          step.id < currentStep
            ? "finalizat"
            : step.id === currentStep
              ? "activ"
              : "indisponibil";

        return (
          <li className={`booking-step booking-step-${status}`} key={step.id}>
            <span className="booking-step-number">{step.id}</span>
            <span>
              <strong>{step.label}</strong>
              <small>{status}</small>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
