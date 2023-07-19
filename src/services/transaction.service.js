import apiSlice from "./api/apiSlice";
import {
  INITIATE_BUY,
  PAYMENT_MADE,
  PAYMENT_RECIEVED,
  TRANSACTION_FAILED,
  TRANSACTION_SUCCESS,
  RETIRE_CARBON_CREDIT,
  GET_BUY_ITEMS,
  GET_SELL_ITEMS,
  SET_BUY_ORDER,
  GET_MY_TRANSACTIONS,
  GET_ALL_TRANSACTIONS,
} from "./constants";

const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get all transactions
        allTransactions: builder.query({
            providesTags: ["Transaction"],
            query: () => ({
                url: GET_ALL_TRANSACTIONS,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response
            }
        }),

        // get my transaction
        getMyTransaction: builder.query({
            providesTags: ["Transaction"],
            query: () => ({
                url: GET_MY_TRANSACTIONS,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response
            }
        }),

        // get sell items
        getSellItems: builder.query({
            providesTags: ["Transaction"],
            query: () => ({
                url: GET_SELL_ITEMS,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response
            }
        })
    })
})