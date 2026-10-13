export function calculateTotal(price, quantity) {
  if (quantity < 0) {
    throw new Error("Количество не может быть отрицательным");
  }
  return price * quantity;
}
