import {
  formatServicePrice,
  nutritionPlanOptions,
} from "../../../config/nutritionServices";

export function NutritionPlanOptions() {
  return (
    <div className="plan-options">
      {nutritionPlanOptions.map((option) => (
        <article className="plan-option" key={option.id}>
          <h4>
            Plan pentru {option.durationMonths}{" "}
            {option.durationMonths === 1 ? "lună" : "luni"}
          </h4>
          <p>{formatServicePrice(option.priceLei)}</p>
          <span>Termen de realizare: până la {option.deliveryDays} zile</span>
        </article>
      ))}
    </div>
  );
}
