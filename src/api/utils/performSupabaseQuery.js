import {camelCase, snakeCase} from 'lodash';

export const performSupabaseQuery = async (query) => {
    const {data, error} = await query

    if (error) {
        throw error
    }

    return convertFromSnakeCaseToLowerFirstCamelCase(data)
}

/**
 * Check if something is an object but not an array, null, a function or any other type of object.
 *
 * @param input {any} The value to perform the check for.
 * @output {boolean} True if input is an object, or else false.
 */
const isObject = (input) => {
    return input.toString() === '[object Object]'
}

/**
 * Recursively convert an object or an array of objects to lowerFirstCamelCase. {example_key: 'example_value'} would
 * be converted to {exampleKey: 'example_Value'} and [{example_key: 'example_value'}] to [{exampleKey: 'example_value'}].
 *
 * @param input {any} Any object with string keys or else an array of such objects.
 */
export const convertFromSnakeCaseToLowerFirstCamelCase = (input) => {
    if (!input) {
        return input
    }

    if (Array.isArray(input)) {
        return input.map(x => convertObjectFromSnakeCaseToLowerFirstCamelCase(x))
    }
    return convertObjectFromSnakeCaseToLowerFirstCamelCase(input)
}

/**
 * Recursively convert an object to lowerFirstCamelCase. {example_key: 'example_value'} would be converted to
 * {exampleKey: 'example_Value'}.
 *
 * @param input {any} Any object with string keys.
 */
const convertObjectFromSnakeCaseToLowerFirstCamelCase = (input) => {
    const output = {}
    const keys = Object.keys(input)

    for (const key of keys) {
        if (!input[key]) {
            continue
        }

        if (isObject(input[key])) {
            output[camelCase(key)] = convertObjectFromSnakeCaseToLowerFirstCamelCase(input[key])
        } else {
            output[camelCase(key)] = input[key]
        }
    }
    return output
}

/**
 * Recursively convert an object or an array of objects to snake_case. {exampleKey: 'example_value'} would
 * be converted to {example_key: 'example_Value'} and [{exampleKey: 'example_value'}] to
 * [{example_key: 'example_value'}].
 *
 * @param input {any} Any object with string keys or else an array of such objects.
 */
export const convertFromLowerFirstCamelCaseToSnakeCase = (input) => {
    if (!input) {
        return input
    }

    if (Array.isArray(input)) {
        return input.map(x => convertFromLowerFirstCamelCaseToSnakeCase(x))
    }
    return convertObjectFromLowerFirstCamelCaseToSnakeCase(input)
}

/**
 * Recursively convert an object to lowerFirstCamelCase. {example_key: 'example_value'} would be converted to
 * {exampleKey: 'example_Value'}.
 *
 * @param input {any} Any object with string keys.
 */
const convertObjectFromLowerFirstCamelCaseToSnakeCase = (input) => {
    const output = {}
    const keys = Object.keys(input)

    for (const key of keys) {
        if (!input[key]) {
            continue
        }

        if (isObject(input[key])) {
            output[snakeCase(key)] = convertObjectFromSnakeCaseToLowerFirstCamelCase(input[key])
        } else {
            output[snakeCase(key)] = input[key]
        }
    }
    return output
}
