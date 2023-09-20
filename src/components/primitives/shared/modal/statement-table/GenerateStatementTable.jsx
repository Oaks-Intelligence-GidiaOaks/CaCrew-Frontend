import { useEffect } from "react";
import "./GenerateStatementTable.scss";
import { Form, Field, FormSpy } from "react-final-form";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { close } from "assets/images";
import { useGetMyStatementMutation } from "services/transaction.service";

const GenerateStatementTable = ({ data }) => {
  const dispatch = useDispatch();

  const [getMyStatement, { data: statementData, isLoading, isError }] =
    useGetMyStatementMutation();

  useEffect(() => {
    getMyStatement(data);
  }, [data]);

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const transactions = statementData?.transactions || [];

  console.log("Statement Data: ", statementData);

  return (
    <div className="modal_generate_statement-table">
      <div className="modal_generate_statement_title sub_heading">
        Transaction Statement
      </div>
      <img
        src={close}
        alt="icon"
        className="modal_generate_statement_close"
        onClick={handleCloseModal}
      />
      <div className="modal_generate_statement_info_wrap ">
        <div className="modal_generate_statement_info_bold between">
          My Statement of Account
          {transactions.length > 0 && (
            <span>
              <button className="export-btn">Export Statement</button>
            </span>
          )}
        </div>
      </div>
      <div className="modal_generate_statement_input_warp">
        <div className="modal_generate_statement_input">
          <div className="dashboard_table">
            <div className="dashboard_table_wrap">
              <div className="dashboard_table">
                <div className="dashboard_table_head between">
                  <div className="dashboard_table_head_item">Buyer</div>
                  <div className="dashboard_table_head_item">Seller</div>
                  <div className="dashboard_table_head_item">Amount</div>
                  <div className="dashboard_table_head_item">
                    Transaction Fee
                  </div>
                  <div className="dashboard_table_head_item">
                    Transaction ID
                  </div>
                  <div className="dashboard_table_head_item">
                    Time of Transaction
                  </div>
                  <div className="dashboard_table_head_item">Status</div>
                  <div className="dashboard_table_head_item">Total Amount</div>
                </div>

                {transactions.length === 0 ? (
                  <div className="dashboard_table_no_records">
                    No records found, try a different date.
                  </div>
                ) : (
                  transactions &&
                  transactions.map((row, idx) => (
                    <div
                      key={row._id}
                      className={`dashboard_table_body between ${
                        (idx + 1) % 2 === 0 && "dashboard_table_body_bg"
                      }`}
                    >
                      <div className="dashboard_table_body_item">
                        {row.buyer.organization_name}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.seller.organization_name}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.amount}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.transaction_fee || "-"}
                      </div>
                      <div className="dashboard_table_body_item">{row._id}</div>
                      <div className="dashboard_table_body_item">
                        {new Date(row.transaction_date).toLocaleString()}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.status}
                      </div>
                      <div className="dashboard_table_body_item">
                        {/* example field: */}
                        {row.total_amount || row.amount}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStatementTable;
