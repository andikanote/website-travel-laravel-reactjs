export default function Checkbox({ label, ...props }) {
    return (
        <>
            <div className='flex flex-row items-center gap-2'>
                <input
                    {...props}
                    type="checkbox"
                    className={
                        'rounded-md bg-white border-gray-200 checked:bg-teal-500'
                    }
                />
                <label className='ml-2 text-gray-600'>{label}</label>
            </div>
        </>
    );
}
