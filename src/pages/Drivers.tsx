import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Select from "react-select";
import axios from "axios";
import Header from '../components/Header'

interface Data {
  id: string;
  AppName: string;
}
interface selectedDivisions{
    value:string,
    label:string
}

interface DivisionApplication {
  id: string;
  DivisonName: string;
  Status: string;
}

interface DivisionList {
  DivisionId: string;
  DivisionName: string;
  Status: string;
}

const Drivers = () => {
  const [datas, setDatas] = useState<Data[]>([]);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const [selectedItem, setselectedItem] = useState<DivisionApplication[]>([]);

  const [Divisions, setDivisions] = useState<SelectOption[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<selectedDivisions[]>([{ value: "chocolate", label: "Chocolate" }]);


  const [dropDownVal, setdropDownVal] = useState<SelectOption[]>([
    { value: "chocolate", label: "Chocolate" },
  ]);

  interface SelectOption {
    value: string;
    label: string;
  }

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    axios.get("http://localhost:3001/users").then(({ data }) => {
      console.log(data);
      setDatas(data);
      var temp: SelectOption[] = [];
      for (let i = 0; i < data.length; i++) {
        temp.push({
          value: data[i].ApplicationId,
          label: data[i].ApplicationName,
        });
      }
      setdropDownVal(temp);
    });
  };

  const getDivisionList = async (a) => {
    var PreValues = [];
    axios.get("http://localhost:3001/Values?AppID=" + a).then(({ data }) => {
      PreValues = data;

      console.log("PreValues", data);
    });

    axios.get("http://localhost:3001/Division").then(({ data }) => {
      console.log(data);
      setDatas(data);
      var temp: SelectOption[] = [];
      const filteredIdArray = data.filter(item => 
        !PreValues.some(dataItem => dataItem.DivisionName == item.DivisionName)
      );
      console.log('filteredIdArray',filteredIdArray);

      for (let i = 0; i < filteredIdArray.length; i++) {
        temp.push({ value: filteredIdArray[i].DivisionId, label: filteredIdArray[i].DivisionName });
      }
      setDivisions(temp);
    });
  };

  const handleSelectChange = (selectedOption: SelectOption) => {
    const { value, label } = selectedOption;
    setSelectedOption(value);
    getDevisions(value);
    getDivisionList(value);
  };

  const getDevisions = (value: string) => {
    // alert(value);
    axios

      .get("http://localhost:3001/Values?AppID=" + value)
      .then((res) => {
        console.log(res);
        setselectedItem(res.data);
        getDivisionList(value);

      })
      .catch((err) => {
        if (err.message === "Request failed with status code 404") {
          setselectedItem([]);
        }
      });
  };

  const customTopStyles = {
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "125px",
      overflowY: "auto",
    }),
  };
  const customBottomStyles = {
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "90px",
      overflowY: "auto",
    }),
  };

  const handleDelete = (id: string) => {
    axios.delete("http://localhost:3001/Values/" + id).then((res) => {
      getDevisions(id);
    });
  };

  const handleSelectDevision = (selectedOption: SelectOption) => {
    const { value, label } = selectedOption;
    setSelectedDivisions([{value,label}])


  };

const handleNewEntry=()=>{
 
    axios.post("http://localhost:3001/Values", 
        {
            "AppID": selectedOption,      
            "DivisionName":selectedDivisions[0].label,      
            "Status": "Active",
            "id": "1"
          }
    ).then((res)=>{
        console.log(res);
        getDevisions(selectedOption);
    })
}
  return (
    <div className="flex ">
      {" "}
      <Sidebar />{" "}
      <div className="p-3 w-full">
      <Header/>

        {" "}
        <div className="mt-2">
          {" "}
          <label htmlFor="search" className="py-2 text-gray-500">
            {/* Select the Application{" "} */}
          </label>{" "}
          <Select
            id="search"
            styles={customTopStyles}
            options={dropDownVal}
            className="w-[200px] my-1"
            onChange={handleSelectChange}
          />{" "}
        </div>{" "}
        <div className="w-full  h-[300px] overflow-auto shadow-md sm:rounded-lg">
          {" "}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {" "}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {" "}
              <tr>
                {" "}
                <th scope="col" className="px-6 py-3">
                  {" "}
                  Division ID{" "}
                </th>{" "}
                <th scope="col" className="px-6 py-3">
                  {" "}
                  Division Name{" "}
                </th>{" "}
                <th scope="col" className="px-6 py-3">
                  {" "}
                  Status{" "}
                </th>{" "}
                <th scope="col" className="px-6 py-3">
                  {" "}
                  Actions{" "}
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody className="w-full overflow-y-scroll">
              {" "}
              {selectedItem.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {" "}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {" "}
                    {item.id}{" "}
                  </th>{" "}
                  <td className="px-6 py-4">{item.DivisionName}</td>{" "}
                  <td className="px-6 py-4">{item.Status}</td>{" "}
                  <td className="px-6 py-4 text-right flex items-center">
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ml-5"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-1 p-2 flex justify-between items-center shadow ">
            {
        Divisions &&(
            <Select
            id="lstDivision"
            styles={customBottomStyles}
            options={Divisions}
            className="w-[200px] my-1"
            onChange={handleSelectDevision}
          />
        )
    }
         
          <button
            onClick={handleNewEntry}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
