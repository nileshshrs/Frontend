import { NavigateOptions, To } from "react-router-dom";

let navigateFn: (to: To, options?: NavigateOptions) => void = () => {
    console.error("Navigate function is not set. Call setNavigate() first.");
};

export const setNavigate = (fn: (to: To, options?: NavigateOptions) => void): void => {
    if (typeof fn === "function") {
        navigateFn = fn;
    } else {
        console.error("Navigate must be a function");
    }
};

export const navigate = (path: To, options?: NavigateOptions): void => {
    navigateFn(path, options);
};
