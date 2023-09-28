import "./ProjectCertificate.scss";
import { useDispatch } from "react-redux";
import { closeComponentModal } from "redux/slices/modal.slice";
import { close, carbonible } from "assets/images";
import moment from "moment";
import { useGetSuperAdminQuery } from "services/transaction.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ProjectCertificate = ({ data }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };
  const { data: superAdminData } = useGetSuperAdminQuery();

  const superAdminName = superAdminData?.organization_name ?? "Default Name";

  const downloadCerficate = () => {
    const input = document.getElementById("certificate-box");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [canvas.height * 0.75, canvas.width * 0.75],
      });
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        canvas.width * 0.75,
        canvas.height * 0.75
      );
      pdf.save(data.project_name + " certificate.pdf");
    });
  };

  const dateStr = data.certificate_id
    ? moment(data.certificate_id.issued_date).format("Do MMMM YYYY")
    : "Date not available";

  return (
    <div className="ProjectCertificate-table">
      <img
        src={close}
        alt="icon"
        className="ProjectCertificate_close"
        onClick={handleCloseModal}
      />
      <div className="ProjectCertificate_info_wrap">
        <div className="ProjectCertificate_info_bold between">
          {data.project_name} Certificate Preview
          {data && (
            <span>
              <button className="export-btn" onClick={downloadCerficate}>
                Download Certificate
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="ProjectCertificate_input_warp">
        <div className="ProjectCertificate_input">
          <div className="certificate-box" id="certificate-box">
            <div className="certificate-wrapper">
              <p className="certificate-header">CARBON CREDIT</p>
              <p className="certificate-subtitle">CERTIFICATE</p>
              <img src={carbonible} alt="Logo" className="img-logo" />
              <div className="placeholder-text">
                <div className="buyer-box text-center">
                  <p className="text-name">
                    {data.certificate_id &&
                      data.certificate_id.organization_id &&
                      data.certificate_id.organization_id.organization_name}
                  </p>
                  <hr className="hr-names" />
                  <p className="buyer-text">BUYER</p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-name">{superAdminName}</p>
                  <hr className="hr-names" />
                  <p className="buyer-text">SELLER</p>
                </div>
              </div>

              <div className="placeholder-text">
                <div className="buyer-box text-center">
                  <p className="text-title">Certificate ID</p>
                  <p className="doc-id">
                    {data.certificate_id &&
                      data.certificate_id.certificate_number}
                  </p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-title">Generated On</p>
                  <p className="doc-id">Carbonible</p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-title">Project Name</p>
                  <p className="doc-id">{data.project_name}</p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-title">Project ID</p>
                  <p className="doc-id">{data._id}</p>
                </div>
              </div>

              <div className="placeholder-text">
                <div className="buyer-box text-center">
                  <p className="text-title">Certification Standard</p>
                  <p className="doc-id">Verra- Verified Carbon Standard</p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-title">Verification Body</p>
                  <p className="doc-id">
                    Allision Carbon Credit Verifying Experts
                  </p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-title">Vintage Year</p>
                  <p className="doc-id">2020 - 2025</p>
                </div>
              </div>

              <div className="placeholder-dates">
                <div className="buyer-box text-center">
                  <p className="text-date">Date issued</p>
                  <hr className="hr-dates" />
                  <p className="buyer-dates">{dateStr}</p>
                </div>
                <div className="seller-box text-center">
                  <p className="text-date">Carbon Credit Amount</p>
                  <hr className="hr-dates" />
                  <p className="buyer-dates">{data.amount_earned} tCO2e</p>
                </div>
              </div>

              {/* <p className="serial-text">
                Serial Number Of Retired Carbon Credit{" "}
              </p>
              <p className="serial-no">
                0000000001 <span>TO</span> 0000000020
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCertificate;
