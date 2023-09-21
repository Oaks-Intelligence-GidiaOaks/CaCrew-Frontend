import { useEffect } from "react";
import "./GenerateStatementTable.scss";
import { useDispatch } from "react-redux";
import { closeComponentModal } from "redux/slices/modal.slice";
import { close } from "assets/images";
import { useGetMyStatementMutation } from "services/transaction.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useGetUserQuery } from "services/user.service";
import { convertDateToWord } from "utils/convertToDateFormat";

const GenerateStatementTable = ({ data }) => {
  const dispatch = useDispatch();

  const [getMyStatement, { data: statementData, isLoading, isError }] =
    useGetMyStatementMutation();

  useEffect(() => {
    getMyStatement(data);
  }, []);

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const { data: userData } = useGetUserQuery();

  const transactions = statementData?.transactions || [];

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const exportPDF = () => {
    let body = [];

    // Add table header
    body.push([
      { text: "Buyer", bold: true },
      { text: "Seller", bold: true },
      { text: "Amount", bold: true },
      { text: "Transaction Fee", bold: true },
      { text: "Transaction Type", bold: true },
      { text: "Transaction ID", bold: true },
      { text: "Time of Transaction", bold: true },
      { text: "Status", bold: true },
      { text: "Total Amount", bold: true },
    ]);

    // Add data from transactions
    transactions.forEach((row) => {
      body.push([
        row.buyer?.organization_name || "-",
        row.seller?.organization_name || "-",
        row.amount,
        row.transaction_fee || "-",
        row.transaction_type || "-",
        row._id,
        convertDateToWord(row?.transaction_date),
        row.status,
        userData?.organization_id?._id === row?.buyer?._id
          ? row?.amount - row?.transaction_fee || row?.amount
          : row?.amount + row?.transaction_fee || row?.amount,
      ]);
    });

    var docDefinition = {
      pageOrientation: "landscape",
      content: [
        {
          text: "Transaction Statement",
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 8],
        },
        {
          table: {
            body: body,
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download("statement.pdf");
  };

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
      <div className="modal_generate_statement_info_wrap">
        <div className="modal_generate_statement_info_bold between">
          My Statement of Account
          {transactions.length > 0 && (
            <span>
              <button className="export-btn" onClick={exportPDF}>
                Export Statement
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="modal_generate_statement_input_warp" id="statement-table">
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
                    Transaction Type
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

                {isLoading ? (
                  <div className="dashboard_table_no_records">
                    Loading records...
                  </div>
                ) : isError ? (
                  <div className="dashboard_table_no_records">
                    Error fetching records.
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="dashboard_table_no_records">
                    No records found, try a different date.
                  </div>
                ) : (
                  transactions.map((row, idx) => (
                    <div
                      key={row._id}
                      className={`dashboard_table_body between ${
                        (idx + 1) % 2 === 0 && "dashboard_table_body_bg"
                      }`}
                    >
                      <div className="dashboard_table_body_item">
                        {row.buyer?.organization_name || "-"}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.seller?.organization_name || "-"}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.amount}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.transaction_fee || "-"}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.transaction_type || "-"}
                      </div>
                      <div className="dashboard_table_body_item">{row._id}</div>
                      <div className="dashboard_table_body_item">
                        {convertDateToWord(row?.transaction_date)}
                      </div>
                      <div className="dashboard_table_body_item">
                        {row.status}
                      </div>
                      <div className="dashboard_table_body_item">
                        {userData?.organization_id?._id === row?.buyer?._id
                          ? row?.amount - row?.transaction_fee || row?.amount
                          : row?.amount + row?.transaction_fee || row?.amount}
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
