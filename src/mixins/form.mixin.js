'use strict';

import { get, find } from 'lodash';

export const FormMixin = {
    provide() {
        return { parentValidator: this.$validator };
    },
    methods: {
        getError(path) {
            if (get(this.formFields, `${path}.touched`)) {
                return this.errors.first(path);
            }
        },
        setErrors(responseErrors) {
            for (const error of responseErrors) {
                this.errors.add({
                    field: error.field,
                    msg: this.$t(`errors.${error.message}`),
                });
            }
        },
        markFormTouched() {
            for (const field of Object.values(this.$validator.flags)) {
                field.touched = true;
                const firstField = this.errors.items[0].field;
                const element = find(this.$validator.fields.items, ['name', firstField]);
                element.el.scrollIntoView();
            }
        },
    },
};
