import axios from "axios";
import React, { useEffect, useState } from "react";

interface Data {
    id: number;
    ApplicationId: number;
    ApplicationName: string;
    ApplicationDescription: string;
    DisplayText: string;
    DisplayMessage: string;
    ApplicationUrl: string;
    DisplayOrder: number;
    SessionTimeOut: number;
    Status: number;
}

const Table: React.FC = () => {
    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [displaytext, setDisplaytext] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");
    const [applicationUrl, setApplicationUrl] = useState("");
    const [displayorder, setDisplayNumber] = useState(0);
    const [sessionTimeOut, setSessionTimeOut] = useState(0);
    const [appStatus, setAppStatus] = useState(0);
    const [newEntry, setNewEntry] = useState(false);
    const [AppID, setAppID] = useState(0);
    const [editId, setEditId] = useState(-1);
    const [Datas, setDatas] = useState<Data[]>([]);

    useEffect(() => {
        getDatas();
    }, [editId]);

    const getDatas = async () => {
        axios.get<Data[]>("http://localhost:3001/users").then((res) => {
            console.log(res.data);
            setDatas(res.data);
        });
    };

    const handleUpdate = (id: number) => {
        setEditId(id);
        var val = Datas.filter((item, index) => item.ApplicationId === id);
        console.log("sanjay");
        console.log(val);
        setNewEntry(false);
        setAppName(val[0].ApplicationName);
        setAppDescription(val[0].ApplicationDescription);
        setDisplaytext(val[0].DisplayText);
        setDisplayMessage(val[0].DisplayMessage);
        setApplicationUrl(val[0].ApplicationUrl);
        setDisplayNumber(val[0].DisplayOrder);
        setSessionTimeOut(val[0].SessionTimeOut);
        setAppStatus(val[0].Status);
        setAppID(val[0].ApplicationId);
    };

    const handleUpdated = () => { 
        if (newEntry) {
            axios.post("http://localhost:3001/users", {
                ApplicationId: Datas.length + 1,
                ApplicationName: appName,
                ApplicationDescription: appDescription,
                Status: appStatus,
                DisplayText: displaytext,
                DisplayMessage: displayMessage,
                ApplicationUrl: applicationUrl,
                DisplayOrder: parseInt(displayorder),
                SessionTimeOut: parseInt(sessionTimeOut),
            })
            .then((res) => {
                console.log(res, "red----");
            });
            console.log(Datas);
            setEditId(-1);
            setNewEntry(false);
        } else {
            alert("in");
            console.log("editId is " + editId);
            console.log(Datas);
            var val = Datas.filter((item, index) => item.ApplicationId === editId);
            console.log("sanjay api");
            console.log(val);
            alert(val);
            axios.put("http://localhost:3001/users/" + val[0].id, {
                ApplicationId: AppID,
                ApplicationName: appName,
                DisplayText: displaytext,
                DisplayMessage: displayMessage,
                ApplicationUrl: applicationUrl,
                ApplicationDescription: appDescription,
                DisplayOrder: displayorder.toString(),
                SessionTimeOut: parseInt(sessionTimeOut),
                Status: appStatus,
            })
            .then((res) => {
                console.log(res);
            });
            setEditId(-1);
            setNewEntry(false);
        }
    };



    const handleNewEntry = () => { 
        setEditId(1); 
        setNewEntry(true); 
        setAppName(""); 
        setAppDescription(""); 
        setDisplaytext(""); 
        setDisplayMessage(""); 
        setApplicationUrl(""); 
        setDisplayNumber(0); 
        setSessionTimeOut(0); 
        setAppStatus(0); 
        setAppID(Datas.length + 1); 
    };



    const handleDelete = (id: number) => {
        var val = Datas.filter((item, index) => item.ApplicationId === id);
        axios.delete("http://localhost:3001/users/" + val[0].id).then((res) => {
            console.log(res);
            getDatas();
        });
    };

    return (<div> <button onClick={handleNewEntry} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-1 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" > Add New </button>

        <div className=" w-full mt-1 max-h-[470px] overflow-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                <thead className="text-xxs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                    <tr>
                        <th scope="col" className="px-6 py-3 border">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Application Name
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Display Text
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Display Message
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            URL
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Display Order
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            TimeOut
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="w-full  overflow-y-scroll">
                    {Datas.map((item, index) =>
                        item.ApplicationId === editId ? (
                            <tr key={item.ApplicationId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td
                                    scope="row"
                                    className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {AppID}
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        value={appName}
                                        onChange={(e) => {
                                            setAppName(e.target.value);
                                        }}
                                        id="first_name1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        value={displaytext}
                                        onChange={(e) => {
                                            setDisplaytext(e.target.value);
                                        }}
                                        id="first_name2"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        id="first_name3"
                                        value={displayMessage}
                                        onChange={(e) => setDisplayMessage(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        id="first_name4"
                                        value={applicationUrl}
                                        onChange={(e) => setApplicationUrl(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        id="first_name5"
                                        value={appDescription}
                                        onChange={(e) => setAppDescription(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="number"
                                        id="first_name6"
                                        value={displayorder}
                                        onChange={(e) => setDisplayNumber(parseInt(e.target.value))}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="number"
                                        id="first_name7"
                                        value={sessionTimeOut}
                                        onChange={(e) => setSessionTimeOut(parseInt(e.target.value))}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="checkbox"
                                        id="first_name8"
                                        checked={appStatus === 1}
                                        onChange={(e) =>
                                            setAppStatus(e.target.checked ? 1 : 0)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button
                                        onClick={() => {
                                            handleUpdated();
                                        }}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        {newEntry ? "Add" : "Update"}
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item.ApplicationId}
                                </th>
                                <td className="px-6 py-4">{item.ApplicationName}</td>
                                <td className="px-6 py-4">{item.DisplayText}</td>
                                <td className="px-6 py-4">{item.DisplayMessage}</td>
                                <td className="px-6 py-4">{item.ApplicationUrl}</td>
                                <td className="px-6 py-4">{item.ApplicationDescription}</td>
                                <td className="px-6 py-4">{item.DisplayOrder}</td>
                                <td className="px-6 py-4">{item.SessionTimeOut}</td>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        id="first_name9"
                                        checked={item.Status === 1}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4 text-right flex items-center">
                                    <button
                                        onClick={() => {
                                            handleUpdate(item.ApplicationId);
                                        }}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Table;
