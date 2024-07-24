import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const showNotify = ({ hook, msg, backgroundColor, position, language }) => {
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
    position: position,
  });
}

export const formatNumber = (number) => {
  return number.toLocaleString("en-US");
}

export const formatUrl = (title) => {
  return decodeURIComponent(encodeURIComponent(title).replace(/%20/g, "-")).toLowerCase();
};

export const goToAnotherScreen = (screenName, param) => {
  return { name: screenName, params: { title: formatUrl(param) } };
};

export const onImageError = (event) => {
  event.target.src = 'src/assets/img/blank-profile.png';
};

export const timeElapsed = (date) => {
  return dayjs(date).fromNow();
};