"use client";

export default function RecentAppointments({ appointments }) {
    return (
        <div className="p-6 rounded-lg shadow" style={{ background: "var(--bg)" }}>
            <h2 className="text-lg font-semibold mb-4">Recent Appointments</h2>
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr
                                key={appt.id}
                                className="odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)] transition-colors"
                            >
                                <td className="p-3">{appt.id}</td>
                                <td className="p-3">{appt.name}</td>
                                <td className="p-3">{appt.date}</td>
                                <td className="p-3">{appt.service}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
