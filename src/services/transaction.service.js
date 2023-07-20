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
        return response;
      },
    }),

    // get my transaction
    getMyTransaction: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: GET_MY_TRANSACTIONS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get sell items
    getSellItems: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: GET_SELL_ITEMS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get buy items
    getBuyItems: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: GET_BUY_ITEMS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // initiate buy
    initiateBuy: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: INITIATE_BUY,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // set buy order
    setBuyOrder: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: SET_BUY_ORDER,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // payment made
    paymentMade: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: PAYMENT_MADE,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // payment recieved
    paymentRecieved: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: PAYMENT_RECIEVED,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // transaction failed
    transactionFailed: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: TRANSACTION_FAILED,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // transaction success
    transactionSuccess: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: TRANSACTION_SUCCESS,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // retire carbon credit
    retireCarbonCredit: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: RETIRE_CARBON_CREDIT,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useAllTransactionsQuery,
  useGetBuyItemsQuery,
  useGetMyTransactionQuery,
  useGetSellItemsQuery,
  useInitiateBuyMutation,
  usePaymentMadeMutation,
  usePaymentRecievedMutation,
  useRetireCarbonCreditMutation,
  useSetBuyOrderMutation,
  useTransactionFailedMutation,
  useTransactionSuccessMutation,
} = transactionApiSlice;
