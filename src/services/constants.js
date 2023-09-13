// Auth constants
export const LOGIN = "user/login";
export const REGISTER = "user";
export const GETUSER = "user/me";
export const UPDATE_USER_PASSWORD = "user/password_update";

// Organisation constants
export const UNVERIFIED_ORGANISATION = "organization/unverified";
export const VERIFIED_ORGANISATION = "organization/verified";
export const VERIFY_ORGANISATION = "organization/verify/";
export const SET_SALE_ORGANISATION = "organization/wallet";
export const UPDATE_ORGANISATION = "organization";

// Staff constants
export const STAFF = "staff";
export const ADD_STAFF = "staff/create";
export const REMOVE_STAFF = "staff/remove";
export const MAKE_STAFF_ADMIN = "staff/make_admin";
export const STAFF_ASSIGN_PROJ = "staff/assign_project";
export const STAFF_ASSIGN_PROJ_HANDLER = "staff/assign_project_handler";

// Project constants
export const ADD_PROJECT = "project/create";
export const GET_ALL_PROJECTS = "project";
export const UPDATE_PROJECT = "project/";
export const GET_HANDLED_PROJECTS = "project/project_handled";

// Transaction constants
export const INITIATE_BUY = "transaction/initiate_buy";
export const INITIATE_SELL = "transaction/initiate_sell";
export const PAYMENT_MADE = "transaction/payment_made";
export const PAYMENT_RECIEVED = "transaction/payment_recieved";
export const TRANSACTION_SUCCESS = "transaction/success";
export const TRANSACTION_FAILED = "transaction/failed";
export const RETIRE_CARBON_CREDIT = "transaction/retire_carbon_credit";
export const GET_BUY_ITEMS = "transaction/buy_items";
export const GET_SELL_ITEMS = "transaction/sell_items";
export const SET_BUY_ORDER = "transaction/set_buy_order";
export const GET_MY_TRANSACTIONS = "transaction/my_transactions";
export const GET_ALL_TRANSACTIONS = "transaction/all_transactions";
export const GET_ORG_ADMIN = "transaction/get_org_admin_id";
export const GET_CHART_DATA = "dashboard/transactions";
export const GET_OTP = "otp/send_otp";
export const VERIFY_OTP = "otp/verify_otp";

// Messaging constants
export const MESSAGE = "message";
export const MARK_AS_READ = "message/mark_as_read";
export const BROADCAST = "notification";
export const GET_NOTIFICATION = "user_notifications";

// Documment center constants
export const DOCUMENTS = "document";

// Registry constants
export const GET_REGISTRY = "registry/get_carbon_credit_registry";
export const GET_REGISTRY_COUNT = "registry/get_carbon_credit_registry_count";
