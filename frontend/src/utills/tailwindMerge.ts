import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
export function cn(...classes: classNames.ArgumentArray) {
  return twMerge(classNames(...classes));
}
