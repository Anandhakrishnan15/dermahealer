import {
    format,
    isToday,
    isYesterday,
    isTomorrow,
    subDays,
    isWithinInterval,
    parseISO,
} from "date-fns";

export function filterAppointments({
    appointments,
    search,
    filter,
    selectedDate,
    paymentFilter,
    doctorFilter,
}) {

    return appointments.filter((appt) => {

        const matchesSearch =
            appt.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            appt.id
                ?.toString()
                ?.includes(search);

        const appointmentDate = parseISO(appt.date);

        let matchesDate = true;

        switch (filter) {

            case "today":
                matchesDate = isToday(appointmentDate);
                break;

            case "yesterday":
                matchesDate = isYesterday(appointmentDate);
                break;

            case "tomorrow":
                matchesDate = isTomorrow(appointmentDate);
                break;

            case "last7":
                matchesDate = isWithinInterval(
                    appointmentDate,
                    {
                        start: subDays(new Date(), 7),
                        end: new Date(),
                    }
                );
                break;

            case "custom":
                matchesDate =
                    selectedDate &&
                    format(
                        appointmentDate,
                        "yyyy-MM-dd"
                    ) === selectedDate;
                break;

            default:
                matchesDate = true;
        }

        let matchesPayment = true;

        if (paymentFilter === "paid") {
            matchesPayment = appt.paymentDone;
        }

        if (paymentFilter === "unpaid") {
            matchesPayment = !appt.paymentDone;
        }

        let matchesDoctor = true;

        if (doctorFilter !== "all") {
            matchesDoctor =
                appt.doctor === doctorFilter;
        }

        return (
            matchesSearch &&
            matchesDate &&
            matchesPayment &&
            matchesDoctor
        );
    });
}