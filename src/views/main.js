/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer";
import { instance } from "../lib/interceptors";

export default function Index() {
  const [name, setName] = useState("");
  const instructionRef = useRef(null);
  const onInstructionClick = () => {
    instructionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function getMyInfo() {
      await instance
        .get("api/users/me")
        .then(function (res) {
          console.log(res);
          if (res.status === 200) {
            setName(res.data.name);
          } else {
            setName(res.data.error.message);
          }
        })
        .catch(function (error) {
          console.log("err : ", error);
        });
    }
    getMyInfo();
  }, []);
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                임시 세션 슬라이싱 테스트용 페이지<br></br>현재 사용자 :
                {name !== "" ? name : "disconnect"}
              </h2>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>

      <Footer />
    </>
  );
}
