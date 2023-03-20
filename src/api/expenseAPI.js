import {assertIsLoggedIn, getUser} from './utils/getUser.js';
import {convertFromLowerFirstCamelCaseToSnakeCase, performSupabaseQuery} from './utils/performSupabaseQuery.js';
import supabaseClient from './utils/supabaseClient.js';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

//region Mutations & queries
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */
export const useGetAllExpensesForMonth = ({month, year}) =>{
    return useQuery(
        ['project_react_expense', month,year],
        ()=> getAllExpensesForMonth({month,year}),
        {}
    )
}
export const useGetExpenses = (Id)=>{
    return useQuery(
        ['project_react_expense', Id],
        ()=> getExpense(Id),
        {}
    )
}
export const useCreateExpense = ()=>{
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn:  createExpense,
        onSettled: async ()=>{
            await queryClient.invalidateQueries(['project_react_expense'])
        }
    })
}

//endregion

//region Supabase functions
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          Supabase functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all expenses for a given month.
 *
 * @param month {number} Number between 1 and 12, indicating the month for which to retrieve the expenses.
 * @param year {number} The year for which to retrieve the expenses.
 * @returns {Promise<Array<{
 *     name: string,
 *     amount: number,
 *     originalCurrencyId: undefined | number,
 *     originalCurrencyAmount: undefined | number,
 *     originalCurrency: undefined | {
 *         id: number,
 *         iso: string,
 *         name: string,
 *         symbol: string
 *     },
 *     date: Date,
 *     categoryId: number,
 *     category: {
 *         id: number,
 *         name: string
 *     },
 *     description: string | undefined,
 *     profileId: string,
 * }>>}
 */
const getAllExpensesForMonth = async ({month, year}) => {
    await assertIsLoggedIn()

    const minDate = new Date(year, month - 1, 1)
    const maxDate = new Date(year, month, 1)

    const query = supabaseClient
        .from('project_react_expense')
        .select('*, originalCurrency:project_react_currency(*), category:project_react_category(*)')
        .gte('date', minDate.toISOString())
        .lt('date', maxDate.toISOString())

    const expenses = await performSupabaseQuery(query)
    return expenses.map(e => ({...e, date: new Date(e.date)}))
}

/**
 * Retrieve all expenses for a given year.
 *
 * @param year {number} The year for which to retrieve the expenses.
 * @returns {Promise<Array<{
 *     name: string,
 *     amount: number,
 *     originalCurrencyId: undefined | number,
 *     originalCurrencyAmount: undefined | number,
 *     originalCurrency: undefined | {
 *         id: number,
 *         iso: string,
 *         name: string,
 *         symbol: string
 *     },
 *     date: Date,
 *     categoryId: number,
 *     category: {
 *         id: number,
 *         name: string
 *     },
 *     description: string | undefined,
 *     profileId: string,
 * }>>}
 */
export const getAllExpensesForYear = async ({year}) => {
    await assertIsLoggedIn()

    const minDate = new Date(year, 0, 1)
    const maxDate = new Date(year + 1, 0, 1)

    const query = supabaseClient
        .from('project_react_expense')
        .select('*, originalCurrency:project_react_currency(*), category:project_react_category(*)')
        .gte('date', minDate.toISOString())
        .lt('date', maxDate.toISOString())

    const expenses = await performSupabaseQuery(query)
    return expenses.map(e => ({...e, date: new Date(e.date)}))
}

/**
 * Create a new expense and return it.
 *
 * @param name {string} The name of the new expense.
 * @param amount {number} The amount of money spend on the new expense in the default currency.
 * @param originalCurrencyId {number | undefined} The id of the foreign currency used to pay for the expense.
 * @param originalCurrencyAmount {number | undefined} The amount of money spend on the new expense in the foreign
 * currency.
 * @param date {Date} The date on which the expense was paid.
 * @param categoryId {number} The id of the category to which this expense belongs.
 * @param description {string | undefined} An optional description for the expense.
 * @returns {Promise<{
 *     name: string,
 *     amount: number,
 *     originalCurrencyId: undefined | number,
 *     originalCurrencyAmount: undefined | number,
 *     originalCurrency: undefined | {
 *         id: number,
 *         iso: string,
 *         name: string,
 *         symbol: string
 *     },
 *     date: Date,
 *     categoryId: number,
 *     category: {
 *         id: number,
 *         name: string
 *     },
 *     description: string | undefined,
 *     profileId: string,
 * }>}
 */
