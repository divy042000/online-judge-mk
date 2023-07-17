import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  get_all_problems,
  get_problem_by_id,
  run_compiler,
} from "../controllers/ProblemRoutes";
import Navbar from "../components/Navbar";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

export default function Problem() {
  const [problem, setProblem] = useState([]);
  const [codeLang, setCodeLang] = useState("");
  const [code, setcode] = useState(`#include <bits/stdc++.h>
  using namespace std;
        
  int main(){
    //your code here
    
    
    return 0;
  }`);
  const [outputCode, setOutputCode] = useState("")
  console.log(code);
  const { id } = useParams();
  // console.log(idx);

  useEffect(() => {
    const obj = { _id: id };
    console.log(obj);
    get_problem_by_id(obj).then((data) => {
      console.log(data.message);
      setProblem(data.message);
    });
    get_all_problems().then((data) => {
      console.log(data.message);
      setProblem(data.message);
    });
  }, []);

  const probIndex = String(id);

  var valcode = `#include <bits/stdc++.h>
using namespace std;
  
int main(){
  //your code here


  return 0;
}`;
  var valext = [cpp()];
  if (codeLang === "cpp") {
    console.log("Yess");
    valcode = `#include <bits/stdc++.h>
using namespace std;
      
int main(){
  //your code here
  
  
  return 0;
}`;
    valext = [cpp()];
  } else if (codeLang === "java") {
    console.log("ajava");
    valcode = `class ProJudge{
  public static void main(String [] args){
      System.out.printIn("Welcome to Java editor");
  }
}`;
    valext = [java()];
  } else if (codeLang === "python") {
    console.log("python");
    valcode = `print("Welcome to python editor")`;
    valext = [python()];
  }

  const handleSubmit = () => {
    const payload = {
      lang: 'cpp',
      code
    }
    console.log(payload);

    try {
      run_compiler(payload).then((data) => {
        console.log(data);
        setOutputCode(data.output);
      })

    } catch(err){
      console.log(err);
    }
  }
  
  return (
    <>
      <Navbar />
      {problem
        .filter((prob) => prob._id === probIndex)
        .map((temp) => (
          <>
            <div className="grid grid-rows-2 text-gold md:grid-cols-2">
              <div className="bg-gray-700 rounded m-3 p-2">
                <h1 className="text-3xl m-3 uppercase font-semibold">
                  Problem:{" "}
                  <span className="text-white capitalize">{temp.name}</span>
                </h1>
                <br></br>
                <h3 className="text-2xl m-3 uppercase font-semibold">
                  Description: <br></br>
                  <span className="text-white normal-case font-medium">
                    {temp.statement}
                  </span>
                </h3>
                <br></br>
                <h3 className="text-2xl m-3 uppercase font-semibold">
                  Difficulty:{" "}
                  <span className="text-white normal-case font-medium">
                    {temp.difficulty}
                  </span>
                </h3>
              </div>
              <div className="bg-gray-700 rounded m-3 p-2">
                <div className="flex flex-row">
                <h1 className="text-3xl m-3 uppercase font-semibold">Code:</h1>
                <select
                  className="text-xl w-[40%] p-2 bg-gray-800 outline-none rounded-lg"
                  value={codeLang}
                  onChange={(e) => {
                    setCodeLang(e.target.value);
                  }}
                >
                  <option value="cpp">C++</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                </div>
               

                <CodeMirror
                  className="m-3 text-lg"
                  value={code}
                  onChange={(value) => setcode(value)}
                  theme="dark"
                  height="400px"
                  extensions={valext}
                />
                <button onClick={handleSubmit} className="m-3 p-2 bg-gray-600 rounded-lg font-semibold hover:bg-gray-500 text-xl">Submit</button>
               {outputCode && <>
                <h1 className="text-3xl m-3 uppercase font-semibold">Output:</h1>
               <div className="m-3 p-2 bg-gray-600 rounded-lg"><h3 className="text-xl font-monocode">{outputCode}</h3></div></>}
              </div>
            </div>
          </>
        ))}
    </>
  );
}
