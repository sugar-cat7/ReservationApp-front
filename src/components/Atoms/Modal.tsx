import { XCircleIcon } from '@heroicons/react/solid';

type ModalProps = {
  data: string;
  showModal: boolean;
  onClickYes?: () => void;
  onClickNo?: () => void;
};

const Modal: React.FC<ModalProps> = ({ data, showModal, onClickYes, onClickNo, children }) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex flex-wrap overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={onClickNo}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/*header*/}
                <XCircleIcon className="h-6 w-6 z-1 absolute -top-1 -right-1" onClick={onClickNo} />
                <div className="relative p-6 flex justify-between">
                  <div className="my-4 text-blueGray-500 text-lg leading-relaxed">{data}</div>
                  {/* <button className="my-4 text-blue-500 background-transparent border border-blue-500 rounded py-1 px-1">
                    予定追加
                  </button> */}
                </div>
                {children ? (
                  <div>{children}</div>
                ) : (
                  <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={onClickNo}
                    >
                      いいえ
                    </button>
                    <button
                      className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={onClickYes}
                    >
                      はい
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
