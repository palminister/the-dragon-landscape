export const calculateMovement = (currentMouse, previousMouse) => {
  // Calculate the delta x and y
  const dx = currentMouse.x - previousMouse.x;
  const dy = currentMouse.y - previousMouse.y;

  // Calculate the magnitude (distance)
  const magnitude = Math.sqrt(dx * dx + dy * dy);

  // Calculate the direction (angle) in radians
  const directionRadians = Math.atan2(dy, dx);

  // Convert direction from radians to degrees
  let directionDegrees = (directionRadians * 180) / Math.PI;

  // Check if the mouse is moving diagonally
  const isDiagonal = Math.abs(dx) > 0 && Math.abs(dy) > 0;

  // Inverse the rotation when moving diagonally
  if (isDiagonal) {
    directionDegrees = -directionDegrees;
  }

  return {
    magnitude: magnitude,
    directionDegrees: directionDegrees,
  };
};
