import React from "react";
import { useFormContext } from "react-hook-form";

export default function TestPaperR({ question: q }) {
  const { register } = useFormContext();
  const val_1 = 0;
  let val_2;
  switch (q.type) {
    case "E_I":
      val_2 = 1000;
      break;
    case "S_N":
      val_2 = 100;
      break;
    case "T_F":
      val_2 = 10;
      break;
    case "J_P":
      val_2 = 1;
      break;
    default:
      return;
  }

  return (
    <>
      <div className="container mx-auto px-4" key={q.id}>
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div className="md:pr-12">
              <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                <i className="fas fa-rocket text-xl"></i>
              </div>
              <h3 className="text-3xl font-semibold">Let's check it out!</h3>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                진짜 재밌는데? 이거 하고 다른 친구들한테 링크 공유할까? 프로필
                들어가면 공유할 수 있는 버튼이 있을 것 같아!
              </p>
              <ul className="list-none mt-6">
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                        <i className="fa-solid fa-1"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-blueGray-500">{q.question[0]}</h4>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                        <i className="fa-solid fa-2"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-blueGray-500">{q.question[1]}</h4>
                    </div>
                  </div>
                </li>
                <li className="py-2 text-right">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className="text-sm font-semibold text-blueGray-600">
                      <input
                        {...register(`${q.type}${q.id}`)}
                        required
                        type="radio"
                        id={q.id}
                        name={`${q.type}${q.id}`}
                        value={val_1}
                        className="bg-indigo-200 form-radio border-0 rounded text-blueGray-700 ml-1 mr-3 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <label htmlFor={q.id} className="mr-3">
                        1
                      </label>
                      <input
                        {...register(`${q.type}${q.id}`)}
                        type="radio"
                        id={q.id + 1}
                        name={`${q.type}${q.id}`}
                        value={val_2}
                        className="bg-indigo-200 form-radio border-0 rounded text-blueGray-700 ml-1 mr-3 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <label htmlFor={q.id} className="mr-3">
                        2
                      </label>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden md:flex md:w-4/12 ml-auto mr-auto px-4">
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            />
          </div>
        </div>
      </div>
    </>
  );
}
