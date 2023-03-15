// Block definitions for functions to modify
// Ex. Arrays containing "[]" need to be replaced, and the functions in this file are meant to return
//     a new array after replacing those "[]". For example, [type] should be replaced with a type from 
//     the list of types for the current programming language

/*
const SearchBlocks = [
    {type: ['main'], array: ['int main(', '', ') {']},
    {type: ['include'], array: ['#include<', '', '>']},
    {type: ['using'], array: ['using namespace ', '', ';']},
    {type: [typeList, assign_op], array: ['[type]', '', '[assignment_op]', '', '[assignment_ex]']},
    {type: [typeList, 'function', 'definition'], array: ['[type]', '', '(', '', ') {']},
    {type: [typeList, 'prototype', 'function'], array: ['[type]', '', '(', '', ');']},
    {type: ['class', 'definition'], array: ['class ', '', '{']},
    {type: ['template', 'class', 'definition'], array: ['template<class ', '', '> class ', '', '{']},
    {type: ['template', 'method', 'definition'], array: ['template<class ', '', '> ', '', '<', '', '>::', '', '(', '', ') {']},
    {type: ['prototype', 'template'], array: ['template<class ', '', '> ', '', '<', '', '>::', '', '(', '', ');']},
    {type: ['if'], array: ['if (', '', ') {']},
    {type: ['for', 'loop'], array: ['for ([type]', '', '; ', '', '; ', '', ') {']},
    {type: ['while', 'loop'], array: ['while (', '', ') {']}    
];
*/

const SearchBlocks = [
    {type: ['main'], array: ['int main(', '', ') {']},
    {type: ['include'], array: ['#include<', '', '>']},
    {type: ['using'], array: ['using namespace ', '', ';']},

    {type: ['int'], array: ['int ', '', ' = ', '', ';']},
    {type: ['int'], array: ['int ', '', ' += ', '', ';']},
    {type: ['int'], array: ['int ', '', ' -= ', '', ';']},
    {type: ['int'], array: ['int ', '', ' *= ', '', ';']},
    {type: ['int'], array: ['int ', '', ' /= ', '', ';']},

    {type: ['long'], array: ['long ', '', ' = ', '', ';']},
    {type: ['long'], array: ['long ', '', ' += ', '', ';']},
    {type: ['long'], array: ['long ', '', ' -= ', '', ';']},
    {type: ['long'], array: ['long ', '', ' *= ', '', ';']},
    {type: ['long'], array: ['long ', '', ' /= ', '', ';']},
    
    {type: ['char'], array: ['char ', '', ' = ', '', ';']},
    {type: ['char'], array: ['char ', '', ' += ', '', ';']},
    {type: ['char'], array: ['char ', '', ' -= ', '', ';']},
    {type: ['char'], array: ['char ', '', ' *= ', '', ';']},
    {type: ['char'], array: ['char ', '', ' /= ', '', ';']},

    {type: ['double'], array: ['double ', '', ' = ', '', ';']},
    {type: ['double'], array: ['double ', '', ' += ', '', ';']},
    {type: ['double'], array: ['double ', '', ' -= ', '', ';']},
    {type: ['double'], array: ['double ', '', ' *= ', '', ';']},
    {type: ['double'], array: ['double ', '', ' /= ', '', ';']},

    {type: ['float'], array: ['float ', '', ' = ', '', ';']},
    {type: ['float'], array: ['float ', '', ' += ', '', ';']},
    {type: ['float'], array: ['float ', '', ' -= ', '', ';']},
    {type: ['float'], array: ['float ', '', ' *= ', '', ';']},
    {type: ['float'], array: ['float ', '', ' /= ', '', ';']},

    {type: ['string'], array: ['string ', '', ' = ', '', ';']},
    {type: ['string'], array: ['string ', '', ' += ', '', ';']},
    {type: ['string'], array: ['string ', '', ' -= ', '', ';']},
    {type: ['string'], array: ['string ', '', ' *= ', '', ';']},
    {type: ['string'], array: ['string ', '', ' /= ', '', ';']},

    {type: ['int', 'function'], array: ['int ', '', '(', '', ') {']},
    {type: ['long', 'function'], array: ['long ', '', '(', '', ') {']},
    {type: ['char', 'function'], array: ['char ', '', '(', '', ') {']},
    {type: ['double', 'function'], array: ['double ', '', '(', '', ') {']},
    {type: ['float', 'function'], array: ['float ', '', '(', '', ') {']},
    {type: ['string', 'function'], array: ['string ', '', '(', '', ') {']},

    {type: ['int', 'function', 'prototype'], array: ['int ', '', '(', '', ');']},
    {type: ['long', 'function', 'prototype'], array: ['long ', '', '(', '', ');']},
    {type: ['char', 'function', 'prototype'], array: ['char ', '', '(', '', ');']},
    {type: ['double', 'function', 'prototype'], array: ['double ', '', '(', '', ');']},
    {type: ['float', 'function', 'prototype'], array: ['float ', '', '(', '', ');']},
    {type: ['string', 'function', 'prototype'], array: ['string ', '', '(', '', ');']},

    {type: ['class', 'definition'], array: ['class ', '', '{']},
    {type: ['template', 'class', 'definition'], array: ['template<class ', '', '> class ', '', '{']},
    {type: ['template', 'method', 'definition'], array: ['template<class ', '', '> ', '', '<', '', '>::', '', '(', '', ') {']},
    {type: ['prototype', 'template'], array: ['template<class ', '', '> ', '', '<', '', '>::', '', '(', '', ');']},
    {type: ['if'], array: ['if (', '', ') {']},
    {type: ['for', 'loop'], array: ['for (int ', '', '; ', '', '; ', '', ') {']},
    {type: ['while', 'loop'], array: ['while (', '', ') {']}    
];

