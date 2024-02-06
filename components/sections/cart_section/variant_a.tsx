import React from "react";
import { EcwidContextProvider } from "context/EcwidContext";

function VariantA() {
  return (
    <EcwidContextProvider>
      <section className="pt-20">
        <div className="container mx-auto px-5">
          <div className="py-8">
            <div id="ecwid-shop-store"></div>
          </div>
        </div>
      </section>
    </EcwidContextProvider>
  );
}
export default VariantA;
