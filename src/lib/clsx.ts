export const clsx = (...classNames: (string | boolean)[]) =>
  classNames.filter(Boolean).join(" ")
