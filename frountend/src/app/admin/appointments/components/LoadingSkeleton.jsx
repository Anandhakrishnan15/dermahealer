export default function LoadingSkeleton() {

    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (

                <tr
                    key={i}
                    className="animate-pulse border-b"
                >

                    <td className="p-3">
                        <div className="h-4 w-32 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-28 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-40 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-16 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-8 w-24 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-20 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-16 rounded bg-gray-200"></div>
                    </td>

                    <td className="p-3">
                        <div className="h-4 w-28 rounded bg-gray-200"></div>
                    </td>

                </tr>

            ))}
        </>
    );
}