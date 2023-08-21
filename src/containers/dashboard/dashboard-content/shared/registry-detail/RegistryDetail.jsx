import React, { useEffect } from "react";
import "./RegistryDetail.scss";
import { RegistryBanner } from "components";
import { useGetRegistryCountQuery } from "services/registry.service";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";

const RegistryDetail = () => {
  const { id } = useParams();
  const makeRequest = !id ? true : false;
  const { data } = useGetRegistryCountQuery({ id: id, skip: makeRequest });
  const dispatch = useDispatch();
  console.log(data, "dat");
  console.log(id, "id");

  useEffect(() => {
    if (!id) {
      alert("hi");
      dispatch(
        openModal({
          title: "Vera ID Not Found",
          message: "No Vera ID was found at the moment",
        })
      );
    }
  }, [id, dispatch]);

  return (
    <div className="registry_details">
      <RegistryBanner />
      <div className="registry_details_overview dash_pad">
        <div className="registry_details_overview_head">
          Carbon Credit Trail
        </div>
        <div className="registry_details_overview_wrap between">
          <div className="registry_details_overview_text_wrap">
            <div className="registry_details_overview_text">
              <div className="registry_details_overview_title">
                Verra Certificate ID
              </div>
              <div className="registry_details_overview_value">
                56389357202 GH
              </div>
            </div>
          </div>
          <div className="registry_details_overview_text_wrap between">
            <div className="registry_details_overview_text">
              <div className="registry_details_overview_title_two text ">
                Total earned
              </div>
              <div className="registry_details_overview_value_two">
                500 tCO2e
              </div>
            </div>
            <div className="registry_details_overview_text">
              <div className="registry_details_overview_title_two text">
                Total bought
              </div>
              <div className="registry_details_overview_value_two">
                120 tCO2e
              </div>
            </div>
            <div className="registry_details_overview_text">
              <div className="registry_details_overview_title_two text">
                Total retired
              </div>
              <div className="registry_details_overview_value_two">
                250 tCO2e
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryDetail;
