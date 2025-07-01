import { MdOutlineLocationOff } from "react-icons/md";

const NoInputError = () => {
    return (
        <div className="flex justify-evenly flex-col items-center min-h-[calc(100vh-64px)] w-full font-open">
          <MdOutlineLocationOff className="text-[300px] text-gray-500/50" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-red-500 font-bold text-xl">Peringatan</p>
            <p className="text-gray-900 text-sm">
              Kamu belum memasukkan nama kota.
            </p>
          </div>
        </div>
    )
}

export default NoInputError;