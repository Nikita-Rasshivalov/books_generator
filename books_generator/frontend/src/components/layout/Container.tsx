import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-0 sm:pt-70 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg dark:text-gray-100 transition-colors duration-300">
    {children}
  </div>
);
