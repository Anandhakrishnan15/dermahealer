export default function LoadingSkeleton() {

    return (
        <>
            {Array.from({ length: 5 }).map(
                (_, i) => (

                    <tr
                        key={i}
                        className="animate-pulse"
                    >

                        <td
                            colSpan={9}
                            className="p-3 bg-gray-100 h-6"
                        ></td>

                    </tr>

                )
            )}
        </>
    );
}