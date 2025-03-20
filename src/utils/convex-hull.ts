// Compute convex hull
export type ConvexHullPoint = {
  x: number;
  y: number;
};

export const computeConvexHull = (
  points: ConvexHullPoint[],
): ConvexHullPoint[] => {
  if (points.length < 3) return points;

  // Find the point with lowest y-coordinate (and leftmost if tie)
  let startPoint = points[0];
  for (let i = 1; i < points.length; i++) {
    if (
      points[i].y < startPoint.y ||
      (points[i].y === startPoint.y && points[i].x < startPoint.x)
    ) {
      startPoint = points[i];
    }
  }

  // Sort points by polar angle with respect to startPoint
  const sortedPoints = [...points].sort((a, b) => {
    if (a === startPoint) return -1;
    if (b === startPoint) return 1;

    // Calculate polar angle
    const angleA = Math.atan2(a.y - startPoint.y, a.x - startPoint.x);
    const angleB = Math.atan2(b.y - startPoint.y, b.x - startPoint.x);

    return angleA - angleB;
  });

  // Graham scan algorithm
  const hull = [sortedPoints[0], sortedPoints[1]];

  for (let i = 2; i < sortedPoints.length; i++) {
    while (hull.length >= 2) {
      const a = hull[hull.length - 2];
      const b = hull[hull.length - 1];
      const c = sortedPoints[i];

      // Check if there's a right turn (cross product is negative)
      const cross = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

      if (cross >= 0) break;
      hull.pop();
    }

    hull.push(sortedPoints[i]);
  }

  return hull;
};
