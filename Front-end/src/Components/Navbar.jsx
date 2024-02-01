import React from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Log_out } from "../Redux/Actions/Users_Action";
import { ImExit, ImPrinter } from "react-icons/im";

export default function Navbar() {
  console.log(window.location.pathname);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const Caisses = useSelector((state) => state.caisses1.caisses);
  const BankCaisses = useSelector((state) => state.BankCaisses.BankCaisses);
  const EventCaisses = useSelector((state) => state.caissesEvent.caisses);
  const products = useSelector((state) => state.Products.products);
  console.log(products);

  const handlePrint = () => {
    const totalRecetteValue =
      document.getElementById("totalRecetteValue").innerText;
    const liquideDisponibleValue = document.getElementById(
      "liquideDisponibleValue"
    ).innerText;
    const totalChequesValue =
      document.getElementById("totalChequesValue").innerText;
    const totalTPETransactionValue = document.getElementById(
      "totalTPETransactionValue"
    ).innerText;

    const printWindow = window.open("", "_blank");
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>A4 Format Document</title>
  <style>
    @media print {
      body {
        margin: 0;
        padding: 0;
        background-color: #fff;
        display: flex;
        flex-direction: column; /* Change to column for vertical display */
        align-items: center; /* Center horizontally */
      }

      .content {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        margin: 0.2cm 0; /* Adjust top and bottom margin */
        display: flex;
        flex-direction: row; /* Change to row for horizontal display */
        gap: 10px; /* Adjust gap */
        align-items: flex-start;
        justify-content: center; /* Center horizontally */
        width:700px;
      }

      .card {
        width: 160px; /* Adjust card width */
        height: 105px;
        background-color: rgba(0, 126, 127, 0.75);
        border-radius: 10px;
        margin-right: auto; /* Adjust margin between cards */
        padding: 10px;
        color: #fff7d6;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
      }

      .card div:nth-child(2) {
        font-size: 32px;
      }

      /* New styles for BankCaisse Montant */
      .bank-caisse-montant-card {
        width: 350px; /* Two card widths + gap */
        background-color: rgba(0, 126, 127, 0.75);
        border-radius: 10px;
        padding: 10px;
        margin-right: auto; /* Adjust margin between cards */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
      }

      .bank-caisse-montant {
        font-size: 32px; /* Adjust font size */
        color: #fff7d6;
        font-weight: bold;
        margin-top: 10px; /* Adjust margin */
        text-align: center;
      }

      .bank-caisse-title {
        font-size: 20px; /* Adjust title font size */
        color: #fff7d6; 
        font-weight: bold;
        text-align: center;
        margin-top: 20px; /* Adjust title margin */
      }

      .product-list-card {
        width: 700px; /* Two card widths + gap */
        background-color: rgba(0, 126, 127, 0.75);
        border-radius: 10px;
        padding: 10px;
        margin-right: auto;
        margin-top: -10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 2fr)); /* Adjust the min and max width */
        gap: 5px; /* Adjust the gap between items */
      }

      .product-list-title {
        font-size: 20px; /* Adjust title font size */
        color: #fff7d6; 
        font-weight: bold;
        text-align: center;
        margin-top: 10px; /* Adjust title margin */
        width: 700px;
      }

      .product-list-item {
        display: flex;
        font-size: 16px; /* Adjust font size */
        color: #fff7d6;
        margin-top: 5px; /* Adjust margin */
        text-align: center;
        border: solid 0.5px  #fff7d6 ;
        border-radius: 5px;
        padding:3px;
        box-sizing: border-box;
       
      }
   
    }
  </style>
</head>

