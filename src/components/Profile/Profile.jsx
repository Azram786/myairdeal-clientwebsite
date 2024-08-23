import React, { useEffect, useState } from "react";
const countries = [
  { countryCode: "AF", dialCode: "93", countryName: "Afghanistan" },
  { countryCode: "AL", dialCode: "355", countryName: "Albania" },
  { countryCode: "DZ", dialCode: "213", countryName: "Algeria" },
  { countryCode: "AS", dialCode: "1684", countryName: "American Samoa" },
  { countryCode: "AD", dialCode: "376", countryName: "Andorra" },
  { countryCode: "AO", dialCode: "244", countryName: "Angola" },
  { countryCode: "AI", dialCode: "1264", countryName: "Anguilla" },
  { countryCode: "AG", dialCode: "1268", countryName: "Antigua and Barbuda" },
  { countryCode: "AR", dialCode: "54", countryName: "Argentina" },
  { countryCode: "AM", dialCode: "374", countryName: "Armenia" },
  { countryCode: "AW", dialCode: "297", countryName: "Aruba" },
  { countryCode: "AU", dialCode: "61", countryName: "Australia" },
  { countryCode: "AT", dialCode: "43", countryName: "Austria" },
  { countryCode: "AZ", dialCode: "994", countryName: "Azerbaijan" },
  { countryCode: "BS", dialCode: "1242", countryName: "Bahamas" },
  { countryCode: "BH", dialCode: "973", countryName: "Bahrain" },
  { countryCode: "BD", dialCode: "880", countryName: "Bangladesh" },
  { countryCode: "BB", dialCode: "1246", countryName: "Barbados" },
  { countryCode: "BY", dialCode: "375", countryName: "Belarus" },
  { countryCode: "BE", dialCode: "32", countryName: "Belgium" },
  { countryCode: "BZ", dialCode: "501", countryName: "Belize" },
  { countryCode: "BJ", dialCode: "229", countryName: "Benin" },
  { countryCode: "BM", dialCode: "1441", countryName: "Bermuda" },
  { countryCode: "BT", dialCode: "975", countryName: "Bhutan" },
  { countryCode: "BO", dialCode: "591", countryName: "Bolivia" },
  { countryCode: "BA", dialCode: "387", countryName: "Bosnia and Herzegovina" },
  { countryCode: "BW", dialCode: "267", countryName: "Botswana" },
  { countryCode: "BR", dialCode: "55", countryName: "Brazil" },
  { countryCode: "BN", dialCode: "673", countryName: "Brunei" },
  { countryCode: "BG", dialCode: "359", countryName: "Bulgaria" },
  { countryCode: "BF", dialCode: "226", countryName: "Burkina Faso" },
  { countryCode: "BI", dialCode: "257", countryName: "Burundi" },
  { countryCode: "KH", dialCode: "855", countryName: "Cambodia" },
  { countryCode: "CM", dialCode: "237", countryName: "Cameroon" },
  { countryCode: "CA", dialCode: "1", countryName: "Canada" },
  { countryCode: "CV", dialCode: "238", countryName: "Cape Verde" },
  { countryCode: "KY", dialCode: "1345", countryName: "Cayman Islands" },
  {
    countryCode: "CF",
    dialCode: "236",
    countryName: "Central African Republic",
  },
  { countryCode: "TD", dialCode: "235", countryName: "Chad" },
  { countryCode: "CL", dialCode: "56", countryName: "Chile" },
  { countryCode: "CN", dialCode: "86", countryName: "China" },
  { countryCode: "CX", dialCode: "61", countryName: "Christmas Island" },
  { countryCode: "CC", dialCode: "61", countryName: "Cocos (Keeling) Islands" },
  { countryCode: "CO", dialCode: "57", countryName: "Colombia" },
  { countryCode: "KM", dialCode: "269", countryName: "Comoros" },
  { countryCode: "CG", dialCode: "242", countryName: "Congo" },
  {
    countryCode: "CD",
    dialCode: "243",
    countryName: "Congo, Democratic Republic of the",
  },
  { countryCode: "CK", dialCode: "682", countryName: "Cook Islands" },
  { countryCode: "CR", dialCode: "506", countryName: "Costa Rica" },
  { countryCode: "HR", dialCode: "385", countryName: "Croatia" },
  { countryCode: "CU", dialCode: "53", countryName: "Cuba" },
  { countryCode: "CW", dialCode: "599", countryName: "Curacao" },
  { countryCode: "CY", dialCode: "357", countryName: "Cyprus" },
  { countryCode: "CZ", dialCode: "420", countryName: "Czech Republic" },
  { countryCode: "DK", dialCode: "45", countryName: "Denmark" },
  { countryCode: "DJ", dialCode: "253", countryName: "Djibouti" },
  { countryCode: "DM", dialCode: "1767", countryName: "Dominica" },
  { countryCode: "DO", dialCode: "1809", countryName: "Dominican Republic" },
  { countryCode: "EC", dialCode: "593", countryName: "Ecuador" },
  { countryCode: "EG", dialCode: "20", countryName: "Egypt" },
  { countryCode: "SV", dialCode: "503", countryName: "El Salvador" },
  { countryCode: "GQ", dialCode: "240", countryName: "Equatorial Guinea" },
  { countryCode: "ER", dialCode: "291", countryName: "Eritrea" },
  { countryCode: "EE", dialCode: "372", countryName: "Estonia" },
  { countryCode: "ET", dialCode: "251", countryName: "Ethiopia" },
  { countryCode: "FK", dialCode: "500", countryName: "Falkland Islands" },
  { countryCode: "FO", dialCode: "298", countryName: "Faroe Islands" },
  { countryCode: "FJ", dialCode: "679", countryName: "Fiji" },
  { countryCode: "FI", dialCode: "358", countryName: "Finland" },
  { countryCode: "FR", dialCode: "33", countryName: "France" },
  { countryCode: "GF", dialCode: "594", countryName: "French Guiana" },
  { countryCode: "PF", dialCode: "689", countryName: "French Polynesia" },
  {
    countryCode: "TF",
    dialCode: "262",
    countryName: "French Southern Territories",
  },
  { countryCode: "GA", dialCode: "241", countryName: "Gabon" },
  { countryCode: "GM", dialCode: "220", countryName: "Gambia" },
  { countryCode: "GE", dialCode: "995", countryName: "Georgia" },
  { countryCode: "DE", dialCode: "49", countryName: "Germany" },
  { countryCode: "GH", dialCode: "233", countryName: "Ghana" },
  { countryCode: "GI", dialCode: "350", countryName: "Gibraltar" },
  { countryCode: "GR", dialCode: "30", countryName: "Greece" },
  { countryCode: "GL", dialCode: "299", countryName: "Greenland" },
  { countryCode: "GD", dialCode: "1473", countryName: "Grenada" },
  { countryCode: "GP", dialCode: "590", countryName: "Guadeloupe" },
  { countryCode: "GU", dialCode: "1671", countryName: "Guam" },
  { countryCode: "GT", dialCode: "502", countryName: "Guatemala" },
  { countryCode: "GN", dialCode: "224", countryName: "Guinea" },
  { countryCode: "GW", dialCode: "245", countryName: "Guinea-Bissau" },
  { countryCode: "GY", dialCode: "592", countryName: "Guyana" },
  { countryCode: "HT", dialCode: "509", countryName: "Haiti" },
  {
    countryCode: "HM",
    dialCode: "0",
    countryName: "Heard Island and McDonald Islands",
  },
  { countryCode: "HN", dialCode: "504", countryName: "Honduras" },
  { countryCode: "HK", dialCode: "852", countryName: "Hong Kong" },
  { countryCode: "HU", dialCode: "36", countryName: "Hungary" },
  { countryCode: "IS", dialCode: "354", countryName: "Iceland" },
  { countryCode: "IN", dialCode: "91", countryName: "India" },
  { countryCode: "ID", dialCode: "62", countryName: "Indonesia" },
  { countryCode: "IR", dialCode: "98", countryName: "Iran" },
  { countryCode: "IQ", dialCode: "964", countryName: "Iraq" },
  { countryCode: "IE", dialCode: "353", countryName: "Ireland" },
  { countryCode: "IL", dialCode: "972", countryName: "Israel" },
  { countryCode: "IT", dialCode: "39", countryName: "Italy" },
  { countryCode: "JM", dialCode: "1876", countryName: "Jamaica" },
  { countryCode: "JP", dialCode: "81", countryName: "Japan" },
  { countryCode: "JE", dialCode: "44", countryName: "Jersey" },
  { countryCode: "JO", dialCode: "962", countryName: "Jordan" },
  { countryCode: "KZ", dialCode: "7", countryName: "Kazakhstan" },
  { countryCode: "KE", dialCode: "254", countryName: "Kenya" },
  { countryCode: "KI", dialCode: "686", countryName: "Kiribati" },
  { countryCode: "KP", dialCode: "850", countryName: "North Korea" },
  { countryCode: "KR", dialCode: "82", countryName: "South Korea" },
  { countryCode: "KW", dialCode: "965", countryName: "Kuwait" },
  { countryCode: "KG", dialCode: "996", countryName: "Kyrgyzstan" },
  { countryCode: "LA", dialCode: "856", countryName: "Laos" },
  { countryCode: "LV", dialCode: "371", countryName: "Latvia" },
  { countryCode: "LB", dialCode: "961", countryName: "Lebanon" },
  { countryCode: "LS", dialCode: "266", countryName: "Lesotho" },
  { countryCode: "LR", dialCode: "231", countryName: "Liberia" },
  { countryCode: "LY", dialCode: "218", countryName: "Libya" },
  { countryCode: "LI", dialCode: "423", countryName: "Liechtenstein" },
  { countryCode: "LT", dialCode: "370", countryName: "Lithuania" },
  { countryCode: "LU", dialCode: "352", countryName: "Luxembourg" },
  { countryCode: "MO", dialCode: "853", countryName: "Macau" },
  { countryCode: "MK", dialCode: "389", countryName: "North Macedonia" },
  { countryCode: "MG", dialCode: "261", countryName: "Madagascar" },
  { countryCode: "MW", dialCode: "265", countryName: "Malawi" },
  { countryCode: "MY", dialCode: "60", countryName: "Malaysia" },
  { countryCode: "MV", dialCode: "960", countryName: "Maldives" },
  { countryCode: "ML", dialCode: "223", countryName: "Mali" },
  { countryCode: "MT", dialCode: "356", countryName: "Malta" },
  { countryCode: "MH", dialCode: "692", countryName: "Marshall Islands" },
  { countryCode: "MQ", dialCode: "596", countryName: "Martinique" },
  { countryCode: "MR", dialCode: "222", countryName: "Mauritania" },
  { countryCode: "MU", dialCode: "230", countryName: "Mauritius" },
  { countryCode: "YT", dialCode: "262", countryName: "Mayotte" },
  { countryCode: "MX", dialCode: "52", countryName: "Mexico" },
  { countryCode: "FM", dialCode: "691", countryName: "Micronesia" },
  { countryCode: "MD", dialCode: "373", countryName: "Moldova" },
  { countryCode: "MC", dialCode: "377", countryName: "Monaco" },
  { countryCode: "MN", dialCode: "976", countryName: "Mongolia" },
  { countryCode: "ME", dialCode: "382", countryName: "Montenegro" },
  { countryCode: "MS", dialCode: "1664", countryName: "Montserrat" },
  { countryCode: "MA", dialCode: "212", countryName: "Morocco" },
  { countryCode: "MZ", dialCode: "258", countryName: "Mozambique" },
  { countryCode: "MM", dialCode: "95", countryName: "Myanmar" },
  { countryCode: "NA", dialCode: "264", countryName: "Namibia" },
  { countryCode: "NR", dialCode: "674", countryName: "Nauru" },
  { countryCode: "NP", dialCode: "977", countryName: "Nepal" },
  { countryCode: "NL", dialCode: "31", countryName: "Netherlands" },
  { countryCode: "NC", dialCode: "687", countryName: "New Caledonia" },
  { countryCode: "NZ", dialCode: "64", countryName: "New Zealand" },
  { countryCode: "NI", dialCode: "505", countryName: "Nicaragua" },
  { countryCode: "NE", dialCode: "227", countryName: "Niger" },
  { countryCode: "NG", dialCode: "234", countryName: "Nigeria" },
  { countryCode: "NU", dialCode: "683", countryName: "Niue" },
  { countryCode: "NF", dialCode: "672", countryName: "Norfolk Island" },
  {
    countryCode: "MP",
    dialCode: "1670",
    countryName: "Northern Mariana Islands",
  },
  { countryCode: "NO", dialCode: "47", countryName: "Norway" },
  { countryCode: "OM", dialCode: "968", countryName: "Oman" },
  { countryCode: "PK", dialCode: "92", countryName: "Pakistan" },
  { countryCode: "PW", dialCode: "680", countryName: "Palau" },
  { countryCode: "PA", dialCode: "507", countryName: "Panama" },
  { countryCode: "PG", dialCode: "675", countryName: "Papua New Guinea" },
  { countryCode: "PY", dialCode: "595", countryName: "Paraguay" },
  { countryCode: "PE", dialCode: "51", countryName: "Peru" },
  { countryCode: "PH", dialCode: "63", countryName: "Philippines" },
  { countryCode: "PN", dialCode: "64", countryName: "Pitcairn" },
  { countryCode: "PL", dialCode: "48", countryName: "Poland" },
  { countryCode: "PT", dialCode: "351", countryName: "Portugal" },
  { countryCode: "PR", dialCode: "1787", countryName: "Puerto Rico" },
  { countryCode: "QA", dialCode: "974", countryName: "Qatar" },
  { countryCode: "RE", dialCode: "262", countryName: "Reunion" },
  { countryCode: "RO", dialCode: "40", countryName: "Romania" },
  { countryCode: "RU", dialCode: "7", countryName: "Russia" },
  { countryCode: "RW", dialCode: "250", countryName: "Rwanda" },
  { countryCode: "BL", dialCode: "590", countryName: "Saint Barthelemy" },
  { countryCode: "SH", dialCode: "290", countryName: "Saint Helena" },
  { countryCode: "KN", dialCode: "1869", countryName: "Saint Kitts and Nevis" },
  { countryCode: "LC", dialCode: "1758", countryName: "Saint Lucia" },
  { countryCode: "MF", dialCode: "590", countryName: "Saint Martin" },
  {
    countryCode: "PM",
    dialCode: "508",
    countryName: "Saint Pierre and Miquelon",
  },
  {
    countryCode: "VC",
    dialCode: "1784",
    countryName: "Saint Vincent and the Grenadines",
  },
  { countryCode: "WS", dialCode: "685", countryName: "Samoa" },
  { countryCode: "SM", dialCode: "378", countryName: "San Marino" },
  { countryCode: "ST", dialCode: "239", countryName: "Sao Tome and Principe" },
  { countryCode: "SA", dialCode: "966", countryName: "Saudi Arabia" },
  { countryCode: "SN", dialCode: "221", countryName: "Senegal" },
  { countryCode: "RS", dialCode: "381", countryName: "Serbia" },
  { countryCode: "SC", dialCode: "248", countryName: "Seychelles" },
  { countryCode: "SL", dialCode: "232", countryName: "Sierra Leone" },
  { countryCode: "SG", dialCode: "65", countryName: "Singapore" },
  { countryCode: "SX", dialCode: "1721", countryName: "Sint Maarten" },
  { countryCode: "SK", dialCode: "421", countryName: "Slovakia" },
  { countryCode: "SI", dialCode: "386", countryName: "Slovenia" },
  { countryCode: "SB", dialCode: "677", countryName: "Solomon Islands" },
  { countryCode: "SO", dialCode: "252", countryName: "Somalia" },
  { countryCode: "ZA", dialCode: "27", countryName: "South Africa" },
  { countryCode: "SS", dialCode: "211", countryName: "South Sudan" },
  { countryCode: "ES", dialCode: "34", countryName: "Spain" },
  { countryCode: "LK", dialCode: "94", countryName: "Sri Lanka" },
  { countryCode: "SD", dialCode: "249", countryName: "Sudan" },
  { countryCode: "SR", dialCode: "597", countryName: "Suriname" },
  { countryCode: "SJ", dialCode: "47", countryName: "Svalbard and Jan Mayen" },
  { countryCode: "SZ", dialCode: "268", countryName: "Swaziland" },
  { countryCode: "SE", dialCode: "46", countryName: "Sweden" },
  { countryCode: "CH", dialCode: "41", countryName: "Switzerland" },
  { countryCode: "SY", dialCode: "963", countryName: "Syria" },
  { countryCode: "TW", dialCode: "886", countryName: "Taiwan" },
  { countryCode: "TJ", dialCode: "992", countryName: "Tajikistan" },
  { countryCode: "TZ", dialCode: "255", countryName: "Tanzania" },
  { countryCode: "TH", dialCode: "66", countryName: "Thailand" },
  { countryCode: "TL", dialCode: "670", countryName: "Timor-Leste" },
  { countryCode: "TG", dialCode: "228", countryName: "Togo" },
  { countryCode: "TK", dialCode: "690", countryName: "Tokelau" },
  { countryCode: "TO", dialCode: "676", countryName: "Tonga" },
  { countryCode: "TT", dialCode: "1868", countryName: "Trinidad and Tobago" },
  { countryCode: "TN", dialCode: "216", countryName: "Tunisia" },
  { countryCode: "TR", dialCode: "90", countryName: "Turkey" },
  { countryCode: "TM", dialCode: "993", countryName: "Turkmenistan" },
  {
    countryCode: "TC",
    dialCode: "1649",
    countryName: "Turks and Caicos Islands",
  },
  { countryCode: "TV", dialCode: "688", countryName: "Tuvalu" },
  { countryCode: "UG", dialCode: "256", countryName: "Uganda" },
  { countryCode: "UA", dialCode: "380", countryName: "Ukraine" },
  { countryCode: "AE", dialCode: "971", countryName: "United Arab Emirates" },
  { countryCode: "GB", dialCode: "44", countryName: "United Kingdom" },
  { countryCode: "US", dialCode: "1", countryName: "United States" },
  { countryCode: "UY", dialCode: "598", countryName: "Uruguay" },
  { countryCode: "UZ", dialCode: "998", countryName: "Uzbekistan" },
  { countryCode: "VU", dialCode: "678", countryName: "Vanuatu" },
  { countryCode: "VE", dialCode: "58", countryName: "Venezuela" },
  { countryCode: "VN", dialCode: "84", countryName: "Vietnam" },
  { countryCode: "WF", dialCode: "681", countryName: "Wallis and Futuna" },
  { countryCode: "EH", dialCode: "212", countryName: "Western Sahara" },
  { countryCode: "YE", dialCode: "967", countryName: "Yemen" },
  { countryCode: "ZM", dialCode: "260", countryName: "Zambia" },
  { countryCode: "ZW", dialCode: "263", countryName: "Zimbabwe" },
];
import world from "../../assets/auth/world.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
// import 'react-flags-select/css/react-flags-select.css';
import { motion } from "framer-motion";
import { setUser } from "../../store/slices/aut.slice";
// Create a list of countries with their dial codes and country codes.

const spinnerVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: {
      dialCode: "",
      countryCode: "",
      countryName: "",
    },
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
    };

    if (!userData.firstName) {
      newErrors.firstName = "First Name is required";
      valid = false;
    }
    if (!userData.lastName) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }
    if (!userData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // getProfileData();
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleCountryChange = (countryCode) => {
    const selectedCountry = countries.find(
      (country) => country.countryCode === countryCode
    );
    if (selectedCountry) {
      setUserData({
        ...userData,
        country: {
          dialCode: selectedCountry.dialCode,
          countryCode: selectedCountry.countryCode,
          countryName: selectedCountry.countryName,
        },
      });
    }
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        setSavingLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}user/profile`,
          {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            country: {
              dialCode: userData.country.dialCode,
              countryCode: userData.country.countryCode,
              countryName: userData.country.countryName,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSavingLoading(false);
        setIsEditing(false);
        getProfileData();
      } catch (error) {
        setSavingLoading(false);
        ReactToast(error.message);
      }
    }
  };

  const getProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phone: ` ${response.data.phone}`,
        country: {
          dialCode: response.data.country.dialCode,
          countryCode: response.data.country.countryCode,
          countryName: response.data.country.countryName,
        },
      };
      dispatch(setUser(profileData));
      setUserData(profileData);
      setLoading(false);
    } catch (error) {
      ReactToast(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>

      {loading ? (
        <div className="h-[85vh] w-full flex justify-center items-center ">
          <Spinner />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:px-[6vw] md:my-9 ">
              <div className="flex flex-col border px-[2vw] shadow-lg py-6">
                <div className="font-bold h-[10vh] flex items-center text-[1.3rem]">
                  My Account
                </div>
                <div
                  className="bg-[#1B1D29] text-white p-6 rounded-lg text-center"
                  style={{
                    backgroundImage: `url(${world})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="rounded-full mx-auto mb-4 w-24 h-24 bg-white flex items-center justify-center text-[#D7B56D] text-3xl font-bold uppercase">
                    {user?.firstName?.charAt(0)}
                  </div>
                  <h1 className="text-2xl font-bold text-[#D7B56D] uppercase">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="font-bold text-xl text-[#D7B56D]">{user?.phone}</p>
                </div>
                <div className="flex  item-center justify-center px-10 ">
                  <div className="md:p-6 pl-2 md:pl-0  flex flex-col w-full  justify-center items-center   py-2    lg:w-1/2">
                    <div className="flex flex-col md:flex-row  w-full md:gap-4">
                      <div className="flex w-full lg:w-1/2 lg:items-end flex-col  ">
                        <div className="flex flex-col w-3/4">
                          <div className=" flex flex-col gap-2 h-full ">
                            <label className="text-gray-700 text-sm">
                              First Name
                            </label>
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={userData.firstName}
                                  onChange={(e) =>
                                    handleChange("firstName", e.target.value)
                                  }
                                  className="md:w-3/4 w-full rounded-lg border border-gray-300 shadow-sm p-2 md:text-xl"
                                />
                                {errors.firstName && (
                                  <p className="text-red-500 text-xs">
                                    {errors.firstName}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="mt-1 p-2  w-3/4 md:text-xl font-semibold text-[#1B1D29] uppercase">
                                {userData.firstName}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 h-full">
                            <label className="text-gray-700 text-sm">
                              Last Name
                            </label>
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={userData.lastName}
                                  onChange={(e) =>
                                    handleChange("lastName", e.target.value)
                                  }
                                  className=" w-full md:w-3/4  rounded-lg border border-gray-300 shadow-sm p-2 md:text-xl"
                                />
                                {errors.lastName && (
                                  <p className="text-red-500 text-xs">
                                    {errors.lastName}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="mt-1 p-2 w-3/4 md:text-xl font-semibold text-[#1B1D29] uppercase">
                                {userData.lastName}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full  lg:w-1/2 lg:items-end  flex-col ">
                        <div className="w-3/4  flex flex-col">
                          <div className=" flex flex-col md:gap-2 h-full">
                            <label className="text-gray-700 text-sm">
                              Country
                            </label>
                            {isEditing ? (
                              <ReactFlagsSelect
                                selected={userData.country.countryCode}
                                onSelect={handleCountryChange}
                                className="w-full md:w-3/4"
                              />
                            ) : (
                              <p className="mt-1 p-2 w-3/4 md:text-xl font-semibold text-[#1B1D29] uppercase">
                                {userData.country.countryName} (+
                                {userData.country.dialCode})
                              </p>
                            )}
                          </div>
                          <div className=" flex flex-col gap-2 h-full ">
                            <label className="text-gray-700 text-sm">
                              Email
                            </label>
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={userData.email}
                                  onChange={(e) =>
                                    handleChange("email", e.target.value)
                                  }
                                  className="w-full md:w-3/4 rounded-lg border border-gray-300 shadow-sm p-2 md:text-xl"
                                />
                                {errors.email && (
                                  <p className="text-red-500 text-xs">
                                    {errors.email}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="mt-1 w-3/4 p-2  md:text-xl font-semibold text-[#1B1D29] uppercase">
                                {userData.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {savingLoading ? (
                      <div className="flex justify-center items-center h-full w-full p-4">
                        <motion.div
                          className="w-4 h-4 border-4 border-t-4 border-t-[#D7B56D] border-gray-200 rounded-full"
                          variants={spinnerVariants}
                          animate="animate"
                        />
                      </div>
                    ) : (
                      <div className="flex   md:flex-col lg:flex-row gap-1 ">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              disabled={savingLoading}
                              className=" border bg-[#1B1D29] text-[#D7B56D] px-4  py-2 rounded mt-4"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className=" border bg-[#1B1D29] text-[#D7B56D] px-4 w-1/2 py-2 rounded mt-4"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={handleEdit}
                            className=" bg-[#1B1D29] border text-[#D7B56D]   px-4 py-2 rounded mt-4"
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </>
      )}
    </>
  );
};

export default UserProfile;
