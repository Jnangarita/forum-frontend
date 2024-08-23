import { constants } from "./constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const util = {
  notification: {
    /**
     * Displays a notification using the `$q` object from the Quasar Framework.
     *
     * @param {Object} hook - The $q object from the Quasar Framework used to display notifications.
     * @param {string} msg - Message to be displayed in the notification.
     * @param {string} [backgroundColor='yellow-2'] - Background color of the notification. Possible values: `green-2`, `red-2`, etc.
     * @param {Function} language - Function to get the text of messages in the desired language.
     */
    showNotify: ({ hook, msg, backgroundColor = 'yellow-2', language }) => {
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
    },

    /**
     * Validates if an input value meets a condition and returns a message if it does not.
     *
     * @param {string} msg - Error message to display if validation fails.
     * @returns {Function} - Function that validates the input value.
     */
    validateQInput: (msg) => {
      return (val) => (val && val.length > 0) || msg;
    },

    /**
     * Validates that a selected value exists and is non-empty.
     *
     * @param {string} msg - The error message to be returned if the validation fails.
     * @returns {function} Function that validates the select value
     */
    validateQselect: (msg) => {
      return (val) => (val && val.value?.length > 0) || msg;
    }
  },

  formatting: {
    /**
     * Formats a number with thousands separators.
     *
     * @param {number} number - Number to format.
     * @returns {string} - Formatted number as a string with thousands separators.
     */
    formatNumber: (number) => {
      return number.toLocaleString("en-US");
    },

    /**
     * Converts a title into a URL-friendly.
     *
     * @param {string} title - Title to convert.
     * @returns {string} - URL-friendly string in lowercase with hyphens instead of spaces.
     */
    formatUrl: (title) => {
      return decodeURIComponent(encodeURIComponent(title).replace(/%20/g, "-")).toLowerCase();
    },

    /**
     * Calculates the time elapsed from a given date to the current moment.
     *
     * @param {string|Date} date - Date from which to calculate the elapsed time.
     * @returns {string} - Elapsed time in a relative format (e.g., "5 minutes ago").
     */
    timeElapsed: (date) => {
      return dayjs(date).fromNow();
    },

    /**
     * Converts a full date into a string formatted as `YYYY-MM-DD`.
     *
     * @param {string | number | Date} fullDate - The date to be formatted.
     * @returns {string} - The formatted date in the `YYYY-MM-DD` style.
     */
    formatDate: (fullDate) => {
      const date = new Date(fullDate);
      return date.toLocaleDateString('en-CA');
    }
  },

  navigation: {
    /**
     * Generates a route object to navigate to another screen in a `Vue.js` application.
     *
     * @param {string} screenName - Name of the screen to navigate to.
     * @param {string} param - Parameter to include in the route.
     * @returns {Object} - Route object with screen name and parameters.
     */
    goToAnotherScreen: (screenName, param) => {
      return { name: screenName, params: { title: util.formatting.formatUrl(param) } };
    },

    /**
     * Navigates to the previous screen in the navigation history.
     *
     * @param {Object} router - The instance of `vue-router`. This should be obtained using `useRouter()` within a `Vue.js` component.
     */
    goToPreviousScreen: (router) => {
      router.back();
    }
  },

  imageHandling: {
    /**
     * Handles image load error and sets a default profile image.
     *
     * @param {Event} event - Image load error event.
     */
    onImageError: (event) => {
      event.target.src = constants.BLANK_IMG;
    }
  }
}

/**
 * Delete information from localStorage
 */
export const deleteInfoLocalStorage = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userInfo');
};

export { util }