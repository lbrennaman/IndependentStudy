const typeList = [
    ' int ',
    ' long ',
    ' float ',
    ' double ',
    ' char ',
    ' bool ',
    ' string '
];

const assign_op = [
    ' = ',
    ' += ',
    ' -= ',
    ' *= ',
    ' /= ',
    ' %= ',
    ' &= ',
    ' |= ',
    ' ^= ',
];

// Block definitions for functions to modify
// Ex. Arrays containing "[]" need to be replaced, and the functions in this file are meant to return
//     a new array after replacing those "[]". For example, [type] should be replaced with a type from 
//     the list of types for the current programming language
const SearchBlocks = [
    {type: ['main'], array: ['int main(', '', ') {']},
    {type: ['include'], array: ['#include<', '', '>']},
    {type: ['using'], array: ['using namespace ', '', ';']},
    {type: [typeList, assign_op], array: ['[type]', '', '[assignment_op]', '', '[Assignment_Extender]']},
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

// Return an a subset of SearchBlocks based on the current input and filter
export function getBlocks(input, filter) {
    var array = [];

    // Compare input to each type of SearchBlock
    // Iterate through each type in SearchBlocks
    for (var i = 0; i < SearchBlocks.length; i++) {
        // Iterate through each string/array in type i
        for (var j = 0; j < SearchBlocks[i].type.length; j++) {
            // If type i is an array,
            if (typeof(SearchBlocks[i].type[j]) !== 'string') {
                // Iterate through each string in type i
                for (var k = 0; k < SearchBlocks[i].type[j].length; k++) {
                    // console.log("Index: ", SearchBlocks[i].type[j][k], " input: ", input, " include: ", SearchBlocks[i].type[j][k].includes(input));
                    if (SearchBlocks[i].type[j][k].includes(input)) {
                        console.log("Array:, ", SearchBlocks[i].type[j], " Index: ", SearchBlocks[i].type[j][k], " includes ", input);
                        array.push(SearchBlocks[i].array);
                    }
                }
            } else { // Else, type i is a string
                if (SearchBlocks[i].type[j].includes(input)) {
                    // console.log("Array:, ", SearchBlocks[i], " Index: ", SearchBlocks[i].type[j], " includes ", input);
                    array.push(SearchBlocks[i].array);
                }
            }
        }
    }
    return array;
}