const createExpense = async (
    {
        name,
        amount,
        originalCurrencyId,
        originalCurrencyAmount,
        date,
        categoryId,
        description,
    }) => {

    const {id} = await getUser()

    const newExpense = convertFromLowerFirstCamelCaseToSnakeCase({
        name,
        amount,
        originalCurrencyId,
        originalCurrencyAmount,
        date: date?.toISOString(),
        categoryId,
        description,
        profileId: id
    })

    const query = supabaseClient
        .from('project_react_expense')
        .insert(newExpense)
        .select('*, originalCurrency:project_react_currency(*), category:project_react_category(*)')
        .single()

    const expense = await performSupabaseQuery(query)
    expense.date = new Date(expense.date)
    return expense
}

/**
 * Retrieve an expense using its id.
 *
 * @param id {number} The id of the expense to retrieve.
 * @returns {Promise<{
 *     name: string,
 *     amount: number,
 *     originalCurrencyId: undefined | number,
 *     originalCurrencyAmount: undefined | number,
 *     originalCurrency: undefined | {
 *         id: number,
 *         iso: string,
 *         name: string,
 *         symbol: string
 *     },
 *     date: Date,
 *     categoryId: number,
 *     category: {
 *         id: number,
 *         name: string
 *     },
 *     description: string | undefined,
 *     profileId: string,
 * }>}
 */
const getExpense = async ({id}) => {
    await assertIsLoggedIn()

    const query = supabaseClient
        .from('project_react_expense')
        .select('*, originalCurrency:project_react_currency(*), category:project_react_category(*)')
        .eq('id', id)
        .maybeSingle()

    const expense = await performSupabaseQuery(query)
    expense.date = new Date(expense.date)
    return expense
}

/**
 * Updated an expense and return the updated expense.
 *
 * @param id {number} The id of the expense that should be updated.
 * @param name {string} The name of the new expense.
 * @param amount {number} The amount of money spend on the new expense in the default currency.
 * @param originalCurrencyId {number | undefined} The id of the foreign currency used to pay for the expense.
 * @param originalCurrencyAmount {number | undefined} The amount of money spend on the new expense in the foreign
 * currency.
 * @param date {Date} The date on which the expense was paid.
 * @param categoryId {number} The id of the category to which this expense belongs.
 * @param description {string | undefined} An optional description for the expense.
 * @returns {Promise<{
 *     name: string,
 *     amount: number,
 *     originalCurrencyId: undefined | number,
 *     originalCurrencyAmount: undefined | number,
 *     originalCurrency: undefined | {
 *         id: number,
 *         iso: string,
 *         name: string,
 *         symbol: string
 *     },
 *     date: Date,
 *     categoryId: number,
 *     category: {
 *         id: number,
 *         name: string
 *     },
 *     description: string | undefined,
 *     profileId: string,
 * }>}
 */
const updateExpense = async (
    {
        id,
        name,
        amount,
        originalCurrencyId,
        originalCurrencyAmount,
        date,
        categoryId,
        description
    }) => {

    const {id: profileId} = await getUser()

    const updatedExpense = convertFromLowerFirstCamelCaseToSnakeCase({
        name,
        amount,
        originalCurrencyId,
        originalCurrencyAmount,
        date: date?.toISOString(),
        categoryId,
        description,
        profileId
    })

    const query = supabaseClient
        .from('project_react_expense')
        .update(updatedExpense)
        .eq('id', id)
        .select()
        .single()

    const expense = await performSupabaseQuery(query)
    expense.date = new Date(expense.date)
    return expense
}

//endregion