import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { get_all_problems } from "../controllers/ProblemRoutes";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { auth_user, get_user_by_id } from "../controllers/UserRoutes";

export default function ProblemsList() {
  const [problem, setProblem] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    
    get_all_problems().then((data) => {
      console.log(data.message);
      setProblem(data.message);
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <>
        <div className="h-screen flex items-center justify-center">
        <ThreeCircles
            height="100"
            width="100"
            color="#FFD700"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
         
        </>
      ) : (
        <div class="flex flex-col items-center justify-center bg-[#212731] py-10">
          <div class="flex flex-col mt-6">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block">
                <div class="shadow overflow-hidden sm:rounded-lg">
                  <table class="min-w-full text-xl text-gold">
                    <thead class="bg-gray-800 text-xl uppercase font-medium">
                      <tr>
                        <th></th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left tracking-wider"
                        >
                          Problem Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left tracking-wider"
                        >
                          Difficulty
                        </th>
                      </tr>
                    </thead>
                    {problem.map((prob, index) => (
                      <>
                        <tbody key={index} class="bg-gray-800">
                          <tr class="bg-black bg-opacity-20">
                            <td class="pl-4">{index + 1}</td>
                            <td class="flex px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`/problems/${prob._id}`}
                                class="ml-2 font-medium hover:underline"
                              >
                                {prob.name}
                              </Link>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {prob.difficulty == "Easy" ? (<><div className="rounded-xl text-center p-1 border-solid  text-green-400 border-green-600 border-[1px]">Easy</div></>): prob.difficulty == "Medium" ? (<><div className="rounded-xl text-center p-1 border-solid border-[1px] border-yellow-500 text-yellow-500">Medium</div></>) : (<><div className="rounded-xl text-center p-1 border-[1px] border-red-500 border-solid  text-red-500">Hard</div></>)}
                              {/* {prob.difficulty} */}
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <table className="table">
      <thead>
        <tr>
          <th>Problem ID</th>
          <th>Problem Name</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <tr key={problem.id}>
            <td>{problem.id}</td>
            <td>{problem.name}</td>
            <td>{problem.difficulty}</td>
          </tr>
        ))}
      </tbody>
    </table> */}
    </>
  );
}
