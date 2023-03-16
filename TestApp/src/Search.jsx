// Block definitions for functions to modify
// Ex. Arrays containing "[]" need to be replaced, and the functions in this file are meant to return
//     a new array after replacing those "[]". For example, [type] should be replaced with a type from 
//     the list of types for the current programming language
const SearchBlocks = [
    {type: ['main'], array: ['int main(', '', ') {']},
    {type: ['include'], array: ['#include<', '', '>']},
    {type: ['using'], array: ['using namespace ', '', ';']},

    {type: ['0'], array: ['', '', ';']},
    {type: ['0'], array: ['', '', ' = ', '', ';']},
    {type: ['0'], array: ['', '', ' += ', '', ';']},
    {type: ['0'], array: ['', '', ' -= ', '', ';']},
    {type: ['0'], array: ['', '', ' *= ', '', ';']},
    {type: ['0'], array: ['', '', ' /= ', '', ';']},

    {type: ['int'], array: ['int ', '', ';']},
    {type: ['int'], array: ['int ', '', ' = ', '', ';']},
    {type: ['int'], array: ['int ', '', ' += ', '', ';']},
    {type: ['int'], array: ['int ', '', ' -= ', '', ';']},
    {type: ['int'], array: ['int ', '', ' *= ', '', ';']},
    {type: ['int'], array: ['int ', '', ' /= ', '', ';']},

    {type: ['long'], array: ['long ', '', ';']},
    {type: ['long'], array: ['long ', '', ' = ', '', ';']},
    {type: ['long'], array: ['long ', '', ' += ', '', ';']},
    {type: ['long'], array: ['long ', '', ' -= ', '', ';']},
    {type: ['long'], array: ['long ', '', ' *= ', '', ';']},
    {type: ['long'], array: ['long ', '', ' /= ', '', ';']},
    
    {type: ['char'], array: ['char ', '', ';']},
    {type: ['char'], array: ['char ', '', ' = ', '', ';']},
    {type: ['char'], array: ['char ', '', ' += ', '', ';']},
    {type: ['char'], array: ['char ', '', ' -= ', '', ';']},
    {type: ['char'], array: ['char ', '', ' *= ', '', ';']},
    {type: ['char'], array: ['char ', '', ' /= ', '', ';']},

    {type: ['double'], array: ['double ', '', ';']},
    {type: ['double'], array: ['double ', '', ' = ', '', ';']},
    {type: ['double'], array: ['double ', '', ' += ', '', ';']},
    {type: ['double'], array: ['double ', '', ' -= ', '', ';']},
    {type: ['double'], array: ['double ', '', ' *= ', '', ';']},
    {type: ['double'], array: ['double ', '', ' /= ', '', ';']},

    {type: ['float'], array: ['float ', '', ';']},
    {type: ['float'], array: ['float ', '', ' = ', '', ';']},
    {type: ['float'], array: ['float ', '', ' += ', '', ';']},
    {type: ['float'], array: ['float ', '', ' -= ', '', ';']},
    {type: ['float'], array: ['float ', '', ' *= ', '', ';']},
    {type: ['float'], array: ['float ', '', ' /= ', '', ';']},

    {type: ['string'], array: ['string ', '', ';']},
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
        var matched = false; // Ensure that only one string from each type can be a match

        // Iterate through each string/array in SearchBlocks[i]
        for (var j = 0; j < SearchBlocks[i].type.length; j++) {
            if (!matched) {
                if (SearchBlocks[i].type[j].includes(input.toLowerCase())) {
                    matched = true;

                    // If filter is not null, only push the matched array if the a string in the array includes the filter
                    if (filter != null) {
                        var filterMatch = false; // Ensure that the array can only be pushed once after the filter is matched for the first time
                        for (var k = 0; k < SearchBlocks[i].array.length; k++) {    // Iterate through the matched block's array
                            if (!filterMatch) {                                     // If the array has not been found to include the filter
                                if (SearchBlocks[i].array[k].includes(filter)) {    // If the array includes the filter
                                    filterMatch = true;                             // Prevent the array from being pushed multiple times by showing it has been matched
                                    array.push(SearchBlocks[i].array);              // Push the array only once
                                }                                                   // Do not do anything if the array does not include the filter
                            }                                                       // Do not do anything if the filter has already been matched
                        }
                    } else {
                        array.push(SearchBlocks[i].array);
                    }
                }
            }
        }
    }
    return array;
}