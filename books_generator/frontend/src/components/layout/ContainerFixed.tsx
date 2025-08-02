import { ReactNode } from "react";

export const ContainerFixed = ({ children }: { children: ReactNode }) => (
  <div className="static sm:fixed pt-0 top-0 left-0 right-0 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-2 bg-white dark:bg-gray-800 rounded-b-lg shadow-md dark:shadow-lg dark:text-gray-100 transition-colors duration-300 z-50 text-xs sm:text-base mb-0 xs:mb-1 sm:mb-0">
    {children}
  </div>
);
