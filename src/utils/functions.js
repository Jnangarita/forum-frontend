export const showNotify = (hook, msg, backgroundColor, position) => {
  const $q = hook;
  const colorNotify = {
    'green-2': {
      title: "Éxito",
      icon: 'las la-check',
      iconColor: "green-8"
    },
    'red-2': {
      title: "Error",
      icon: 'las la-exclamation-circle',
      iconColor: "red-8"
    },
  };
  const defaultNotify = {
    title: "Advertencia",
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
  return encodeURIComponent(title).replace(/%20/g, "-");
};