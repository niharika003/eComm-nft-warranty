import { buyModalHide } from "@/redux/counterSlice";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CheckValidityModal = () => {
  const { buyModal, txnHash } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div className={buyModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Warranty
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(buyModalHide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              Don't Worry!! Your product is under warranty.{<br />}
              We will get back to you soon.{<br />}
            </div>
            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <Link href={`https://sepolia.etherscan.io/tx/${txnHash}`}>
                  <button
                    type="button"
                    className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
            {/* <!-- end body --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckValidityModal;
