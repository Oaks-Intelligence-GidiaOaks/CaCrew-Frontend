import React from "react";
import "./DashboardOrganisation.scss";
// import { useAllOrganisationQuery } from "services/organisation.service";
// import rtkQuery from "utils/rtkQuery";

const DashboardOrganisation = () => {
//   const [allOrganisation, { data, error, isLoading }] =
//     useAllOrganisationQuery();

//   useEffect(() => {
//     rtkQuery(allOrganisation);
//   }, [allOrganisation]);

//   console.log(data, "allOrg")

  return (
    <div className="dashboard-organisation">
      <table>
        <thead>
          <tr>
            <th>Organisation Name</th>
            <th>Organisation Number</th>
            <th>Organisation Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABC Company</td>
            <td>123456789</td>
            <td>abc@example.com</td>
            <td>
              <button className="verify-btn">Verify Organisation</button>
            </td>
          </tr>
          <tr>
            <td>XYZ Organization</td>
            <td>987654321</td>
            <td>xyz@example.com</td>
            <td>
              <button className="verify-btn">Verify Organisation</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardOrganisation;
