import SimpSelect from "./simpSelect/SimpSelect.vue";

const useSelect = {
  install: function (app: { component: (a: string, b: unknown) => void }) {
    app.component("SimpSelect", SimpSelect);
  },
};

export { SimpSelect, useSelect };
