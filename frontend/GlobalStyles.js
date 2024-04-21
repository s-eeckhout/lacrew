// import { Asap_400Regular , Asap_500Medium , Asap_600SemiBold , Asap_400Regular_Italic } from "@expo-google-fonts/asap";

import { useFonts } from "expo-font";
import {
  Asap_400Regular,
  Asap_500Medium,
  Asap_600SemiBold,
  Asap_400Regular_Italic,
  Asap_700Bold,
} from "@expo-google-fonts/asap";

export const loadFonts = async () => {
  await useFonts({
    Asap_400Regular,
    Asap_500Medium,
    Asap_600SemiBold,
    Asap_400Regular_Italic,
    Asap_700Bold,
  });
};

// TODO: Fix fonts??

/* fonts */
export const FontFamily = {
  asapMedium: "Futura-Medium",
  asapRegular: "System",
  asapSemiBold: "Futura-Medium",
  asapBold: "Futura-Bold",
};
/* font sizes */
export const FontSize = {
  size_xs: 12,
  size_sm: 14,
  size_xl: 20,
  size_3xl: 25,
  size_lg: 18,
  size_base: 16,
};
/* Colors */
export const Color = {
  trueWhite: "#fff",
  colorDarkslategray: "#2c2f48",
  colorOlive: "#ac9f27",
  colorLimegreen: "#5ded46",
  labelColorLightPrimary: "#000",
  colorRed: "#de1717",
  colorPeru: "#c2742c",
  colorForestgreen: "#419f21",
  colorGainsboro: "#e1dfdf",
  colorDarkorange: "#ff890e",
};
/* Paddings */
export const Padding = {
  p_3xs: 10,
  p_xs: 12,
  p_base: 16,
  p_sm: 14,
  p_136xl: 155,
  p_8xs: 5,
};
/* border radiuses */
export const Border = {
  br_xl: 20,
  br_9xl: 28,
  br_81xl: 100,
  br_lg: 18,
  br_base: 16,
  br_5xs: 8,
  br_45xl: 64,
};
