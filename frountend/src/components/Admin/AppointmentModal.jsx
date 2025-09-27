"use client";

export default function AppointmentModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
                <input type="text" placeholder="Patient Name" className="border w-full p-2 mb-3 rounded" />
                <div className="mb-3">
                    <label className="block mb-1">Treatment:</label>
                    <div className="flex gap-3">
                        <label><input type="radio" name="treatment" /> Laser</label>
                        <label><input type="radio" name="treatment" /> Acne</label>
                        <label><input type="radio" name="treatment" /> Hair Removal</label>
                    </div>
                </div>
                <select className="border w-full p-2 mb-3 rounded">
                    <option>Select Doctor</option>
                    <option>Dr. Smith</option>
                    <option>Dr. Lee</option>
                </select>
                <input type="time" className="border w-full p-2 mb-3 rounded" />
                <input type="date" className="border w-full p-2 mb-3 rounded" />
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded">Book</button>
                </div>
            </div>
        </div>
    );
}
