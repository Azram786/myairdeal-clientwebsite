export const ApiData = {
  tripInfos: [
    {
      sI: [
        {
          id: "172",
          fD: {
            aI: {
              code: "AI",
              name: "Air India",
              isLcc: false,
            },
            fN: "401",
            eT: "321",
          },
          stops: 0,
          so: [],
          duration: 135,
          da: {
            code: "DEL",
            name: "Delhi Indira Gandhi Intl",
            cityCode: "DEL",
            city: "Delhi",
            country: "India",
            countryCode: "IN",
            terminal: "Terminal 3",
          },
          aa: {
            code: "CCU",
            name: "Netaji Subhas Chandra Bose Intl",
            cityCode: "CCU",
            city: "Kolkata",
            country: "India",
            countryCode: "IN",
          },
          dt: "2024-07-28T06:45",
          at: "2024-07-28T09:00",
          iand: false,
          isRs: false,
          sN: 0,
          ssrInfo: {
            MEAL: [
              {
                code: "VGML",
                amount: 0,
                desc: "Vegan Veg Meal",
              },
              {
                code: "AVML",
                amount: 0,
                desc: "Hindu Veg Meal",
              },
              {
                code: "VJML",
                amount: 0,
                desc: "Jain Veg Meal",
              },
              {
                code: "VLML",
                amount: 0,
                desc: "Lacto-Ovo Veg Meal",
              },
              {
                code: "FPML",
                amount: 0,
                desc: "Fruit Platter Meal",
              },
              {
                code: "NVML",
                amount: 0,
                desc: "Non-Veg Meal",
              },
              {
                code: "MOML",
                amount: 0,
                desc: "Moslem Meal",
              },
              {
                code: "HNML",
                amount: 0,
                desc: "Hindu Non-Veg Meal",
              },
              {
                code: "SFML",
                amount: 0,
                desc: "Sea Food Meal",
              },
              {
                code: "DBML",
                amount: 0,
                desc: "Diabetic Meal",
              },
              {
                code: "NLML",
                amount: 0,
                desc: "Low Lactose Meal",
              },
              {
                code: "CHML",
                amount: 0,
                desc: "Child Meal",
              },
              {
                code: "BBML",
                amount: 0,
                desc: "Baby Meal",
              },
              {
                code: "BLML",
                amount: 0,
                desc: "Bland Meal",
              },
              {
                code: "GFML",
                amount: 0,
                desc: "Gluten Intolerant Meal",
              },
              {
                code: "KSML",
                amount: 0,
                desc: "Kosher Meal",
              },
              {
                code: "LCML",
                amount: 0,
                desc: "Low Calorie Meal",
              },
              {
                code: "LFML",
                amount: 0,
                desc: "Low Fat Meal",
              },
              {
                code: "LSML",
                amount: 0,
                desc: "ow Salt Meal",
              },
              {
                code: "RVML",
                amount: 0,
                desc: "Vegetarian Raw Meal",
              },
              {
                code: "VOML",
                amount: 0,
                desc: "Vegetarian Oriental Meal",
              },
              {
                code: "SPML",
                amount: 0,
                desc: "Special Meal",
              },
              {
                code: "PFML",
                amount: 0,
                desc: "Peanut Free Meal",
              },
              {
                code: "ORML",
                amount: 0,
                desc: "Oriental Meal",
              },
              {
                code: "NSML",
                amount: 0,
                desc: "No Salt Meal",
              },
              {
                code: "PRML",
                amount: 0,
                desc: "Low Purine Meal",
              },
              {
                code: "LPML",
                amount: 0,
                desc: "Low Protein Meal",
              },
              {
                code: "HFML",
                amount: 0,
                desc: "High Fiber Meal",
              },
              {
                code: "NFML",
                amount: 0,
                desc: "No Fish Meal",
              },
            ],
          },
          ac: [],
        },
      ],
      totalPriceList: [
        {
          fd: {
            ADULT: {
              fC: {
                TAF: 3736,
                NF: 30036,
                BF: 26300,
                TF: 30036,
              },
              afC: {
                TAF: {
                  OT: 389,
                  AGST: 3177,
                  YR: 170,
                },
              },
              sR: 4,
              bI: {
                iB: "35 Kg",
                cB: "7 Kg",
              },
              rT: 1,
              cc: "BUSINESS",
              cB: "Z",
              fB: "ZIP",
              mI: true,
            },
          },
          fareIdentifier: "PUBLISHED",
          id: "R30-15-10-5-4-1-00278209550_0DELCCUAI401~8420749935475338",
          messages: [],
          pc: {
            code: "AI",
            name: "Air India",
            isLcc: false,
          },
          fareRuleInformation: {
            fr: {},
            tfr: {
              NO_SHOW: [
                {
                  policyInfo:
                    "INR 3,000/- If cancelled less than 2 Hours before departure",
                  st: "0",
                  et: "8760",
                },
              ],
              DATECHANGE: [
                {
                  amount: 3000,
                  policyInfo:
                    "__nls__Changes permitted 02 Hrs before scheduled departure__nls__Change Penalty : INR 3,000/- or basic fare whichever is lower + Fare Difference",
                  fcs: {
                    ARFT: 0,
                    ARF: 3000,
                  },
                  st: "4",
                  et: "8760",
                },
              ],
              CANCELLATION: [
                {
                  amount: 3000,
                  policyInfo:
                    "__nls__Cancellation permitted 02 Hrs before scheduled departure__nls__Cancellation Penalty : INR 3,000/- or basic fare whichever is lower",
                  fcs: {
                    ACF: 3000,
                    ACFT: 0,
                  },
                  st: "4",
                  et: "8760",
                },
              ],
              SEAT_CHARGEABLE: [
                {
                  policyInfo: "",
                  st: "0",
                  et: "8760",
                },
              ],
            },
          },
        },
      ],
    },
    {
      sI: [
        {
          id: "621",
          fD: {
            aI: {
              code: "AI",
              name: "Air India",
              isLcc: false,
            },
            fN: "676",
            eT: "321",
          },
          stops: 0,
          so: [],
          duration: 165,
          cT: 180,
          da: {
            code: "CCU",
            name: "Netaji Subhas Chandra Bose Intl",
            cityCode: "CCU",
            city: "Kolkata",
            country: "India",
            countryCode: "IN",
          },
          aa: {
            code: "BOM",
            name: "Chhatrapati Shivaji",
            cityCode: "BOM",
            city: "Mumbai",
            country: "India",
            countryCode: "IN",
            terminal: "Terminal 2",
          },
          dt: "2024-07-31T09:45",
          at: "2024-07-31T12:30",
          iand: false,
          isRs: false,
          sN: 0,
          ssrInfo: {
            MEAL: [
              {
                code: "VGML",
                amount: 0,
                desc: "Vegan Veg Meal",
              },
              {
                code: "AVML",
                amount: 0,
                desc: "Hindu Veg Meal",
              },
              {
                code: "VJML",
                amount: 0,
                desc: "Jain Veg Meal",
              },
              {
                code: "VLML",
                amount: 0,
                desc: "Lacto-Ovo Veg Meal",
              },
              {
                code: "FPML",
                amount: 0,
                desc: "Fruit Platter Meal",
              },
              {
                code: "NVML",
                amount: 0,
                desc: "Non-Veg Meal",
              },
              {
                code: "MOML",
                amount: 0,
                desc: "Moslem Meal",
              },
              {
                code: "HNML",
                amount: 0,
                desc: "Hindu Non-Veg Meal",
              },
              {
                code: "SFML",
                amount: 0,
                desc: "Sea Food Meal",
              },
              {
                code: "DBML",
                amount: 0,
                desc: "Diabetic Meal",
              },
              {
                code: "NLML",
                amount: 0,
                desc: "Low Lactose Meal",
              },
              {
                code: "CHML",
                amount: 0,
                desc: "Child Meal",
              },
              {
                code: "BBML",
                amount: 0,
                desc: "Baby Meal",
              },
              {
                code: "BLML",
                amount: 0,
                desc: "Bland Meal",
              },
              {
                code: "GFML",
                amount: 0,
                desc: "Gluten Intolerant Meal",
              },
              {
                code: "KSML",
                amount: 0,
                desc: "Kosher Meal",
              },
              {
                code: "LCML",
                amount: 0,
                desc: "Low Calorie Meal",
              },
              {
                code: "LFML",
                amount: 0,
                desc: "Low Fat Meal",
              },
              {
                code: "LSML",
                amount: 0,
                desc: "ow Salt Meal",
              },
              {
                code: "RVML",
                amount: 0,
                desc: "Vegetarian Raw Meal",
              },
              {
                code: "VOML",
                amount: 0,
                desc: "Vegetarian Oriental Meal",
              },
              {
                code: "SPML",
                amount: 0,
                desc: "Special Meal",
              },
              {
                code: "PFML",
                amount: 0,
                desc: "Peanut Free Meal",
              },
              {
                code: "ORML",
                amount: 0,
                desc: "Oriental Meal",
              },
              {
                code: "NSML",
                amount: 0,
                desc: "No Salt Meal",
              },
              {
                code: "PRML",
                amount: 0,
                desc: "Low Purine Meal",
              },
              {
                code: "LPML",
                amount: 0,
                desc: "Low Protein Meal",
              },
              {
                code: "HFML",
                amount: 0,
                desc: "High Fiber Meal",
              },
              {
                code: "NFML",
                amount: 0,
                desc: "No Fish Meal",
              },
            ],
          },
          ac: [],
        },
        {
          id: "622",
          fD: {
            aI: {
              code: "AI",
              name: "Air India",
              isLcc: false,
            },
            fN: "845",
            eT: "320",
          },
          stops: 0,
          so: [],
          duration: 80,
          da: {
            code: "BOM",
            name: "Chhatrapati Shivaji",
            cityCode: "BOM",
            city: "Mumbai",
            country: "India",
            countryCode: "IN",
            terminal: "Terminal 2",
          },
          aa: {
            code: "GOX",
            name: "Goa arpt",
            cityCode: "GOX",
            city: "Goa in",
            country: "India",
            countryCode: "IN",
          },
          dt: "2024-07-31T15:30",
          at: "2024-07-31T16:50",
          iand: false,
          isRs: false,
          sN: 1,
          ssrInfo: {
            MEAL: [
              {
                code: "VGML",
                amount: 0,
                desc: "Vegan Veg Meal",
              },
              {
                code: "AVML",
                amount: 0,
                desc: "Hindu Veg Meal",
              },
              {
                code: "VJML",
                amount: 0,
                desc: "Jain Veg Meal",
              },
              {
                code: "VLML",
                amount: 0,
                desc: "Lacto-Ovo Veg Meal",
              },
              {
                code: "FPML",
                amount: 0,
                desc: "Fruit Platter Meal",
              },
              {
                code: "NVML",
                amount: 0,
                desc: "Non-Veg Meal",
              },
              {
                code: "MOML",
                amount: 0,
                desc: "Moslem Meal",
              },
              {
                code: "HNML",
                amount: 0,
                desc: "Hindu Non-Veg Meal",
              },
              {
                code: "SFML",
                amount: 0,
                desc: "Sea Food Meal",
              },
              {
                code: "DBML",
                amount: 0,
                desc: "Diabetic Meal",
              },
              {
                code: "NLML",
                amount: 0,
                desc: "Low Lactose Meal",
              },
              {
                code: "CHML",
                amount: 0,
                desc: "Child Meal",
              },
              {
                code: "BBML",
                amount: 0,
                desc: "Baby Meal",
              },
              {
                code: "BLML",
                amount: 0,
                desc: "Bland Meal",
              },
              {
                code: "GFML",
                amount: 0,
                desc: "Gluten Intolerant Meal",
              },
              {
                code: "KSML",
                amount: 0,
                desc: "Kosher Meal",
              },
              {
                code: "LCML",
                amount: 0,
                desc: "Low Calorie Meal",
              },
              {
                code: "LFML",
                amount: 0,
                desc: "Low Fat Meal",
              },
              {
                code: "LSML",
                amount: 0,
                desc: "ow Salt Meal",
              },
              {
                code: "RVML",
                amount: 0,
                desc: "Vegetarian Raw Meal",
              },
              {
                code: "VOML",
                amount: 0,
                desc: "Vegetarian Oriental Meal",
              },
              {
                code: "SPML",
                amount: 0,
                desc: "Special Meal",
              },
              {
                code: "PFML",
                amount: 0,
                desc: "Peanut Free Meal",
              },
              {
                code: "ORML",
                amount: 0,
                desc: "Oriental Meal",
              },
              {
                code: "NSML",
                amount: 0,
                desc: "No Salt Meal",
              },
              {
                code: "PRML",
                amount: 0,
                desc: "Low Purine Meal",
              },
              {
                code: "LPML",
                amount: 0,
                desc: "Low Protein Meal",
              },
              {
                code: "HFML",
                amount: 0,
                desc: "High Fiber Meal",
              },
              {
                code: "NFML",
                amount: 0,
                desc: "No Fish Meal",
              },
            ],
          },
          ac: [],
        },
      ],
      totalPriceList: [
        {
          fd: {
            ADULT: {
              fC: {
                TAF: 2100,
                NF: 9128,
                BF: 7028,
                TF: 9128,
              },
              afC: {
                TAF: {
                  OT: 1391,
                  AGST: 369,
                  YR: 340,
                },
              },
              sR: 9,
              bI: {
                iB: "25 Kg (01 Piece only)",
                cB: "7 Kg",
              },
              rT: 1,
              cc: "ECONOMY",
              cB: "U",
              fB: "UIPYL",
              mI: false,
            },
          },
          fareIdentifier: "PUBLISHED",
          id: "R30-15-10-5-4-1-00278209550_1CCUBOMAI676BOMGOXAI845~8420749937321004",
          messages: [],
          pc: {
            code: "AI",
            name: "Air India",
            isLcc: false,
          },
          fareRuleInformation: {
            fr: {},
            tfr: {
              NO_SHOW: [
                {
                  policyInfo:
                    "Non refundable (Only statutory taxes will be refunded)",
                  st: "0",
                  et: "8760",
                },
              ],
              DATECHANGE: [
                {
                  amount: 3000,
                  policyInfo:
                    "__nls__Changes permitted 02 Hrs before scheduled departure__nls__Change Penalty : INR 3,000/- or basic fare whichever is lower + Fare Difference",
                  fcs: {
                    ARFT: 0,
                    ARF: 3000,
                  },
                  st: "4",
                  et: "8760",
                },
              ],
              CANCELLATION: [
                {
                  amount: 3000,
                  policyInfo:
                    "__nls__Cancellation permitted 02 Hrs before scheduled departure__nls__Cancellation Penalty : INR 3,000/- or basic fare whichever is lower",
                  fcs: {
                    ACF: 3000,
                    ACFT: 0,
                  },
                  st: "4",
                  et: "8760",
                },
              ],
              SEAT_CHARGEABLE: [
                {
                  policyInfo: "",
                  st: "0",
                  et: "8760",
                },
              ],
            },
          },
        },
      ],
    },
  ],
  searchQuery: {
    routeInfos: [
      {
        fromCityOrAirport: {
          code: "DEL",
          name: "Delhi Indira Gandhi Intl",
          cityCode: "DEL",
          city: "Delhi",
          country: "India",
          countryCode: "IN",
        },
        toCityOrAirport: {
          code: "CCU",
          name: "Netaji Subhas Chandra Bose Intl",
          cityCode: "CCU",
          city: "Kolkata",
          country: "India",
          countryCode: "IN",
        },
        travelDate: "2024-07-28",
      },
      {
        fromCityOrAirport: {
          code: "CCU",
          name: "Netaji Subhas Chandra Bose Intl",
          cityCode: "CCU",
          city: "Kolkata",
          country: "India",
          countryCode: "IN",
        },
        toCityOrAirport: {
          code: "GOX",
          name: "Goa arpt",
          cityCode: "GOX",
          city: "Goa in",
          country: "India",
          countryCode: "IN",
        },
        travelDate: "2024-07-31",
      },
    ],
    cabinClass: "ECONOMY",
    paxInfo: {
      ADULT: 2,
      CHILD: 0,
      INFANT: 0,
    },
    requestId: "0027820955",
    searchType: "MULTICITY",
    searchModifiers: {
      pft: "REGULAR",
      pfts: ["REGULAR"],
    },
    isDomestic: true,
  },
  bookingId: "TJS101101026498",
  totalPriceInfo: {
    totalFareDetail: {
      fC: {
        TAF: 11672,
        NF: 78328,
        BF: 66656,
        TF: 78328,
      },
      afC: {
        TAF: {
          OT: 3560,
          AGST: 7092,
          YR: 1020,
        },
      },
    },
  },
  status: {
    success: true,
    httpStatus: 200,
  },
  conditions: {
    ffas: ["AI"],
    isa: false,
    dob: {
      adobr: false,
      cdobr: false,
      idobr: true,
    },
    iecr: false,
    dc: {
      ida: false,
      idm: false,
    },
    ipa: false,
    addOns: {
      isbpa: false,
    },
    isBA: true,
    st: 900,
    sct: "2024-07-26T12:48:55.953",
    gst: {
      gstappl: true,
      igm: false,
    },
  },
};
