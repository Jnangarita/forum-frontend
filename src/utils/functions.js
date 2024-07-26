import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * Displays a notification using the $q object from the Quasar Framework.
 *
 * @param {Object} hook - The $q object from the Quasar Framework used to display notifications.
 * @param {string} msg - Message to be displayed in the notification.
 * @param {string} [backgroundColor='yellow-2'] - Background color of the notification. Possible values: 'green-2', 'red-2', etc.
 * @param {Function} language - Function to get the text of messages in the desired language.
 */
export const showNotify = ({ hook, msg, backgroundColor = 'yellow-2', language }) => {
  const $q = hook;
  const colorNotify = {
    'green-2': {
      title: language('success'),
      icon: 'las la-check',
      iconColor: "green-8"
    },
    'red-2': {
      title: language('error'),
      icon: 'las la-exclamation-circle',
      iconColor: "red-8"
    },
  };
  const defaultNotify = {
    title: language('warning'),
    icon: "las la-exclamation-triangle",
    iconColor: "yellow-8"
  };
  const { title, icon, iconColor } = colorNotify[backgroundColor] || defaultNotify;
  $q.notify({
    message: title,
    caption: msg,
    icon: icon,
    iconColor: iconColor,
    textColor: 'dark',
    color: backgroundColor,
    position: 'top-right',
  });
}

/**
 * Formats a number with thousands separators.
 *
 * @param {number} number - Number to format.
 * @returns {string} - Formatted number as a string with thousands separators.
 */
export const formatNumber = (number) => {
  return number.toLocaleString("en-US");
}

/**
 * Converts a title into a URL-friendly.
 *
 * @param {string} title - Title to convert.
 * @returns {string} - URL-friendly string in lowercase with hyphens instead of spaces.
 */
export const formatUrl = (title) => {
  return decodeURIComponent(encodeURIComponent(title).replace(/%20/g, "-")).toLowerCase();
};

/**
 * Generates a route object to navigate to another screen in a Vue.js application.
 *
 * @param {string} screenName - Name of the screen to navigate to.
 * @param {string} param - Parameter to include in the route.
 * @returns {Object} - Route object with screen name and parameters.
 */
export const goToAnotherScreen = (screenName, param) => {
  return { name: screenName, params: { title: formatUrl(param) } };
};

/**
 * Handles image load error and sets a default profile image.
 *
 * @param {Event} event - Image load error event.
 */
export const onImageError = (event) => {
  event.target.src = 'src/assets/img/blank-profile.png';
};

/**
 * Calculates the time elapsed from a given date to the current moment.
 *
 * @param {string|Date} date - Date from which to calculate the elapsed time.
 * @returns {string} - Elapsed time in a relative format (e.g., "5 minutes ago").
 */
export const timeElapsed = (date) => {
  return dayjs(date).fromNow();
};

/**
 * Validates if an input value meets a condition and returns a message if it does not.
 *
 * @param {string} msg - Error message to display if validation fails.
 * @returns {Function} - Function that validates the input value.
 */
export const validateQInput = (msg) => {
  return (val) => (val && val.length > 0) || msg;
}