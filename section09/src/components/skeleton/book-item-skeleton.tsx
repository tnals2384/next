export default function BookItemSkeleton() {
    return <div className="flex gap-4 p-5 border-b border-b-gray-300 ">
        <div className="w-[80px] h-[105px] bg-gray-200"> </div>
        <div className="flex-1"> 
        <div className="w-full h-[20px] bg-gray-200"> </div>
        <div className="w-full h-[20px] bg-gray-200"> </div>
        <br></br>
        <div className="w-full h-[20px] bg-gray-200"> </div> 

        </div>

    </div>

}