import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
        }))
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parentElement = action.parentNode;
            const inputElement = parentElement.querySelector('input');
            if (inputElement) {
                inputElement.value = '';

                const fieldName = action.dataset.field;
                state[fieldName] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const target = {};

        if (state.seller && state.seller !== 'all') {
            target.seller = state.seller;
        }

        const totalFrom = state.totalFrom ? Number(state.totalFrom) : undefined;
        const totalTo = state.totalTo ? Number(state.totalTo) : undefined;

        if (totalFrom !== undefined || totalTo !== undefined) {
            target.total = [totalFrom, totalTo];
        }


        return data.filter(row => compare(row,target));
    }
}