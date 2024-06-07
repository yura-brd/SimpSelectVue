import SimpSelect from "./simpSelect/SimpSelect.vue";
declare const useSelect: {
    install: (app: {
        component: (a: string, b: unknown) => void;
    }) => void;
};
export { SimpSelect, useSelect };
