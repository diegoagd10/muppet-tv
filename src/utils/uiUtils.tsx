import { Dimensions, ScaledSize } from "react-native";
import Orientation from "../models/Orientation";

export const getOrientation = (dimentsions: Dimensions) => {
  const screenDimensions: ScaledSize = dimentsions.get("window");
  if (screenDimensions.height < screenDimensions.width)
    return Orientation.Landscape;
  return Orientation.Portrait;
};

export const isLandscape = (dimentsions: Dimensions) => {
  return getOrientation(dimentsions) === Orientation.Landscape;
};

export const isTablet = (dimentsions: Dimensions) => {
  const screenDimensions: ScaledSize = dimentsions.get("window");
  const minDimension = Math.min(
    screenDimensions.height,
    screenDimensions.width
  );
  return minDimension >= 700;
};
