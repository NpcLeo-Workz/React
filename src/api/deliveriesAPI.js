import {assertIsLoggedIn} from './utils/getUser.js';
import supabaseClient from './utils/supabaseClient.js';
import {convertFromLowerFirstCamelCaseToSnakeCase, performSupabaseQuery} from './utils/performSupabaseQuery.js';
import {useQuery} from "@tanstack/react-query";


//region Mutations & queries
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetAllOpenDeliveries = ()=>{
    return useQuery(
        ['project_react_delivery'],
        ()=> getAllOpenDeliveries(),
        {}
    )
}
//endregion

//region Supabase functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          Supabase functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all the deliveries for a given expense.
 *
 * @param expenseId {number} The id of the expense for which to retrieve the deliveries.
 * @returns {Promise<Array<{
 *     description: string | undefined,
 *     expenseId: number,
 *     price: number,
 *     trackingNumber: string | undefined,
 *     expectedDeliveryDate: Date,
 *     actualDeliveryDate: Date | undefined,
 *     importFees: number | undefined
 * }>>}
 */
const getAllDeliveriesForExpense = async ({expenseId}) => {
    await assertIsLoggedIn()

    const query = supabaseClient
        .from('project_react_delivery')
        .select('*')
        .eq('expense_id', expenseId)

    const expenses = await performSupabaseQuery(query)
    return expenses.map(e => {
        return {
            ...e,
            expectedDeliveryDate: new Date(e.expectedDeliveryDate),
            actualDeliveryDate: e?.actualDeliveryDate && new Date(e.actualDeliveryDate),
        }
    })
}

/**
 * Create a new delivery and return it.
 *
 * @param description {string | undefined} An optional description for the delivery.
 * @param expenseId {number} The id of the expense for which this delivery is added.
 * @param price {number} The shipping cost.
 * @param trackingNumber {string | undefined} An optional tracking number for the delivery.
 * @param expectedDeliveryDate {Date} The expected delivery date for the delivery.
 * @param actualDeliveryDate {Date | undefined} The actual delivery date.
 * @param importFees {number | undefined} An optional import fee paid for the delivery.
 * @returns {Promise<{
 *     description: string | undefined,
 *     expenseId: number,
 *     price: number,
 *     trackingNumber: string | undefined,
 *     expectedDeliveryDate: Date,
 *     actualDeliveryDate: Date | undefined,
 *     importFees: number | undefined
 * }>}
 */
const createDelivery = async (
    {
        description,
        expenseId,
        price,
        trackingNumber,
        expectedDeliveryDate,
        actualDeliveryDate,
        importFees
    }) => {

    await assertIsLoggedIn()

    const newDelivery = convertFromLowerFirstCamelCaseToSnakeCase({
        description,
        expenseId,
        price,
        trackingNumber,
        expectedDeliveryDate: expectedDeliveryDate?.toISOString(),
        actualDeliveryDate: actualDeliveryDate?.toISOString(),
        importFees
    })

    const query = supabaseClient
        .from('project_react_delivery')
        .insert(newDelivery)
        .select()
        .single()

    const delivery = performSupabaseQuery(query)
    delivery.expectedDeliveryDate = new Date(delivery.expectedDeliveryDate)
    delivery.actualDeliveryDate = delivery.actualDeliveryDate && new Date(delivery.actualDeliveryDate)
    return delivery
}

/**
 * Update a delivery and return the updated delivery.
 *
 * @param id {number} The id of the delivery that is to be updated.
 * @param description {string | undefined} An optional description for the delivery.
 * @param expenseId {number} The id of the expense for which this delivery is added.
 * @param price {number} The shipping cost.
 * @param trackingNumber {string | undefined} An optional tracking number for the delivery.
 * @param expectedDeliveryDate {Date} The expected delivery date for the delivery.
 * @param actualDeliveryDate {Date | undefined} The actual delivery date.
 * @param importFees {number | undefined} An optional import fee paid for the delivery.
 * @returns {Promise<{
 *     description: string | undefined,
 *     expenseId: number,
 *     price: number,
 *     trackingNumber: string | undefined,
 *     expectedDeliveryDate: Date,
 *     actualDeliveryDate: Date | undefined,
 *     importFees: number | undefined
 * }>}
 */
const updateDelivery = async (
    {
        id,
        description,
        expenseId,
        price,
        trackingNumber,
        expectedDeliveryDate,
        actualDeliveryDate,
        importFees
    }) => {

    await assertIsLoggedIn()

    const updatedDelivery = convertFromLowerFirstCamelCaseToSnakeCase({
        description,
        expenseId,
        price,
        trackingNumber,
        expectedDeliveryDate: expectedDeliveryDate?.toISOString(),
        actualDeliveryDate: actualDeliveryDate && actualDeliveryDate?.toISOString(),
        importFees,
    })

    const query = supabaseClient
        .from('project_react_delivery')
        .update(updatedDelivery)
        .select()
        .single()

    const delivery = performSupabaseQuery(query)
    delivery.expectedDeliveryDate = new Date(delivery.expectedDeliveryDate)
    delivery.actualDeliveryDate = delivery.actualDeliveryDate && new Date(delivery.actualDeliveryDate)
    return delivery
}

/**
 * Delete the delivery with the given id.
 *
 * @param id {number} The id of the delivery that is to be deleted.
 * @returns {Promise<void>}
 */
const deleteDelivery = async ({id}) => {
    await assertIsLoggedIn()

    const query = supabaseClient
        .from('project_react_delivery')
        .delete()
        .eq('id', id)

    await performSupabaseQuery(query)
}

/**
 * Retrieve all the open deliveries, including the name and the id of the expense to which they belong.
 *
 * @returns {Promise<Array<{
 *     description: string | undefined,
 *     expenseId: number,
 *     expense: {
 *         name: string,
 *         id: number
 *     },
 *     price: number,
 *     trackingNumber: string | undefined,
 *     expectedDeliveryDate: Date,
 *     actualDeliveryDate: Date | undefined,
 *     importFees: number | undefined
 * }>>}
 */
const getAllOpenDeliveries = async () => {
    await assertIsLoggedIn()

    const query = supabaseClient
        .from('project_react_delivery')
        .select('*, expense:project_react_expense(name, id)')
        .is('actual_delivery_date', null)

    const expenses = await performSupabaseQuery(query)

    return expenses.map(e => ({
        ...e,
        expectedDeliveryDate: new Date(e.expectedDeliveryDate),
    }))
}

//endregion