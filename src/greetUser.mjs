export async function greetUser(userId, loadUser) {
  const user = await loadUser(userId);
  return `Привет, ${user.name}!`;
}
