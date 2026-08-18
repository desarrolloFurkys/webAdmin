const gray = {
  900: "#141210", // Furky's ink (main text)
  800: "#3F3A33", // Paragraph
  700: "#544E45",
  600: "#857C6E", // Low Priority form Title/Text (muted)
  500: "#A39A8A",
  400: "#EAE5DC", // Border
  300: "#EFEAE0",
  200: "#F4EFE6", // Line Stroke
  100: "#F9F6F0", // Surface
  white: "#FFFFFF"
};

const textColor = {
  hint: gray[600],
  muted: gray[600],
  primary: gray[900],
  disabled: gray[400],
  secondary: gray[800]
};

const bodyColor = {
  default: "#FFFFFF",
  paper: gray["white"],
  text: textColor.primary
};

const primaryColor = {
  light: "#FBEEE4",
  main: "#E8501D",
  dark: "#CF4517",
  text: "#FBFAF7",
  100: "#FBEEE4",
  200: "#F5CDB6",
  300: "#F0AC87",
  400: "#EC8B58",
  500: "#E8501D",
  600: "#D8481A",
  700: "#C74016",
  800: "#B23813",
  900: "#8F2C0F"
};

const secondaryColor = {
  light: "#F1E7F9",
  main: "#662681",
  dark: "#54206A",
  text: "#FFFFFF",
  900: "#3E1650",
  100: "#F1E7F9"
};

const dark = { main: "#141210" };

const warningColor = {
  main: "#D9A62B",
  text: textColor.primary
};

const errorColor = {
  main: "#E8501D",
  light: "#FBEEE4",
  text: textColor.primary
};

const successColor = {
  text: textColor.primary,
  main: "#1F8A5B",
  light: "#EAF6EE"
};

const defaultColor = {
  main: textColor.primary,
  dark: textColor.primary,
  text: textColor.primary,
  light: textColor.secondary
};

const paste = {
  50: "#F5F5F5",
  100: "#DDFBF1",
  main: "#4BB4B4"
};

const marron = {
  50: "#f3f5f9",
  100: "#F6F2ED",
  main: "#BE7374"
};

export const blue = {
  100: "#DBF0FE",
  200: "#B8DEFE",
  300: "#94C9FE",
  400: "#7AB6FD",
  500: "#4E97FD",
  600: "#3975D9",
  700: "#2756B6",
  800: "#183C92",
  900: "#0E2979",
  main: "#4E97FD"
};

export const colors = {
  dark,
  gray,
  blue,
  paste,
  marron,
  text: textColor,
  body: bodyColor,
  error: errorColor,
  warn: warningColor,
  success: successColor,
  default: defaultColor,
  primary: primaryColor,
  secondary: secondaryColor
};