// Return an a subset of SearchBlocks based on the current input and filter
export function getBlocks(input, filter) {
    var array = [];

    // Compare input to each type of SearchBlock
    // Iterate through each type in SearchBlocks
    for (var i = 0; i < SearchBlocks.length; i++) {
        var matched = false;

        // Iterate through each string/array in SearchBlocks[i]
        for (var j = 0; j < SearchBlocks[i].type.length; j++) {
            if (!matched) {
                if (SearchBlocks[i].type[j].includes(input.toLowerCase())) {
                    matched = true;

                    console.log("This type is a string! i: ", i, " j: ", j, " SearchBlocks[i].type: ", SearchBlocks[i].type);
                    console.log("Array:, ", SearchBlocks[i], " Index: ", SearchBlocks[i].type[j], " includes ", input);
                    array.push(SearchBlocks[i].array);
                }
            }
        }
    }
    return array;
}

// Iterate through all blocks and replace all occurrences of "indicator" using the entries in the given array
// array: array to iterate through in search of indicators
// indicator: string specifying what substring to replace
// values: list containing all values to replace indicator with
// specifier: specific value from values to replace indicator with if specified
/*
function replaceIndicator(array, indicator, values, specifier = null) {
    if (array == null || values == null) {
        console.log("ReplaceIndicator error: either array or list of values were null!");
        return [];
    }

    var replacedArray = [];
    for (var i = 0; i < array.length; i++) {
        var copy = array[i];

        if (copy.includes(indicator)) {
            for (var j = 0; j < values.length; j++) {
                if (specifier != null) {
                    if (values[j].includes(specifier)) {
                        // Copy array indeces from [0, i) into temp; replace index i with copy; copy array indeces (i, length - 1] into temp
                        replacedArray.push(helper.replaceArrayIndex(array, i, copy.replace(indicator, values[j])));
                    }
                } else {
                    // Copy array indeces from [0, i) into temp; replace index i with copy; copy array indeces (i, length - 1] into temp
                    replacedArray.push(helper.replaceArrayIndex(array, i, copy.replace(indicator, values[j])));
                }
            }
        }
    }

    return replacedArray;
}
*/