<body>
  <!-- Row for Existing Content -->
  <div class="content">
    <div class="card">
      <div>Total des recettes</div>
      <div id="totalRecetteValue">${totalRecetteValue}</div>
    </div>
    <div class="card">
      <div>Liquide disponible</div>
      <div id="liquideDisponibleValue">${liquideDisponibleValue}</div>
    </div>
    <div class="card">
      <div>Total des Cheques</div>
      <div>${totalChequesValue}</div>
    </div>
    <div class="card">
      <div>Total des TPE</div>
      <div>${totalTPETransactionValue}</div>
    </div>
  </div>

  <!-- Row for Caisse -->
  <div class="content">
    ${Caisses.map(
      (caisse) => `
        <div class="card">
          <div>${caisse.Title}</div>
          <div>
            ${
              caisse.Recette && caisse.Recette.length > 0
                ? caisse.Recette[0].montant
                : "N/A"
            }
          </div>
        </div>
      `
    ).join("")}
  </div>

  <!-- Row for BankCaisse Montant && Caisse event-->
  <div class="content"> 
    <div class="content bank-caisse-montant-card">
      <div class="bank-caisse-title">Retrait bancaire</div>
      ${BankCaisses.map(
        (caisse) => `
          <div class="bank-caisse-montant">${caisse.Montant}</div>
        `
      ).join("")}
    </div>
    <div class="content bank-caisse-montant-card">
      ${EventCaisses.map(
        (caisse) => `
          <div class="bank-caisse-title">${caisse.Title}</div>
          <div class="bank-caisse-montant"> ${
            caisse.Recette && caisse.Recette.length > 0
              ? caisse.Recette[0].montant
              : "N/A"
          }</div>
        `
      ).join("")}
    </div>
  </div>

  <!-- Row for Product List -->
  <div class="content">
    <div class="content product-list-card">
      <div class="product-list-title">Product List</div>
      ${products
        .map(
          (product) => `
            ${product.Product.map(
              (item) => `
                <div class="product-list-item">
                  <div>${item.Name}</div>
                  <div>Qte: ${item.Quantity}${item.Unity}</div>
                  <div>Prix: ${item.Price}Dt</div>
                </div>
              `
            ).join("")}
          `
        )
        .join("")}
    </div>
  </div>
  
  
</body>

</html>




    
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Disclosure
      as="nav"
      className="NavBar-BackGround sticky top-0 z-50"
      id="navbBar"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block pl-0">
                  <div className="flex space-x-12">
                    <div
                      id="navbar-text"
                      className=" hover:text-white rounded-md  py-2 text-sm font-medium mt-2.5 ml-0"
                    >
                      {window.location.pathname === "/Caisses1" ? (
                        <Link
                          to="/Caisses1"
                          style={{
                            textDecoration: "none",
                            transition: "all 500ms",
                            color: "hwb(41 21% 27%)",
                          }}
                        >
                          {" "}
                          <h6>Caisses</h6>
                        </Link>
                      ) : (
                        <Link
                          to="/Caisses1"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {" "}
                          <h6>Caisses</h6>
                        </Link>
                      )}
                    </div>
                    <div
                      className=" hover:text-white rounded-md px-3 py-2 text-sm mt-2.5 "
                      id="navbar-text"
                    >
                      {window.location.pathname === "/Economa" ? (
                        <Link
                          to="/Economa"
                          style={{
                            textDecoration: "none",
                            transition: "all 500ms",
                            color: "hwb(41 21% 27%)",
                          }}
                        >
                          {" "}
                          <h6>Achat</h6>
                        </Link>
                      ) : (
                        <Link
                          to="/Economa"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {" "}
                          <h6>Achat</h6>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>
                  <div /*id="navbar-text"*/ className="text-white mt-2.5">
                    <h6>Signed in as: {user.Name}</h6>
                  </div>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-9  ">
                  <a
                    style={{
                      textDecoration: "none",
                      fontFamily: "Courier New",
                    }}
                    href="#"
                    id="navbar-text"
                    className=" block px-4 py-2 text-sm  mt-2.5"
                    onClick={() => dispatch(Log_out(Navigate))}
                  >
                    <h4>
                      <ImExit />
                    </h4>
                  </a>
                </Menu>
              </div>

              {/* Print icon for printing resume */}
              <ImPrinter
                onClick={handlePrint}
                className="block h-6 w-6 ml-4 cursor-pointer"
                title="Print Resume"
              />
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
