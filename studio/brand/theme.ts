/* ./src/brand/styles/variables.css */
import { buildLegacyTheme } from "sanity";

const props = {
  "--webriq-blue": "#093fe0",
  "--studio-white": "#ffffff",
  "--brand-secondary": "#0d1f3c",
  "--brand-secondary--inverted": "#093fe0",
  "--state-success-color": "#0f9d58",
  "--state-warning-color": "#f4b400",
  "--state-danger-color": "#db4437",
};

export const DefaultStudioTheme = buildLegacyTheme({
  /* Base theme colors */
  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": props["--studio-white"],
  "--component-text-color": props["--brand-secondary"],

  /* Brand */
  "--brand-primary": props["--webriq-blue"],

  // Default button
  "--default-button-color": "#666",
  "--default-button-primary-color": props["--webriq-blue"],
  "--default-button-success-color": props["--webriq-blue"],
  "--default-button-warning-color": props["--webriq-blue"],
  "--default-button-danger-color": props["--webriq-blue"],

  /* State */
  "--state-info-color": props["--webriq-blue"],
  "--state-success-color": props["--state-success-color"],
  "--state-warning-color": props["--state-warning-color"],
  "--state-danger-color": props["--state-danger-color"],

  /* Navbar */
  "--main-navigation-color": props["--brand-secondary"],
  "--main-navigation-color--inverted": props["--studio-white"],

  "--focus-color": props["--webriq-blue"],
});
