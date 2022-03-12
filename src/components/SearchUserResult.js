import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import TableDropdown from "./Dropdowns/TableDropdown";

const SEARCH_USER = gql`
  query searchUser($searchUserByNameInput: SearchUserByNameInput!) {
    searchUser(input: $searchUserByNameInput) {
      ok
      error
      users {
        id
        name
        profileImg
        email
        gender
        birth
        bio
      }
    }
  }
`;

export default function SearchUserResult({ name, color, history }) {
  const match = [{ book: 1 }, { book: 3 }];

  const [searchUserQuery, { loading, data, called }] =
    useLazyQuery(SEARCH_USER);
  useEffect(() => {
    searchUserQuery({
      variables: {
        searchUserByNameInput: {
          name,
        },
      },
    });
  }, []);

  return (
    <tbody>
      {match.map((book, index) => (
        <tr>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <img
              src={require("assets/img/sketch.jpg").default}
              className="h-12 w-12 bg-white rounded-full border"
              alt="..."
            ></img>{" "}
            <span
              className={
                "ml-3 font-bold " +
                +(color === "light" ? "text-blueGray-600" : "text-white")
              }
            >
              Black Dashboard Sketch
            </span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            $3,150 USD
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <i className="fas fa-circle text-red-500 mr-2"></i> delayed
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <div className="flex">
              <img
                src={require("assets/img/team-1-800x800.jpg").default}
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
              ></img>
              <img
                src={require("assets/img/team-2-800x800.jpg").default}
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
              ></img>
              <img
                src={require("assets/img/team-3-800x800.jpg").default}
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
              ></img>
              <img
                src={require("assets/img/team-4-470x470.png").default}
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
              ></img>
            </div>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <div className="flex items-center">
              <span className="mr-2">73%</span>
              <div className="relative w-full">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                  <div
                    style={{ width: "73%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  ></div>
                </div>
              </div>
            </div>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            <TableDropdown />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
