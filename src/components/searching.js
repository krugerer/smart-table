import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const searchRule = rules.searchMultipleFields (
        'search',
        ['date', 'customer', 'seller'],
        false
    )

    const compare = createComparison(
        ['skipEmptyTargetValues'],
        [searchRule]
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = searchField?.value || '';

        if (searchValue === '') {
            return data;
        }

        

        const target = { search: searchValue };

        return data.filter(item => compare(item, target));
    }
}