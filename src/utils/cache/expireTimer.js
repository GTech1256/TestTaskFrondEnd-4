/**
 * @returns timestamp
 */
export default function expiresInTimestamp() {
  const expiresIn = new Date();
  expiresIn.setMinutes(expiresIn.getMinutes() + 5);

  return {
    timeNow: (new Date()).getTime(),
    expiresIn: expiresIn.getTime(),
  };
}
