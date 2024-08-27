import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Profile/Spinner";
import "./privacy.css";

const PrivacyPolicy = () => {
  const [Loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const getData = async () => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}content/user-privacy-policy`)
      .then((res) => {
        setLoading(false);
        setValue(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (Loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3">
          <Spinner /> <h1 className="italic">Loading Please wait...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div
        className="privacy-content-container"
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  );
};

export default PrivacyPolicy;
