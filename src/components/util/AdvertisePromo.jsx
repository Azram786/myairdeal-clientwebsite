import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const AdvertisePromo = () => {
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [promo, setPromo] = useState(null);
  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}promo/advertise`)
      .then((res) => {
        setPromo(res.data);
      })
      .catch((error) => {
        setError(true);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  if (Loading || Error) {
    return <></>;
  }
  return (
    <div>
      <div className="advertise-promo-container">
        Use promo code <strong>{promo?.code}</strong> to get a discount of ₹
        &nbsp;
        <strong>{promo?.value}!</strong>
      </div>
    </div>
  );
};

export default AdvertisePromo;
