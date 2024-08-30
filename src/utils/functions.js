import { constants } from "./constants";
import { i18n } from 'boot/i18n';
import { Notify } from 'quasar'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const t = i18n.global.t;

const util = {
  notification: {
    /**
     * Display a notification to the user.
     *
     * @param {string} msg - Message to be displayed in the notification.
     * @param {string} [bgColor='yellow-2'] - Background color of the notification. Possible values: `green-2`, `red-2`, etc.
     */
    showNotify: ({ msg, bgColor = 'yellow-2' }) => {
      const colorNotify = {
        'green-2': {
          title: t('success'),
          icon: 'las la-check',
          iconColor: "green-8"
        },
        'red-2': {
          title: t('error'),
          icon: 'las la-exclamation-circle',
          iconColor: "red-8"
        },
      };
      const defaultNotify = {
        title: t('warning'),
        icon: "las la-exclamation-triangle",
        iconColor: "yellow-8"
      };
      const { title, icon, iconColor } = colorNotify[bgColor] || defaultNotify;
      Notify.create({
        message: title,
        caption: msg,
        icon: icon,
        iconColor: iconColor,
        textColor: 'dark',
        color: bgColor,
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
  },

  storage: {
    /**
     * Delete information from localStorage
     */
    deleteInfoLocalStorage: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userInfo');
    }
  }
}

export { util }