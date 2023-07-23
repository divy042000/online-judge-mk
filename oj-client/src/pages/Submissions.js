import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import { get_all_submissions } from '../controllers/SubmissionsRoutes';
import { get_user_by_id } from '../controllers/UserRoutes';

export default function Submissions({timeString}){
    const [submission, setSubmission] = useState([]);
    const [getUser, setGetUser] = useState([]);

    useEffect(() => {
        get_all_submissions().then((data) => {
            setSubmission(data.message);
            console.log(data.message);
        })

        const userIds = submission.map((temp) => temp.user_id);

        const userData = userIds.map((temp) => {
          const obj = {
            id: temp
          }
          get_user_by_id(obj).then((data) => {
            console.log(data.message);
            setGetUser(data);
          })  
        });

    

        
       
    }, [])

    const checkVerdict = (verdictval) => {
        if(verdictval === 'true'){
            return "Accepted"
        }
        else{
            return "Wrong Answer"
        }
    }

    const convertToRealTime = (timeString) => {
        const dateObj = new Date(timeString);
        const realTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const realDate = dateObj.toLocaleDateString();
        return `${realDate} - ${realTime}`;
      };

    return(
        <>
        <Navbar/>
        <div className="flex flex-col items-center justify-center bg-[#212731] py-10">
          <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full text-xl text-gold">
                    <thead className="bg-gray-800 text-xl uppercase font-medium">
                      <tr>
                        <th></th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider"
                        >
                          Submission Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider"
                        >
                          Problem Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider"
                        >
                          Verdict
                        </th>
                      </tr>
                    </thead>
                    {submission.map((prob, index) => (
                      <>
                        <tbody key={index} className="bg-gray-800">
                          <tr className="bg-black bg-opacity-20">
                            <td className="pl-4">{index + 1}</td>
                            <td className="flex px-6 py-4 whitespace-nowrap">
                              <h2
                                className="ml-2 font-medium"
                              >
                                {prob.user_id}
                              </h2>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            {convertToRealTime(prob.submission_time)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {prob.problem_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {checkVerdict(prob.verdict)}
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
        </>
    )
}